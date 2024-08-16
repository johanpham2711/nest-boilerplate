import { Injectable } from '@nestjs/common';
import { Template } from '@prisma/client';
import { TemplatesRepository } from './templates.repository';

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  async getTemplates(): Promise<Template[]> {
    return this.templatesRepository.findMany();
  }
}
