import { FastifyRequest, FastifyReply } from "fastify"
import ClientError from "../exceptions/ClientError"
import ArticleService from "../services/ArticleService"
import ArticleTopicService from "../services/ArticleTopicService"

class ArticleController {

    create = async(req: FastifyRequest<{Body: {title: string, body: string, topic: string[], status: string}, Params: {id: string}}>, res: FastifyReply): Promise<FastifyReply> => {
        try {
            if(!req.body.title || !req.body.body || !req.body.status) {
                throw new ClientError('Form is Not Completed Yet')
            }
            const articleService = new ArticleService(req.body, req.params.id, null)

            const articleId: string = await articleService.addArticle()

            if(req.body.topic){
                for(const v of req.body.topic){
                    const articleTopicService = new ArticleTopicService(articleId, v)

                    await articleTopicService.addArticleTopic()
                } 
            }

            return res.code(201).send({
                status: 'Success',
                message: 'Article Is Successfully Created',
                data: {
                    id: articleId
                }
            })
        } catch(error) {
            if (error instanceof ClientError) {
                return res.code(error.statusCode).send({
                    status: 'Fail',
                    message: error.message,
                });
            } else {
                return res.code(500).send({
                    status: 'Fail',
                    message: 'Internal Server Error',
                });
            }
        }
    }

    getAll = async (req: FastifyRequest<{Querystring: {status: string, topic: string}}>, res: FastifyReply): Promise<FastifyReply> => {
        const articleService = new ArticleService(null, null, req.query)

        const data = await articleService.getAllArticle()

        return res.code(200).send({
            status: 'Success',
            data
        })
    }

    getById = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
        try {
            const articleService = new ArticleService(null, req.params.id, null)

            const data = await articleService.getArticleById()
            return res.code(200).send({
                status: 'Success',
                data
            })
        } catch(error) {
            if (error instanceof ClientError) {
                return res.code(error.statusCode).send({
                    status: 'Fail',
                    message: error.message,
                });
            } else {
                return res.code(500).send({
                    status: 'Fail',
                    message: 'Internal Server Error',
                });
            }
        }
    }

    update = async (req: FastifyRequest<{ Body: { title: string, body: string, topic: string[], status: string }, Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
        try {
            const articleService = new ArticleService(req.body, req.params.id, null)

            await articleService.updateArticle()

            if (req.body.topic) {
                const articleTopicService = new ArticleTopicService(req.params.id)
                await articleTopicService.deleteByArticle()
                for (const v of req.body.topic) {
                    const articleTopicService = new ArticleTopicService(req.params.id, v)

                    await articleTopicService.addArticleTopic()
                }
            }

            return res.code(200).send({
                status: 'Success',
                message: 'Article Is Successfully Updated',
            })
        } catch(error) {
            if (error instanceof ClientError) {
                return res.code(error.statusCode).send({
                    status: 'Fail',
                    message: error.message,
                });
            } else {
                return res.code(500).send({
                    status: 'Fail',
                    message: 'Internal Server Error',
                });
            }
        }
    }

    delete = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
        try {
            const articleService = new ArticleService(null, req.params.id, null)
            const articleTopicService = new ArticleTopicService(req.params.id, null)

            await articleService.deleteArticle()

            await articleTopicService.deleteByArticle()

            return res.code(200).send({
                status: 'Success',
                message: 'Article Is Successfully Deleted',
            })
        } catch(error) {
            if (error instanceof ClientError) {
                return res.code(error.statusCode).send({
                    status: 'Fail',
                    message: error.message,
                });
            } else {
                return res.code(500).send({
                    status: 'Fail',
                    message: 'Internal Server Error',
                });
            }
        }
        
    }
}

export default ArticleController