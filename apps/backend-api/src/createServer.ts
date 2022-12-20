import fastify, { FastifyInstance } from 'fastify'
import ArticleRoute from './routes/ArticleRoute'
import cors from '@fastify/cors'
import TopicRoute from './routes/TopicRoute'
class Server {
    public app: FastifyInstance

    constructor() {
        this.app = fastify({logger: true})
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.register(cors)
    }

    protected routes(): void {
        const articleRoute = new ArticleRoute(this.app)
        const topicRoute = new TopicRoute(this.app)
        
        articleRoute.route
        topicRoute.route
    }
}

export default new Server().app