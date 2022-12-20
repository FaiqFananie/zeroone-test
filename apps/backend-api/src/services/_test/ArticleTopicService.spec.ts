import ArticleTopic from '../../db/models/ArticleTopic'
import ArticleTopicService from '../ArticleTopicService'

let idArticle: string
let idTopic: string
describe('Article Service Test', () => {
  describe('A ArticleTopicService Class', () => {
    it('Should containts add, getAll, getById, update and delete function', () => {
      //arrange
      const articleService = new ArticleTopicService()


      expect(articleService).toHaveProperty('addArticleTopic');
      expect(articleService).toHaveProperty('deleteByArticle');
      expect(articleService).toHaveProperty('deleteByTopic');
      expect(articleService.addArticleTopic).toBeInstanceOf(Function);
      expect(articleService.addArticleTopic).toBeInstanceOf(Function);
      expect(articleService.deleteByArticle).toBeInstanceOf(Function);
      expect(articleService.deleteByTopic).toBeInstanceOf(Function);
    });
  })

  describe('when add new articleTopic', () => {
    it('should respond with new article ID', async () => {
      // Arrange 
      const articleId = 'article-1234567891234567'
      const topicId = 'topic-1234567891234567'

      const articleTopicService = new ArticleTopicService(articleId, topicId)

      // Action
      const data = await articleTopicService.addArticleTopic()
      idArticle = articleId

      // Assert
      expect(typeof data).toEqual('string');
    })

    it('should respond with new article ID', async () => {
      // Arrange 
      const articleId = 'article-0123456789123456'
      const topicId = 'topic-0123456789123456'

      const articleTopicService = new ArticleTopicService(articleId, topicId)
      idTopic = topicId

      // Action
      const data = await articleTopicService.addArticleTopic()

      // Assert
      expect(typeof data).toEqual('string');
    })
  })

  describe('when delete by article', () => {
    it('should respond with total affected rows', async () => {
      // Arrange 
      const articleService = new ArticleTopicService(idArticle)

      // Action
      const data = await articleService.deleteByArticle()

      // Assert
      expect(typeof data).toEqual('number');
      expect(data).toBeGreaterThan(0)
    })
  })

  describe('when delete by topic', () => {
    afterAll(async () => {
      await ArticleTopic.destroy({ truncate: true })
    })
    it('should respond with total affected rows', async () => {
      // Arrange 
      const articleService = new ArticleTopicService(null, idTopic)

      // Action
      const data = await articleService.deleteByTopic()

      // Assert
      expect(typeof data).toEqual('number');
      expect(data).toBeGreaterThan(0)
    })
  })
})
