import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository';
import { FindTransactionByDateAndBankInput } from '../dto/find-transaction-by-date-and-bank.input';

@Injectable()
export class FindTransactionByDateAndBankUseCase {
  @Inject('ITransactionRepository')
  private transactionRepository: ITransactionRepository;

  async execute(input: FindTransactionByDateAndBankInput) {
    return await this.transactionRepository.findByDate(input);
  }
}
