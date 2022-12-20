import TopicController from "../controllers/TopicController"
import BaseRoute from "./BaseRoute"

class TopicRoute extends BaseRoute {

  routes(): void {
    const topicController = new TopicController()

    this.route.post('/api/topic', topicController.create)
    this.route.get('/api/topic', topicController.getAll)
    this.route.get('/api/topic/:id', topicController.getById)
    this.route.put('/api/topic/:id', topicController.update)
    this.route.delete('/api/topic/:id', topicController.delete)
  }
}

export default TopicRoute