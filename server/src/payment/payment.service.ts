import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaymentEntity } from './entites/payment.entity'
import { Repository } from 'typeorm'
import {
  CreatePaymentInputDto,
  CreatePaymentOutputDto,
} from './dtos/create.dto'
import { UsersEntity } from '../users/entities/users.entity'
import { StoreEntity } from '../stores/entities/store.entity'
import { GetAllPaymentOutputDto } from './dtos/get-all-payment.dto'
import { BASIC_PROMOTION_7 } from './constants/promotion_list'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly payments: Repository<PaymentEntity>,
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
  ) {}

  async createPayment(
    owner: UsersEntity,
    { dealId, storeId }: CreatePaymentInputDto,
  ): Promise<CreatePaymentOutputDto> {
    try {
      const store = await this.stores.findOne({ id: storeId })

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      if (store.ownerId !== owner.id) {
        return {
          access: false,
          errorMessage: 'No match primary key',
        }
      }

      await this.payments.save(
        await this.payments.create({
          dealId,
          user: owner,
          store,
        }),
      )

      const date = new Date()
      date.setDate(date.getDate() + BASIC_PROMOTION_7)
      store.isPromotion = true
      store.promotionPeriod = date

      await this.stores.save(store)

      return {
        access: true,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async getAllPayment(owner: UsersEntity): Promise<GetAllPaymentOutputDto> {
    try {
      const payments = await this.payments.find({ user: owner })

      return {
        access: true,
        payments,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }
}
