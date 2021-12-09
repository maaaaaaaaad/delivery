import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateInputDto, CreateOutputDto } from './dtos/create.dto'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((type) => String)
  greeting(@Args('input') name: string): string {
    return `Hello ${name}, Welcome to graphQL!!!!`
  }

  @Mutation((returns) => CreateOutputDto)
  async createAccount(
    @Args('input') createInputDto: CreateInputDto,
  ): Promise<CreateOutputDto> {
    return await this.usersService.createAccount(createInputDto)
  }
}
