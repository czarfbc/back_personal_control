import { Inject, Injectable } from '@nestjs/common';
import { EditTransactionInfoInput } from '../dto/edit-transaction-info.input';
import { ITransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class EditTransactionInfoUseCase {
  @Inject('ITransactionRepository')
  private transactionRepository: ITransactionRepository;

  async execute(input: EditTransactionInfoInput) {
    return await this.transactionRepository.update(input);
  }
}
