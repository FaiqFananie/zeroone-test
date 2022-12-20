import { FastifyInstance} from "fastify"
import RouteInterface from "./RouteInterface"

abstract class BaseRoute implements RouteInterface{
  public route: FastifyInstance

  constructor(app: FastifyInstance) {
    this.route = app
    this.routes()
  }

  abstract routes(): void 
}

export default BaseRoute