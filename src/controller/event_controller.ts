import express from 'express'

class EventController {
    
    public path = '/feed/data/:uuid/:os/:uk/capture';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.post);
    }

    post = async (request: express.Request, response: express.Response) => {  
        response.send("200")
    }
}

export default EventController;