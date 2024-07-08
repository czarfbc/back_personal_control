import { Inject, Injectable } from '@nestjs/common';
import { IBankAccountRepository } from '../repositories/bank-accounts.repository';
import { DeleteBankAccountInput } from '../dto/delete-bank-account.input';

@Injectable()
export class DeleteBankAccountUseCase {
  @Inject('IBankAccountRepository')
  private bankAccountRepository: IBankAccountRepository;

  execute(input: DeleteBankAccountInput) {
    this.bankAccountRepository.delete(input);

    return true;
  }
}
