import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @ApiOperation({ summary: 'API get all templates' })
  @Get()
  @HttpCode(200)
  async getTemplates() {
    return this.templatesService.getTemplates();
  }
}
