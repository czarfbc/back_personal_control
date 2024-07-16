import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';

export interface ITransactionRepository {
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  findByDate(transaction: Partial<Transaction>): Promise<Transaction[]>;
  delete(transaction: Partial<Transaction>): Promise<void>;
  update(transaction: Partial<Transaction>): Promise<Transaction>;
}

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(transaction: Transaction): Promise<Transaction> {
    return await this.prismaService.transaction.create({ data: transaction });
  }

  async findByDate(transaction: Transaction): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany({
      where: {
        date: transaction.date,
        bankAccountId: transaction.bankAccountId,
      },
    });
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.prismaService.transaction.delete({
      where: { id: transaction.id, bankAccountId: transaction.bankAccountId },
    });

    return;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    return await this.prismaService.transaction.update({
      where: { id: transaction.id, bankAccountId: transaction.bankAccountId },
      data: transaction,
    });
  }
}
