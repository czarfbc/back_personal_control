import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountInput } from '../dto/create-bank-account.input';
import { IBankAccountRepository } from '../repositories/bank-accounts.repository';

@Injectable()
export class CreateBankAccountUseCase {
  @Inject('IBankAccountRepository')
  private bankAccountRepository: IBankAccountRepository;

  async execute(input: CreateBankAccountInput) {
    return await this.bankAccountRepository.create(input);
  }
}
