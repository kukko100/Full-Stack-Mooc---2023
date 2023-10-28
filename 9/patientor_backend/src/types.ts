export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Type {
  "Hospital" = "Hospital",
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "HealthCheck" = "HealthCheck"
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Hospital extends BaseEntry {
  type: "Hospital";
  specialist: string;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  discharge?: Discharge;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PatientType = Patient;

export type NewEntry = Omit<Entry ,'id'>;

export type NewHospitalEntry = Omit<Hospital, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheck, 'id'>;

export type Entry = 
  | BaseEntry
  | HealthCheck
  | Hospital
  | OccupationalHealthcare;