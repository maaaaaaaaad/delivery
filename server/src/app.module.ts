import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersEntity } from './users/entities/users.entity'
import { JwtModule } from './jwt/jwt.module'
import { StoresModule } from './stores/stores.module'
import { StoreEntity } from './stores/entities/store.entity'
import { CategoryEntity } from './stores/entities/category.entity'
import { FoodEntity } from './stores/entities/food.entity'
import { OrderModule } from './order/order.module'
import { OrderEntity } from './order/entites/order.entity'
import { OrderItemEntity } from './order/entites/item.entity'

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
      entities: [
        UsersEntity,
        StoreEntity,
        CategoryEntity,
        FoodEntity,
        OrderEntity,
        OrderItemEntity,
      ],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams: any) => ({
            token: connectionParams['access_token'],
          }),
        },
      },
      context: ({ req }) => ({ token: req.headers['access_token'] }),
    }),
    JwtModule.forRoot({
      jwtSecretKey: process.env.JWT_SECRET_KEY,
    }),
    UsersModule,
    StoresModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
