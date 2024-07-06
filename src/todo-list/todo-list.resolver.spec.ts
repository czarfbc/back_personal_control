import { Test, TestingModule } from '@nestjs/testing';
import { TodoListResolver } from './todo-list.resolver';

describe('TodoListResolver', () => {
  let resolver: TodoListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoListResolver],
    }).compile();

    resolver = module.get<TodoListResolver>(TodoListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
