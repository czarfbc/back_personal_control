import { Inject, Injectable } from '@nestjs/common';
import { ITransactionCategoryRepository } from '../repositories/transaction-category.repository';
import { FindAllTransactionCategoryInput } from '../dto/find-all-transaction-category.input';

@Injectable()
export class FindAllTransactionCategoryUseCase {
  @Inject('ITransactionCategoryRepository')
  private transactionCategoryRepository: ITransactionCategoryRepository;

  async execute(input: FindAllTransactionCategoryInput) {
    return await this.transactionCategoryRepository.findAll(input);
  }
}
