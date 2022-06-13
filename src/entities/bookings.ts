import { Field, ObjectType, Int } from 'type-graphql'
import Pagination from './pagination'
import Flight from './flights';

@ObjectType()
export class BookingPagination {

  @Field(type => Pagination)
  pagination: Pagination

  @Field(type => [Booking])
  nodes: Booking[]

}
@ObjectType()
export default class Booking {
  @Field(type => Int)
  id: number

  @Field({ nullable: false })
  email: string

  @Field({ nullable: true, defaultValue: 0 })
  seat_count: number

  @Field()
  availableSeats: number
}
