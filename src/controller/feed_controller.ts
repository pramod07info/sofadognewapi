import express from 'express'

import { IFeed } from '../model/index'
import { FeedRepository } from '../repositories/index'
import {IRefreshLog} from '../model'

class FeedController {
    private feedRepository = new FeedRepository()
    public path = '/feed/:uuid/:height/:os/refresh/:ordinal?';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getFeed);
    }

    getFeed = async (request: express.Request, response: express.Response) => {
        let result;
        if(typeof request.params.ordinal != 'undefined')
        {
            let iRreshLog: IRefreshLog = {
                uuid: request.params.uuid,
                os: request.params.os,
                height: parseInt(request.params.height),
                ordinal: parseInt(request.params.ordinal)

            };
            result = await this.feedRepository.get_gt_ordinal(iRreshLog)
        }else{
            let iRreshLog: IRefreshLog = {
                uuid: request.params.uuid,
                os: request.params.os,
                height: parseInt(request.params.height)
            };
            result = await this.feedRepository.get(iRreshLog)
        }
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