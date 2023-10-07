import express from 'express';
import { bmiCalculation } from './modules/bmiCalculator';
import { exerciseCalculation } from './exerciseCalculator';
const app = express();

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  const bmi = bmiCalculation(height, weight);
  response.json({
    weight,
    height,
    bmi
  });
});

app.get('/exercises', (request, response) => {

  const daily_exercises: number[] = String(request.query.dailyExercises).split(',').map(Number);
  const target: number = Number(request.query.target);

  console.log(request.query.target);

  if (!request.query.dailyExercises || !request.query.target) {
    response.status(400).json({ error: 'parameters missing' });
    return;
  } else if (!Array.isArray(daily_exercises) || !daily_exercises.every((val) => !isNaN(val)) || isNaN(target)) {
    response.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const calculatedExercises = exerciseCalculation(daily_exercises, target);
  response.json({
    daily_exercises,
    calculatedExercises
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});