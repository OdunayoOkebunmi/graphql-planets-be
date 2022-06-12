import { Arg, Args, ArgsType, Query, Resolver, Float, Mutation, Field, FieldResolver, Int, InputType, Root, Ctx, ID } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import Flight, { FlightPagination } from '../entities/flights';
import { Max, Min } from 'class-validator';
import SpaceCenter from '../entities/spaceenters';
import { MyContext } from '../types/index'

@InputType()
export class ScheduleFlightInput {
  @Field(type => Int, { defaultValue: 0 })
  launchSiteId: number

  @Field(type => Int, { defaultValue: 0 })
  landingSiteId: number

  @Field(type => String, { defaultValue: 0 })
  departureAt: String

  @Field(type => Int, { defaultValue: 0 })
  seatCount: number
}

@ArgsType()
class GetAllFlightsArgs {

  @Field(type => Int, { nullable: true })
  from: string

  @Field(type => Int, { nullable: true })
  to: string

  @Field({ nullable: true })
  seatCount: number


  @Field({ nullable: true })
  departureDay: Date


  @Field(type => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page: number = 1;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @Min(1)
  @Max(100)
  pageSize: number = 10;
}

@Resolver((of) => Flight)
export default class FlightResolver {
  @FieldResolver()
  async launchSite (
    @Ctx() ctx: MyContext,
    @Root() spaceCenter: SpaceCenter,
  ) {
    const { db } = ctx
    return await db('space_centers').select('*').where('id', spaceCenter.id).first()
  }

  @FieldResolver()
  async landingSite (
    @Ctx() ctx: MyContext,
    @Root() spaceCenter: SpaceCenter,
  ) {
    const { db } = ctx
    return await db('space_centers').select('*').where('id', spaceCenter.id).first()
  }

  @FieldResolver()
  async departureAt (
    @Root() flight: Flight,
  ) {
    return new Date(flight.departureAt)
  }

  @FieldResolver()
  async seatCount (
    @Root() flight: Flight,
  ) {
    return flight.seatCount
  }
  // create a flight
  @Mutation(() => Flight)
  async scheduleFlight (
    @Ctx() ctx: MyContext,
    @Arg('flightInfo') flightInfo: ScheduleFlightInput,
  ) {
    const { db } = ctx
    const launchSite = await db('space_centers').select().where('id', flightInfo.launchSiteId).first()
    const landingSite = await db('space_centers').select().where('id', flightInfo.landingSiteId).first()
    if (!launchSite) {
      throw new Error('Launch site not found')
    }
    if (!landingSite) {
      throw new Error('Landing site not found')
    }
    const [result] = await db('flights').insert({
      code: uuidv4(),
      launchSiteId: launchSite.id,
      landingSiteId: landingSite.id,
      seatCount: flightInfo.seatCount,
      departureAt: new Date(flightInfo.departureAt.toString())
    }).returning('*')
    return result;
  }


  @Query(() => [FlightPagination])
  async flights (
    @Ctx() ctx: MyContext,
    @Args() { pageSize, page, from, to, departureDay }: GetAllFlightsArgs
  ) {
    const { db } = ctx

    if (page < 1) page = 1
    const offset = (page - 1) * pageSize
    const total = await db('flights').count('* as count').first()
    const nodes = await db('flights').select('*').limit(pageSize).offset(offset)
    return [{
      pagination: {
        total: total?.count,
        pageSize,
        page,
      },
      nodes,
    }]
  }
  @Query(() => Flight)
  async flight (
    @Ctx() ctx: MyContext,
    @Arg('id') id: number
  ) {
    const { db } = ctx
    const flight = await db('flights').select('*').where('id', id).first()

    if (!flight) {
      throw new Error('Flight with the id not found')
    }

    return flight
  }
}