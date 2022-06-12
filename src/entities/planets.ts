import { MaxLength } from 'class-validator';
import { Field, ObjectType, Int } from 'type-graphql'
import SpaceCenter from './spaceenters';

@ObjectType()
class Planet {

  @Field(type => Int)
  id: number

  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  @MaxLength(3)
  code: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date

  @Field(type => [SpaceCenter])
  spaceCenters: SpaceCenter[]

}
export default Planet