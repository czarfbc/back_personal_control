import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCategoriesResolver } from './transaction-categories.resolver';

describe('TransactionCategoriesResolver', () => {
  let resolver: TransactionCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCategoriesResolver],
    }).compile();

    resolver = module.get<TransactionCategoriesResolver>(
      TransactionCategoriesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
