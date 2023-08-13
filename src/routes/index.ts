import express, { Application, Request, Response } from 'express';
import User from '../models/User';
import testRouter from './testRoute';
import { body, validationResult } from 'express-validator';
import submitRouter from './submitRoute';
const router = express.Router();

const validateUser = [
  body('email').isEmail(),
  body('name').isString(),
  body('picture').isURL(),
  body('role').isString(),
  body('updated_at').isString(),
];

router.post("/login", express.json(), validateUser, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, picture, role, updated_at } = req.body;
  try {
    const newUser = new User({
      email,
      name,
      picture,
      role,
      updated_at
    });
    const user = await newUser.save();
    res.json(user._id).status(200);
  } catch(err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred' });
  }
});

router.post("/test", testRouter)

router.post("/form", submitRouter)
export default router;