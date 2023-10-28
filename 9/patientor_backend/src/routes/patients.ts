/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getEntries());
});

router.get('/:id', (request, response) => {
  const patient = patientService.findById(Number(request.params.id));

  if (patient) {
    response.send(patient);
  } else {
    response.send(404);
  }
});

router.post('/', (request, response) => {
  try {
    const newPatientEntry = toNewPatientEntry(request.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    response.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    response.status(400).send(errorMessage);
  }
});

export default router;