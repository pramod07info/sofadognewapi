import express from 'express'

import { IFeed } from '../model/index'
import { FeedRepository } from '../repositories/index'

class FeedController {
    private feedRepository = new FeedRepository()
    public path = '/refresh';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getFeed);
    }

    getFeed = async (request: express.Request, response: express.Response) => {
        const result = await this.feedRepository.get(request)
        let feeds: IFeed[] = [];
        result.forEach(function (data) {
            let cat = [];
            if (data.categories != null) {
                cat.push(data.categories.id.toString());
            }
            var feed: IFeed = {
                id: data.id,
                enqueued: data.enqueued,
                ordinal: data.ordinal,
                url: data.url,
                published: data.published,
                categories: cat,
                credits: data.credits,
                title: data.title
            }
            feeds.push(feed)
        });
        response.send(feeds)
    }
}

export default FeedController;