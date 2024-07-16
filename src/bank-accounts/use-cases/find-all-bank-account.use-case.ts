import { Inject, Injectable } from '@nestjs/common';
import { IBankAccountRepository } from '../repositories/bank-accounts.repository';
import { FindAllBankAccountInput } from '../dto/find-all-bank-account.input';

@Injectable()
export class FindAllBankAccountUseCase {
  @Inject('IBankAccountRepository')
  private bankAccountRepository: IBankAccountRepository;

  async execute(input: FindAllBankAccountInput) {
    return await this.bankAccountRepository.findAll(input);
  }
}
