import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionInput } from '../dto/create-transaction.input';

@Injectable()
export class CreateTransactionUseCase {
  @Inject('ITransactionRepository')
  private transactionRepository: ITransactionRepository;

  async execute(input: CreateTransactionInput) {
    return this.transactionRepository.create(input);
  }
}
