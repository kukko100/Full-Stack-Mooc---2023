/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';

import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getPatients());
});

router.get('/:id', (request, response) => {
  const patient = patientService.findById(String(request.params.id));

  if (patient) {
    response.send(patient);
  } else {
    response.send(404);
  }
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const updatedPatient = utils.toNewPatient(request.body);
  const entries = request.body.entries;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  entries.map((e: { type: unknown; }) => {
    Object.values(e).forEach(value => {
      if (value === '') {
        response.status(422).json({ error: 'Incorrect data entry, check that all fields are filled' });
        return;
      }
    });
  });

  const updatedPatientData = patientService.updatePatient(id, updatedPatient);

  if (updatedPatientData) {
    response.json(updatedPatientData);
  } else {
    response.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (request, response) => {
  try {
    const newPatientEntry = utils.toNewPatient(request.body);
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