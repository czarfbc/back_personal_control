import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TransactionCategoriesModule } from './transaction-categories/transaction-categories.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    SchedulesModule,
    TodoListModule,
    BankAccountsModule,
    TransactionCategoriesModule,
    TransactionsModule,
  ],
})
export class AppModule {}
