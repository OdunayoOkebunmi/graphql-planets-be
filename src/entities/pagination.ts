import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Pagination {
  @Field({ defaultValue: 1 })
  total: string

  @Field({ defaultValue: 1 })
  page: number

  @Field({ defaultValue: 1 })
  pageSize: number
}