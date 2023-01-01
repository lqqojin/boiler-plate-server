import { App } from '@/App';
import validateEnv from '@utils/validateEnv';
import usersRoute from '@api/users/users.route';
import IndexRoute from '@api/index/index.route';
import { logger } from '@utils/logger';
validateEnv();
const app = new App([new IndexRoute(), new usersRoute()]);

app.listen();

process.on('uncaughtException', error => {
  logger.error('================[uncaught Exception]================');
  logger.error(error);
  logger.error('====================================================');
});
