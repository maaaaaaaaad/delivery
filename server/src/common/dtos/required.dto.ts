import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RequiredOutputDto {
  @Field((type) => Boolean)
  access: boolean

  @Field((type) => String)
  errorMessage: string
}
