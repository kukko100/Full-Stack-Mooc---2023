export interface Diagnosis {
  code: string;
  desc: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export enum HealthCheckRating {
  Healthy = "Healthy",
  LowRisk = "LowRisk",
  HighRisk = "HighRisk",
  CriticalRisk = "CriticalRisk"
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Hospital extends BaseEntry {
  type: "Hospital";
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
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

// export type EntryFormValues = Omit<Entry, "id">;

export type EntryFormValues =
  | {
      type: EntryType.Hospital;
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes?: string[];
    }
  | {
      type: EntryType.OccupationalHealthcare;
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes?: string[];
      employerName: string;
      sickLeave: SickLeave;
    }
  | {
      type: EntryType.HealthCheck;
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes?: string[];
      healthCheckRating: HealthCheckRating;
    };

export type Entry = 
  | HealthCheck
  | Hospital
  | OccupationalHealthcare;