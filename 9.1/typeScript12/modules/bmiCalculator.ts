interface BmiValues {
  height: number
  weight: number
}

const bmiCategories: readonly string[] = [
  "Underweight (Severe thinness)",
  "Underweight (Moderate thinness) ",
  "Underweight (Mild thinness)",
  "Normal range",
  "Overweight (Pre-obese)",
  "Obese (Class I)",
  "Obese (Class II)",
  "Obese (Class III)"
];

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const bmiCalculation = (height: number, weight: number): string => {
  const bmi = weight / Math.pow((height/100), 2);
  return getBmiCategory(bmi);
};

const getBmiCategory = (bmi: number): string => {
  switch(true) {
    case bmi < 16 :
      return bmiCategories[0];
    case bmi >= 16 && bmi <= 16.9:
      return bmiCategories[1];
    case bmi >= 17 && bmi <= 18.4:
      return bmiCategories[2];
    case bmi >= 18.5 && bmi <= 24.9:
      return bmiCategories[3];
    case bmi >= 25 && bmi <= 29.9:
      return bmiCategories[4];
    case bmi >= 30 && bmi <= 34.9:
      return bmiCategories[5];
    case bmi >= 35 && bmi <= 39.9:
      return bmiCategories[6];
    case bmi >= 40:
      return bmiCategories[7];
    default:
      return "out of charts!";
  }
}; 

try {
  const { height, weight } = parseBmiArguments(process.argv);
  bmiCalculation(height, weight);
} catch (error) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}