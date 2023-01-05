import { App } from '@/App';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
import usersRoute from '@api/users/users.route';
import IndexRoute from '@api/index/index.route';
import { AiStartRoute } from '@api/aiStart/AiStart.route';

validateEnv();

const app = new App([new IndexRoute(), new usersRoute(), new AiStartRoute()]);

app.listen();

process.on('uncaughtException', error => {
  logger.error('================[uncaught Exception]================');
  logger.error(error);
  logger.error('====================================================');
});
