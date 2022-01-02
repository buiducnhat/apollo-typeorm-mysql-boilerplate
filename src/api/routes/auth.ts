// import { Router, Request, Response, NextFunction } from 'express';
// import Container from 'typedi';

// import TaskService from '@src/services/auth.service';

// const route = Router();

// export default (app: Router) => {
//   app.use('/auth', route);

//   route.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const authServiceInstance = Container.get(TaskService);
//       // return res.status(201).json(result);
//     } catch (err) {
//       next(err);
//     }
//   });
// };
