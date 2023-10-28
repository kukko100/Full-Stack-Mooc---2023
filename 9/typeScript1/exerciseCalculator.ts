interface ExerciseDays {
  days: number[],
  goal: number
}

const ratingDescriptions: string[] = [
  'failure',
  'try harder',
  'not too bad but could be better',
  'very well done!'
];

const parseExerciseDays = (days: number[], goal: number): ExerciseDays => {
    const tempArray: number[] = [];
    for (let i = 0; i < days.length; i++) {
      tempArray.push(Number(days[i]));
    }
    return {
      days: tempArray,
      goal: goal
    };
};

export const exerciseCalculation = (days: number[], goal: number) => {
  const exerciseDays: ExerciseDays = parseExerciseDays(days, goal);

  const periodLength: number = exerciseDays.days.length;
  const trainingDays: number = getTrainingDays(exerciseDays);
  const averageHours: number = getAverageHours(exerciseDays);
  const goalSuccess: boolean = getGoalSuccess(averageHours , exerciseDays.goal);
  const rating: number = getRating(periodLength, trainingDays, averageHours, goalSuccess);
  const ratingDescription: string = getRatingDescription(rating);
  const target: number = goal;

  const exercisesCalculated = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    goalSuccess: goalSuccess,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    averageHours: averageHours
  };

  return exercisesCalculated;

  // console.log(`periodLength: ${periodLength}`);
  // console.log(`trainingDays: ${trainingDays}`);
  // console.log(`success: ${goalSuccess}`);
  // console.log(`rating: ${rating}`);
  // console.log(`rating description: ${ratingDescription}`);
  // console.log(`target: ${exerciseDays.goal}`);
  // console.log(`average: ${averageHours}`);
};

const getTrainingDays = (e: ExerciseDays): number => {
  let counter: number = 0;
  e.days.forEach((day: number) => {
    if (day > 0) {
      counter += 1;
    }
  });
  return counter;
};

const getAverageHours = (e: ExerciseDays): number => {
  let sum: number = 0;
  e.days.forEach((day: number) => {
    sum += day;
  });
  return sum / e.days.length;
};

const getGoalSuccess = (averageHours: number, goal: number): boolean => {
  return averageHours >= goal;
};

const getRating = (periodLength: number, trainingDays: number, averageHours: number, success: boolean) => {
  let counter: number = 0;

  if (averageHours > 0.8) counter += 1;
  if (success) counter += 1;
  if (trainingDays / periodLength > 0.5) counter += 1;
  
  return counter;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 0:
      return ratingDescriptions[0];
    case 1: 
      return ratingDescriptions[1];
    case 2: 
      return ratingDescriptions[2];
    case 3: 
      return ratingDescriptions[3];
    default:
      return 'no words';
  }
};

console.log(exerciseCalculation);