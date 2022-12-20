import { nanoid } from "nanoid";
import Article from "../db/models/Article";
import { WhereOptions } from "sequelize";
import NotFoundError from "../exceptions/NotFoundError";
import ClientError from "../exceptions/ClientError";
import Topic from "../db/models/Topic";
import ArticleTopic from "../db/models/ArticleTopic";

class ArticleService {
    private body: {
        title: string,
        body: string,
        status: string,
    }

    private params = ''
    private query: {
        status?: string,
        topic?: string,
    }
    private articleTopic = new ArticleTopic

    constructor(body?: { title: string, body: string, status: string}, params?: string, query?: {status?: string, topic?: string}) {
        this.body = body
        this.params = params,
        this.query = query
    }

    public addArticle = async (): Promise<string> =>  {
        const id = `article-${nanoid(16)}`

        const newArticle = await Article.create({
            id,
            title: this.body.title,
            body: this.body.body,
            status: this.body.status
        }).catch((error) => {
            throw new ClientError(error.message)
        })
        
        return newArticle.id;        
    }

    getAllArticle = async (): Promise<Article[]> => {
        let whereArticle: WhereOptions<{ status: string}>
        let whereTopic: WhereOptions<{ id: string }>
        if(this.query && this.query.status) {
            whereArticle = {
                status: this.query.status
            }
        }

        if (this.query && this.query.topic){
            whereTopic = {
                id: this.query.topic
            }
        }

        const data = await Article.findAll({
            where: whereArticle,
            include: {
                model: Topic,
                where: whereTopic,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        })

        return data
    }

    getArticleById = async (): Promise<object> => {
        const data = await Article.findByPk(this.params, {
            include: {
                model: Topic,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        }).catch((error) => {
            throw new ClientError(error.message)
        })

        if(!data) {
            throw new NotFoundError('Article Is Not Found')
        }

        return data
    }

    updateArticle = async (): Promise<object> => {
        const data = await Article.update({
            title: this.body.title,
            body: this.body.body,
            status: this.body.status
        }, { where: { id: this.params } }).catch((error) => {
            throw new ClientError(error.message)
        })

        if (data[0] === 0) {
            throw new NotFoundError('Article Is Fail To Update, Article Is Not Found');
        }

        return data
    }

    deleteArticle = async (): Promise<object> => {
        const data = await Article.update({
            status: 'deleted',
        }, { where: { id: this.params } }).catch((error) => {
            throw new ClientError(error.message)
        })

        if (data[0] === 0) {
            throw new NotFoundError('Article Is Fail To Delete, Article Is Not Found');
        }

        return data
    }
}

export default ArticleService