import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionInput } from '../dto/delete-transaction.input';

@Injectable()
export class DeleteTransactionUseCase {
  @Inject('ITransactionRepository')
  private transactionRepository: ITransactionRepository;

  async execute(input: DeleteTransactionInput) {
    await this.transactionRepository.delete(input);

    return true;
  }
}
