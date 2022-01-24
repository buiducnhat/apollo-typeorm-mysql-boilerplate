import { Request, Response, Router } from 'express';

import passport from './passport';

const router = Router();

router.get('/google', passport.authenticate('google'));

router.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json(req.user);
  },
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json(req.user);
  },
);

export default router;
