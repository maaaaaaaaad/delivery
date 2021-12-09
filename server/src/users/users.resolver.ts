import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UsersResolver {
  @Query((type) => String)
  greeting(@Args('input') name: string): string {
    return `Hello ${name}, Welcome to graphQL!!!!`
  }
}
