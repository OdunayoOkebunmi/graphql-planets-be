import { Arg, Args, ArgsType, Query, Resolver, Mutation, Field, FieldResolver, Int, InputType, Root, Ctx } from 'type-graphql';
import Flight from '../entities/flights';
import { Max, Min, IsEmail } from 'class-validator';
import { MyContext } from '../types/index'
import Booking, { BookingPagination } from '../entities/bookings';

@InputType()
export class BookFlightInput {
  @Field(type => Int, { defaultValue: 0 })
  flightId: number

  @Field()
  @IsEmail()
  email: string

  @Field(type => Int, { defaultValue: 0 })
  seat_count: number
}

@ArgsType()
class GetAllBookingsArgs {
  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field(type => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page: number = 1

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @Min(1)
  @Max(100)
  pageSize: number = 10
}
@Resolver((of) => Booking)
export default class BookingResolver {
  @FieldResolver()
  async availableSeats (
    @Root() booking: Booking,
  ) {
    return 200
  }

  // create a bookings
  @Mutation(() => Booking)
  async bookFlight (
    @Ctx() ctx: MyContext,
    @Arg('bookingInfo') bookingInfo: BookFlightInput,
  ) {
    const { db } = ctx
    const flight = await db('flights').select('*').where('id', bookingInfo.flightId).first()
    if (!flight) {
      throw new Error('Flight not found')
    }
    const [result] = await db('bookings').insert({
      seat_count: bookingInfo.seat_count,
      email: bookingInfo.email,
    }).returning('*')
    return result;
  }
  // get all bookings with pagination

  @Query(() => [BookingPagination])
  async bookings (
    @Ctx() ctx: MyContext,
    @Args() { pageSize, page }: GetAllBookingsArgs
  ) {
    const { db } = ctx

    if (page < 1) page = 1
    const offset = (page - 1) * pageSize
    const total = await db('bookings').count('* as count').first()
    const nodes = await db('bookings').select('*').limit(pageSize).offset(offset)
    return [{
      pagination: {
        total: total?.count,
        pageSize,
        page,
      },
      nodes,
    }]
  }
  // get bookings by id
  @Query(() => Booking)
  async booking (
    @Ctx() ctx: MyContext,
    @Arg('id') id: number
  ) {
    const { db } = ctx
    const booking = await db('bookings').select('*').where('id', id).first()

    if (!booking) {
      throw new Error('Booking with the id not found')
    }

    return booking
  }
}