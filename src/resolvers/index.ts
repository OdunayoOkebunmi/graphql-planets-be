import { Resolver, Query } from "type-graphql";
@Resolver()
export default class HelloResolver {
  @Query(() => String)
  async helloWorld () {
    return "Hello World!";
  }
}