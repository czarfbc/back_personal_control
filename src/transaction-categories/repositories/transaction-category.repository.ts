import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionCategory } from '@prisma/client';

export interface ITransactionCategoryRepository {
  create(
    transactionCategory: Partial<TransactionCategory>,
  ): Promise<TransactionCategory>;

  delete(transactionCategory: Partial<TransactionCategory>): Promise<void>;

  findAll(
    transactionCategory: Partial<TransactionCategory>,
  ): Promise<TransactionCategory[]>;
}

@Injectable()
export class TransactionCategoryRepository
  implements ITransactionCategoryRepository
{
  @Inject()
  private readonly prismaService: PrismaService;

  async create(
    transactionCategory: TransactionCategory,
  ): Promise<TransactionCategory> {
    return await this.prismaService.transactionCategory.create({
      data: transactionCategory,
    });
  }

  async delete(transactionCategory: TransactionCategory): Promise<void> {
    await this.prismaService.transactionCategory.delete({
      where: { id: transactionCategory.id, userId: transactionCategory.userId },
    });
    return;
  }

  async findAll(
    transactionCategory: TransactionCategory,
  ): Promise<TransactionCategory[]> {
    return await this.prismaService.transactionCategory.findMany({
      where: {
        OR: [{ userId: transactionCategory.userId }, { userId: null }],
      },
    });
  }
}
