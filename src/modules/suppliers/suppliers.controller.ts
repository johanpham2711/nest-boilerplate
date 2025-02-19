import {
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiOperation({ summary: 'API get all suppliers' })
  @Get()
  @HttpCode(200)
  async getSuppliers() {
    return this.suppliersService.getSuppliers();
  }

  @ApiOperation({ summary: 'API handle suppliers' })
  @Get('/handle')
  @HttpCode(200)
  async handleSuppliers() {
    return this.suppliersService.handleSuppliers();
  }

  @ApiOperation({ summary: 'API import suppliers dataset' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/import')
  @HttpCode(201)
  async importSuppliers(@UploadedFile() file: any) {
    return this.suppliersService.importSuppliers(file.buffer);
  }

  @ApiOperation({ summary: 'API import suppliers dataset' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/handle-country-codes')
  @HttpCode(201)
  async handleCountryCodes(@UploadedFile() file: any) {
    return this.suppliersService.handleCountryCodes(file.buffer);
  }

  @ApiOperation({ summary: 'API to export suppliers to an Excel file' })
  @Get('/export')
  @HttpCode(200)
  async exportSuppliers(@Res() res: Response) {
    const fileBuffer = await this.suppliersService.exportSuppliersToExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=suppliers.xlsx');

    return res.send(fileBuffer);
  }
}
