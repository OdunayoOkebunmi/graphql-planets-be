import { MyContext } from '../types/index'
import { Arg, Args, ArgsType, Query, Resolver, Field, Int, FieldResolver, Root, Ctx, Float } from 'type-graphql'
import SpaceCenter, { SpaceCenterPagination } from '../entities/spaceenters';
import Planets from '../entities/planets'
import { Min, Max } from 'class-validator';

@ArgsType()
class GetAllSpaceCentersArgs {
  @Field(type => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page: number = 1;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @Min(1)
  @Max(100)
  pageSize: number = 10;
}

@Resolver((of) => SpaceCenter)
class SpaceCenterResolver {
  @Query(returns => [SpaceCenterPagination])
  async spaceCenters (
    @Ctx() ctx: MyContext,
    @Args() { page, pageSize }: GetAllSpaceCentersArgs
  ) {
    const { db } = ctx

    if (page < 1) page = 1
    const offset = (page - 1) * pageSize
    const total = await db('space_centers').count('* as count').first()
    const nodes = await db('space_centers').select().limit(pageSize).offset(offset)
    return [{
      pagination: {
        total: total?.count,
        pageSize,
        page,
      },
      nodes,
    }]
  }
  @FieldResolver()
  async planet (
    @Ctx() ctx: MyContext,
    @Root() spaceCenter: SpaceCenter,
  ) {
    const { db } = ctx
    return await db('planets').select('*').where('code', spaceCenter.planet_code).first()
  }
  @Query(() => SpaceCenter)
  async spaceCenter (
    @Ctx() ctx: MyContext,
    @Arg('id', { nullable: true }) id?: number,
    @Arg('uid', { nullable: true }) uid?: string
  ) {
    const { db } = ctx
    if (id)
      return await db('space_centers').select('*').where('id', id).first()
    else
      return await db('space_centers').select('*').where('uid', uid).first()
  }
}
export default SpaceCenterResolver;