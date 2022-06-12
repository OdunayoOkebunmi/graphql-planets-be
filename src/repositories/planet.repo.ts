import Planet from '../entities/planets'
import BaseRepo from './base.repo'


class PlanetsRepository extends BaseRepo {
  async getPlanets (): Promise<Planet> {
    const planets: any = this.db('planets').limit(20)
    return planets
  }
}

export default PlanetsRepository