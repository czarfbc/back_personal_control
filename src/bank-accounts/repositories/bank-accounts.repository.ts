import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankAccount } from '@prisma/client';

export interface IBankAccountRepository {
  create(bankAccount: Partial<BankAccount>): Promise<BankAccount>;
  findAll(bankAccount: Partial<BankAccount>): Promise<BankAccount[]>;
  delete(bankAccount: Partial<BankAccount>): Promise<void>;
}

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(bankAccount: BankAccount): Promise<BankAccount> {
    return await this.prismaService.bankAccount.create({ data: bankAccount });
  }

  async findAll(bankAccount: BankAccount): Promise<BankAccount[]> {
    return await this.prismaService.bankAccount.findMany({
      where: { userId: bankAccount.userId },
    });
  }

  delete(bankAccount: Partial<BankAccount>): Promise<void> {
    this.prismaService.bankAccount.delete({ where: { id: bankAccount.id } });

    return;
  }
}
