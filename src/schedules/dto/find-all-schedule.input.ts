import { InputType } from '@nestjs/graphql';

@InputType()
export class FindAllScheduleInput {
  userId: number;
}
