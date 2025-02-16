import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Supplier } from '@prisma/client';
import { IMessageResponse } from '@src/common/interfaces/common/message-response.interface';
import { appConfig } from '@src/configs';
import { FileHelper } from '@src/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { SuppliersRepository } from './suppliers.repository';

@Injectable()
export class SuppliersService {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async getSuppliers(): Promise<Supplier[]> {
    return this.suppliersRepository.findMany();
  }

  async importSuppliers(fileBuffer: Buffer): Promise<IMessageResponse> {
    const suppliers = FileHelper.processExcel(fileBuffer);
    await this.suppliersRepository.createMany(
      suppliers.map((supplier) => ({
        name: supplier.companyName,
        country: supplier.countryCode,
      })),
    );

    return {
      message: 'Import suppliers dataset successfully',
    };
  }

  async handleCountryCodes(fileBuffer: Buffer): Promise<IMessageResponse> {
    const referringSuppliers = FileHelper.processExcel(fileBuffer);

    const suppliers = await this.suppliersRepository.findMany();

    for (const supplier of suppliers) {
      const referringSupplier = referringSuppliers.find(
        (referringSupplier) =>
          referringSupplier.companyName === supplier.name &&
          referringSupplier.countryCode !== supplier.country,
      );

      if (referringSupplier) {
        await this.suppliersRepository.update({
          where: { id: supplier.id },
          data: { country: referringSupplier.countryCode },
        });
      }
    }

    return {
      message: 'Handle country codes successfully',
    };
  }

  async handleSuppliers(limit: number = 1): Promise<
    IMessageResponse<{
      suppliers: Supplier[];
    }>
  > {
    const suppliers = await this.suppliersRepository.findMany({
      where: {
        isHandled: false,
      },
      take: limit,
      orderBy: { name: 'asc' },
    });

    if (suppliers.length === 0) {
      return {
        message: 'All suppliers have been handled',
      };
    }

    for (const supplier of suppliers) {
      await this.suppliersRepository.update({
        where: { id: supplier.id },
        data: { isHandled: true },
      });

      const result = await this.findCompanyInfo(supplier.name);
      console.log(`Company: ${supplier.name}, Data:`, result);

      // Update supplier info
      if (result) {
        const emailList = result.emails
          .map((email: string) => email.trim())
          .join(', ')
          .replace(/[\n\r]/g, '');
        const phoneList = result.phones
          .map((phone: string) => phone.trim())
          .join(', ')
          .replace(/[\n\r]/g, '');

        await this.suppliersRepository.update({
          where: { id: supplier.id },
          data: { email: emailList, phoneNumber: phoneList },
        });
      }
    }

    return {
      message: 'Handle suppliers successfully',
      data: {
        suppliers,
      },
    };
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleScheduledSuppliers(): Promise<void> {
    console.log('Handle scheduled task');
    const limit = 1;
    await this.handleSuppliers(limit);
  }

  async findCompanyInfo(companyName: string): Promise<any> {
    console.log(
      '🚀 ~ SuppliersService ~ findCompanyInfo ~ companyName:',
      companyName,
    );
    try {
      // Step 1: Use Google Search API to find the company website
      const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(companyName)}&cx=${appConfig.googleCseId}&key=${appConfig.googleApiKey}`;
      const searchResponse = await axios.get(searchUrl);
      const items = searchResponse.data.items;

      if (!items || items.length === 0) {
        console.log(`Company: ${companyName} not found!`);
        return null;
      }

      // Get the first result's website URL
      const companyWebsite = items[0].link;
      console.log(`Found website: ${companyWebsite}`);

      // Step 2: Scrape the website content
      const { data } = await axios.get(companyWebsite);
      const $ = cheerio.load(data);
      const pageText = $('body').text();

      // Step 3: Extract emails and phone numbers using regex
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const phoneRegex = /\+?\d[\d\s-]{8,15}/g;

      const emails = pageText.match(emailRegex) || [];
      const phones = pageText.match(phoneRegex) || [];

      return { emails: [...new Set(emails)], phones: [...new Set(phones)] };
    } catch (error) {
      console.error('Error:', error.message);
      console.log(`Company: ${companyName} not found!`);
      return null;
    }
  }
}
