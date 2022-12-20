import { nanoid } from "nanoid";
import ArticleTopic from "../db/models/ArticleTopic";
import ClientError from "../exceptions/ClientError";

class ArticleTopicService {
  private articleId: string
  private topicId: string

  constructor(articleId?: string, topicId?: string) {
    this.articleId = articleId
    this.topicId = topicId
  }

  addArticleTopic = async (): Promise<string> => {
    const id = `article_topic-${nanoid(16)}`

    const data = await ArticleTopic.create({
      id,
      ArticleId: this.articleId,
      TopicId: this.topicId,
    }).catch((error) => {
      throw new ClientError(error.message)
    })

    return data.id
  }

  deleteByArticle = async (): Promise<number> => {
    const data = await ArticleTopic.destroy({ where: { ArticleId: this.articleId} }).catch((error) => {
      throw new ClientError(error.message)
    })

    return data
  }

  deleteByTopic = async (): Promise<number> => {
    const data = await ArticleTopic.destroy({ where: { TopicId: this.topicId } }).catch((error) => {
      throw new ClientError(error.message)
    })

    return data
  }
}

export default ArticleTopicService