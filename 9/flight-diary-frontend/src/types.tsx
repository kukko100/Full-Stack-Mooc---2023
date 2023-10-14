export enum Weather {
  Rainy = "rainy",
  Sunny = "sunny",
  Windy = "windy",
  Cloudy = "cloudy",
  Stormy = "stormy"
}

export enum Visibility {
  Poor = "poor",
  Good = "good",
  Great = "great",
  Ok = "ok"
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type  DiaryFormValues = Omit<Diary, "id">