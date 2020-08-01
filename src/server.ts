import App from './app';
import CategoryController from './controller/category_controller';
import FeedController from './controller/feed_controller';
import EventController from './controller/event_controller';
 
const app = new App(
  [
    new CategoryController(),
    new FeedController(),
    new EventController()
  ],
  3000,
);
 
app.listen();
