import { UsersEntity } from '../../users/entities/users.entity'
import { OrderEntity } from '../entites/order.entity'

export const orderAccess = (authUser: UsersEntity, order: OrderEntity) => {
  let access: boolean = true

  if (authUser.role === 'client' && authUser.id !== order.consumerId) {
    access = false
  }

  if (authUser.role === 'owner' && authUser.id !== order.store.ownerId) {
    access = false
  }

  if (authUser.role === 'driver' && authUser.id !== order.driverId) {
    access = false
  }

  return access
}
