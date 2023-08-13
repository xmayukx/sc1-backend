const express = require('express');
const app = express();
app.use(express.json());

import * as fs from 'fs-extra';

  function randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function rand(generator:any){
    const randomValue = generator.generateWeightedRandom();
    return  randomValue;
   }
function priorityCalculator(s:string){
    let priority = 0;
    if(s == "easy"){
        priority = 2;
    }
    else if(s == "medium"){
        priority = 1;
    }
    else if(s == "hard"){
        priority = 0.5;
    }
    else if(s == "very hard"){
        priority = 0.25;
    }
    return priority;
}

class WeightedRandomNumberGenerator {
    public weightedNumbers: [number, number][];
  
    constructor(weightedNumbers: [number, number][]) {
      this.weightedNumbers = weightedNumbers;
    }
  
    generateWeightedRandom(): number {
      const totalWeight = this.weightedNumbers.reduce((sum, [, weight]) => sum + weight, 0);
      let randomValue = Math.random() * totalWeight;
  
      for (const [number, weight] of this.weightedNumbers) {
        randomValue -= weight;
        if (randomValue <= 0) {
          return number;
        }
      }
  
      return this.weightedNumbers[this.weightedNumbers.length - 1][0];
    }
  }
  
function test(response: any, res:any){
  let e;
try {
    const jsonString = fs.readFileSync('question_DataSet.json', 'utf-8');
    const jsonData = JSON.parse(jsonString);
    let topics: any = [];
    let qs:any = []
    let topicIds: any = [];
    let a: number = 0;
  let questions:any = [];
    //let response = ["hard_8","easy_10","easy_13","hard_17"];

    //console.log(Object.keys(jsonData.physics))
    jsonData.physics.forEach((j: any) =>{
        let obj = {
            topic: j.topic,
            priority: 1
        }
        if(!topics.includes(obj)){
            topics.push(obj)
        }
    });
    jsonData.physics.forEach((k: any) => {
        let obj = {
           _id: k._id,
            subject_name: "physics",
            topic_name: k.topic,
            priority: priorityCalculator(k.difficulty),
            question: k.question,
            correctAns: k.options.indexOf(k.answer),
            answers: k.options
        }
        qs.push(obj)
    });
    jsonData.physics.forEach((j: any) =>{
        if(!topicIds[j.topic]) {
            topicIds[j.topic] = [j._id];
        }else{
            topicIds[j.topic].push(j._id);
        }
    });
    qs.forEach((e:any) => {
        if(response.includes(e._id)){
            topics.map((obj:any)  =>{
                if(obj.topic == e.topic_name){
                    obj.priority += e.priority;
                }
            })
           // topics[e.topic_name] += e.priority
        }
    });

     topics = topics.filter((value:any, index:any) => {
        const _value = JSON.stringify(value);
        return index === topics.findIndex((obj:any) => {
          return JSON.stringify(obj) === _value;
        });
      });

    //console.log(Object.keys(topicIds));
    //console.log(topics)
    const weightedNumbers: [number, number][] = [  
      ];

      try{
        topics.forEach((e:any) => {
            weightedNumbers.push([a, e.priority])
            a++;
        })
      } catch(err){
      }

       const generator = new WeightedRandomNumberGenerator(weightedNumbers);

      // console.log(topicIds[topics[rand(generator)].topic][randomIntFromInterval(0, topics.length-1)])

  function gen_question(){
    qs.map((e:any) => {   
        if(e._id == topicIds[topics[rand(generator)].topic][randomIntFromInterval(0, topics.length-1)]){
             //res.send(e)
          questions.push(e)
        }
      })
  }
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();
  gen_question();

  questions = questions.filter((value:any, index:any) => {
        const _value = JSON.stringify(value);
        return index === questions.findIndex((obj:any) => {
          return JSON.stringify(obj) === _value;
        });
      });
  //console.log(questions.length)
  while(questions.length < 10){
    gen_question();    
  }

  res.send(questions)
} catch (err) {
    console.error(err);
}
}

app.post('/test', async (req:any, res:any) => {
  const { response } = req.body;

  try {
    
    console.log(test(response, res))
    res.status(200);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
