import express from 'express';

import patientService from '../services/patientService';
import entryService from '../services/entryService';
// import utils from '../utils';
// import entryService from '../services/entryService';

const router = express.Router();

router.get('/', (_request, response) => {
  const entry = entryService.getAllEntries();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (entry) {
    response.send(entry);
  } else {
    response.send(404);
  }
});

router.get('/:id', (request, response) => {
  const patient = patientService.findById(String(request.params.id));

  if (patient) {
    response.send(patient.entries);
  } else {
    response.send(404);
  }
});

// router.post('/', (request, response) => {
//   try {
//     const newEntry = utils.toNewEntry(request.body.entry);
//     const addedEntry = entryService.addEntry(newEntry, request.body.patient);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
