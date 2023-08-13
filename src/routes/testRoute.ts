import express, { Application, Request, Response } from 'express';
import Test from '../models/Test';
import { body, validationResult } from 'express-validator';
import * as fs from 'fs-extra';
const jsonString = fs.readFileSync('question_DataSet.json', 'utf-8');
const jsonData = JSON.parse(jsonString);
const router = express.Router();

const validateTest = [
    body('questionId').isString(),
    body('option').isNumeric(),
];

router.post("/testcheck", express.json(), validateTest, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {questionId, option} = req.body;
    try {
      const ans = await jsonData.forEach((item:any) => {
        if(item._id === questionId) {
          if(item.answer === option){
            res.json({status:"correct",correctIndex: ans.correctAns }).status(200);
          }else{
            res.json({status:"incorrect",correctIndex: ans.correctAns }).status(200);
          }
        }else{
            res.send("Question not found").status(404);
        }
      })
    } catch(err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    }
});

export default router;