import App from './app';
import CategoryController from './controller/category_controller';
import FeedController from './controller/feed_controller';
 
const app = new App(
  [
    new CategoryController(),
    new FeedController()
  ],
  3000,
);
 
app.listen();