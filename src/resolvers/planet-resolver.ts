import { Ctx, Query, Resolver, ArgsType, Args, Arg, FieldResolver, Root } from 'type-graphql'
import Planets from '../entities/planets'
import { MyContext } from '../types/index'


@ArgsType()
class GetPlanetArgs {
  limit: number
}
@Resolver((of) => Planets)
class PlanetResolver {
  @Query(() => [Planets])
  async getPlanets (
    @Ctx() ctx: MyContext,
    @Args() { limit }: GetPlanetArgs,
  ) {
    const { db } = ctx
    const planets = await db('planets').limit(limit)

    return planets
  }
  @Query(() => Planets)
  async planet (
    @Ctx() ctx: MyContext,
    @Arg('id') id: number) {
    const { db } = ctx
    return await db('planets').select('*').where('id', id).first()
  }
  @FieldResolver()
  async spaceCenters (
    @Ctx() ctx: MyContext,
    @Root() planet: Planets,
    @Arg('limit') limit: number = 5
  ) {
    const { db } = ctx
    if (limit > 10) {
      throw new Error('Limit should not be more than 10');
    }

    return await db('space_centers').select('*').where('planet_code', planet.code).limit(limit)
  }
}

export default PlanetResolver