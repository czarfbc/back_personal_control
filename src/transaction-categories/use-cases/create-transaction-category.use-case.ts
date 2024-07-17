import { Inject, Injectable } from '@nestjs/common';
import { ITransactionCategoryRepository } from '../repositories/transaction-category.repository';
import { CreateTransactionCategoryInput } from '../dto/create-transaction-category.input';

@Injectable()
export class CreateTransactionCategoryUseCase {
  @Inject('ITransactionCategoryRepository')
  private transactionCategoryRepository: ITransactionCategoryRepository;

  async execute(input: CreateTransactionCategoryInput) {
    return await this.transactionCategoryRepository.create(input);
  }
}
