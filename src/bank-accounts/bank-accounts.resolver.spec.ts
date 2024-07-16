import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountsResolver } from './bank-accounts.resolver';

describe('BankAccountsResolver', () => {
  let resolver: BankAccountsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAccountsResolver],
    }).compile();

    resolver = module.get<BankAccountsResolver>(BankAccountsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
