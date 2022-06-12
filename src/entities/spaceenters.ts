import { Field, ObjectType } from 'type-graphql'
import Planet from './planets'
import Pagination from './pagination'
@ObjectType()
export class SpaceCenterPagination {

  @Field(type => Pagination)
  pagination: Pagination

  @Field(type => [SpaceCenter])
  nodes: SpaceCenter[]

}
@ObjectType()
export default class SpaceCenter {

  @Field()
  id: number

  @Field({ nullable: false })
  uid: string

  @Field({ nullable: false })
  name: string

  @Field()
  description: string

  @Field({ nullable: false })
  latitude: number

  @Field({ nullable: false })
  longitude: number

  // @Field({ nullable: false })
  planet_code: string

  @Field(type => Planet)
  planet: Planet
}
