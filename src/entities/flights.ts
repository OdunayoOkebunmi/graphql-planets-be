import { Field, ObjectType, Int } from 'type-graphql'
import Pagination from './pagination'
import SpaceCenter from './spaceenters';

@ObjectType()
export class FlightPagination {

  @Field(type => Pagination)
  pagination: Pagination

  @Field(type => [Flight])
  nodes: Flight[]

}
@ObjectType()
export default class Flight {
  @Field(type => Int)
  id: number

  @Field({ nullable: false })
  code: string

  @Field(type => SpaceCenter, { nullable: false })
  launchSite: SpaceCenter
  launchsite_id: number

  @Field(type => SpaceCenter, { nullable: false })
  landingSite: SpaceCenter
  landingsite_id: number

  @Field({ nullable: false })
  departureAt: Date

  @Field({ nullable: true, defaultValue: 0 })
  seatCount: number
}
