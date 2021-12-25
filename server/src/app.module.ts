import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersEntity } from './users/entities/users.entity'
import { JwtModule } from './jwt/jwt.module'
import { JwtMiddleware } from './jwt/jwt.middleware'
import { StoresModule } from './stores/stores.module'
import { StoreEntity } from './stores/entities/store.entity'
import { CategoryEntity } from './stores/entities/category.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [UsersEntity, StoreEntity, CategoryEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    UsersModule,
    JwtModule.forRoot({
      jwtSecretKey: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    })
  }
}
