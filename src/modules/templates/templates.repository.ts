import { Injectable } from '@nestjs/common';
import { Prisma, Template } from '@prisma/client';
import { defaultPagination } from 'src/constants';
import { IPaginationResponse, IRepository } from 'src/interfaces';
import { PrismaService } from '../prisma';

@Injectable()
export class TemplatesRepository implements IRepository<Template> {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TemplateCreateInput): Promise<Template> {
    return this.prisma.template.create({ data });
  }

  async findOne(
    query?: Prisma.TemplateFindFirstArgs,
  ): Promise<Template | null> {
    return this.prisma.template.findFirst(query);
  }

  async findMany(query?: Prisma.TemplateFindManyArgs): Promise<Template[]> {
    return this.prisma.template.findMany(query);
  }

  async pagination(params: {
    page?: number;
    pageSize?: number;
    cursor?: Template;
    where?: Prisma.TemplateWhereInput;
    orderBy?: Prisma.TemplateOrderByWithRelationInput;
  }): Promise<IPaginationResponse<Template>> {
    const {
      page = defaultPagination.page,
      pageSize = defaultPagination.pageSize,
      cursor,
      where,
      orderBy,
    } = params;

    const skip = (page - 1) * pageSize;

    const [items, count] = await this.prisma.$transaction([
      this.prisma.template.findMany({
        skip,
        take: pageSize,
        cursor,
        where,
        orderBy,
      }),
      this.prisma.template.count({ where }),
    ]);

    return {
      items,
      page,
      pageSize,
      total: count,
    };
  }

  async update(params: {
    where: Prisma.TemplateWhereUniqueInput;
    data: Prisma.TemplateUpdateInput;
  }): Promise<Template> {
    const { where, data } = params;
    return this.prisma.template.update({ where, data });
  }

  async delete(query: Prisma.TemplateWhereUniqueInput): Promise<Template> {
    return this.prisma.template.delete({ where: query });
  }
}
