import express from 'express';
import http from 'http';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isCelebrateError, CelebrateError } from 'celebrate';
import { UnauthorizedError as JwtUnauthorizedError } from 'express-jwt';

import config from '@src/config';
import { CustomError, NotFoundException, UnauthorizedException } from '@src/utils/error.util';
import LoggerInstance from './logger.loader';
import { HttpCode, HttpStatus } from '@src/config/constants';
import graphQlLoader from './graphql.loader';

interface ExpressLoaderParams {
  app: express.Application;
  httpServer: http.Server;
}

export default async ({ app, httpServer }: ExpressLoaderParams) => {
  app.get(`${config.api.prefix}/status`, (req: Request, res: Response) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // httpServer = http.createServer(app);
  await graphQlLoader({ app, httpServer });

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException('Url not found'));
  });

  // Handle custom error
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      LoggerInstance.error(`[${err.status}/${err.name}] - ${err.code} - ${err.message}`);
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message,
          error: err.code,
        })
        .end();
    }
    return next(err);
  });

  // Handle 400 Request Validation Error. (thrown by Celebrate)
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      const messages = [];
      (err as CelebrateError).details.forEach((v, k) => {
        messages.push(`[${k}] ${v.message}.`);
      });
      const message = messages.join('\n');
      const code = HttpCode.BAD_REQUEST;
      const status = HttpStatus.BAD_REQUEST;

      LoggerInstance.error(`[${status}/Celebrate] - ${code} - ${message}`);
      return res.status(status).json({
        status,
        message,
        error: code,
      });
    }
    return next(err);
  });

  // Handle 401 Authorization Error (thrown by express-jwt or custom)
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof JwtUnauthorizedError || UnauthorizedException) {
      const code = HttpCode.UNAUTHORIZED;
      LoggerInstance.error(
        `[${HttpStatus.UNAUTHORIZED}/${err.name || 'Authorization'}] - ${code} - ${err.message}`,
      );
      return res.status(HttpStatus.UNAUTHORIZED).send({
        status: HttpStatus.UNAUTHORIZED,
        error: code,
        message: err.message,
      });
    }
    return next(err);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const message = 'Something went wrong. Please try again or contact support.';
    LoggerInstance.error(
      `[${HttpStatus.GENERIC}/Generic] - ${HttpCode.INTERNAL_SERVER_ERROR} - ${err || message}`,
    );
    res.status(500).json({
      status: HttpStatus.GENERIC,
      message,
      error: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next();
  });
};
