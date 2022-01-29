import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateInputDto, CreateOutputDto } from './dtos/create.dto'
import { UsersService } from './users.service'
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto'
import { UsersEntity } from './entities/users.entity'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AuthUser } from '../auth/auth.decorator'
import { EditProfileInputDto, EditProfileOutputDto } from './dtos/edit.dto'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateOutputDto)
  async createAccount(
    @Args('input') createInputDto: CreateInputDto,
  ): Promise<CreateOutputDto> {
    return await this.usersService.createAccount(createInputDto)
  }

  @Mutation((returns) => LoginOutputDto)
  async loginAccount(
    @Args('input') loginInputDto: LoginInputDto,
  ): Promise<LoginOutputDto> {
    return await this.usersService.loginAccount(loginInputDto)
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UsersEntity)
  async userState(@AuthUser() authUser: UsersEntity): Promise<UsersEntity> {
    return authUser
  }

  @Mutation((returns) => EditProfileOutputDto)
  @UseGuards(AuthGuard)
  async editProfile(
    @AuthUser() authUser: UsersEntity,
    @Args('input') editProfileInput: EditProfileInputDto,
  ) {
    return await this.usersService.editProfile(authUser.id, editProfileInput)
  }

  @Mutation((returns) => Boolean)
  async checkAccountId(@Args('input') accountId: string): Promise<boolean> {
    return await this.usersService.checkAccountId(accountId)
  }

  @Mutation((returns) => Boolean)
  async checkEmail(@Args('input') email: string): Promise<boolean> {
    return await this.usersService.checkEmail(email)
  }

  @Mutation((returns) => Boolean)
  async checkNickname(@Args('input') nickname: string): Promise<boolean> {
    return await this.usersService.checkNickname(nickname)
  }
}
