import express from 'express';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';
import entryRouter from './routes/entries';
import cors from 'cors';
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(), express.json());

const PORT = 3000;

app.get('/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/entries', entryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});