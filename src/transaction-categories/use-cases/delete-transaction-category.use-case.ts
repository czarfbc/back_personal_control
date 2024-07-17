import { Inject, Injectable } from '@nestjs/common';
import { ITransactionCategoryRepository } from '../repositories/transaction-category.repository';
import { DeleteTransactionCategoryInput } from '../dto/delete-transaction-category.input';

@Injectable()
export class DeleteTransactionCategoryUseCase {
  @Inject('ITransactionCategoryRepository')
  private transactionCategoryRepository: ITransactionCategoryRepository;

  async execute(input: DeleteTransactionCategoryInput) {
    await this.transactionCategoryRepository.delete(input);

    return true;
  }
}
