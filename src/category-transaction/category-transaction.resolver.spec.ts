import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTransactionResolver } from './category-transaction.resolver';

describe('CategoryTransactionResolver', () => {
  let resolver: CategoryTransactionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTransactionResolver],
    }).compile();

    resolver = module.get<CategoryTransactionResolver>(
      CategoryTransactionResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
