export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}

export interface PatientEntry {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'occupation'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;