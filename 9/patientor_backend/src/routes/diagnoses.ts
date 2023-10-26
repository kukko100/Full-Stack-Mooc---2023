import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:code', async (request, response) => {
  try {
    const code = request.params.code;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const diagnose = await diagnoseService.findByCode(code);

    if (diagnose) {
      response.send(diagnose);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

export default router;
