import { IRepository } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class SuppliersRepository implements IRepository<Supplier> {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.prisma.supplier.create({ data });
  }

  async createMany(data: Prisma.SupplierCreateInput[]): Promise<any> {
    const suppliers = data as Prisma.SupplierCreateInput[];
    return this.prisma.supplier.createMany({ data: suppliers });
  }

  async findOne(query?: Prisma.SupplierFindFirstArgs): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findFirst(query);
    return supplier as unknown as Supplier;
  }

  async findMany(query?: Prisma.SupplierFindManyArgs): Promise<Supplier[]> {
    return this.prisma.supplier.findMany(query);
  }

  async update(params: {
    where: Prisma.SupplierWhereUniqueInput;
    data: Prisma.SupplierUpdateInput;
  }): Promise<Supplier> {
    const { where, data } = params;
    return this.prisma.supplier.update({ where, data });
  }

  async delete(query: Prisma.SupplierWhereUniqueInput): Promise<Supplier> {
    return this.prisma.supplier.delete({ where: query });
  }
}
