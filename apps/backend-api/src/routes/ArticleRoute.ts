import ArticleController from "../controllers/ArticleController"
import BaseRoute from "./BaseRoute"

class ArticleRoute extends BaseRoute{
  
  routes(): void {
    const articleController = new ArticleController()

    this.route.post('/api/article', articleController.create)
    this.route.get('/api/article', articleController.getAll)
    this.route.get('/api/article/:id', articleController.getById)
    this.route.put('/api/article/:id', articleController.update)
    this.route.delete('/api/article/:id', articleController.delete)
  }
}

export default ArticleRoute

