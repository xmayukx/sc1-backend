import express, { Application, Request, Response } from 'express';
import Result from '../models/Result';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateResult = [
    body('user').isString(),
    body('correctAns').isArray(),
    body('checkedNum').isNumeric(),
    body('score').isNumeric(),
    body('fullScore').isNumeric(),
];

router.post("/submit", express.json(), validateResult, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMsg: "Validation error!" });
    }

    const {user, correctAns, checkedNum, score, fullScore} = req.body;
    try {
      const newResult = new Result({
        user,
        correctAns,
        checkedNum,
        score,
        fullScore
      });
      const result = await newResult.save();
      res.json(result._id).status(200);
    } catch(err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    }
})

export default router;