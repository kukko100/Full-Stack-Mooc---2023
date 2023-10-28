import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Entry, EntryFormValues, Patient } from "../../types";
import EntryDetail from "./EntryDetail";
import { Button } from "@mui/material";
import AddEntryModal from '../addEntryModal';

const PatientDetailPage = () => {
  const currentURL = window.location.href;
  const partsURL = currentURL.split('/');
  const idFromURL = String(partsURL[partsURL.length - 1]);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSSN] = useState('');
  const [occupation, setOccupation] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [errorText, setErrorText] = useState('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setErrorText('');
    setModalOpen(false);
  };

  const fetchPatient = async () => {
    try {
      return await patientService.getPatient(idFromURL);
    } catch (error) {
      console.error('Error fetching patient data: ', error);
      return null;
    }
    
  };

  useEffect(() => {
    fetchPatient()
    .then(fetchedPatient => {
      if(fetchedPatient) {
        setPatient(fetchedPatient);
        setName(fetchedPatient.name);
        setGender(fetchedPatient.gender);
        if (fetchedPatient.ssn) {
          setSSN(fetchedPatient.ssn);
        }
        setOccupation(fetchedPatient.occupation);
        if (fetchedPatient.entries) {
          setEntries(fetchedPatient.entries);
        }
        
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient]);

  const genderIcon = gender === 'male' ? <Male /> : gender === 'female' ? <Female/> : <Transgender/>; 

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient) {
        await patientService.addEntryToPatient(values, patient.id);
      }
      setModalOpen(false);
      setErrorText('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.message) {
        setErrorText(error.message);
      }
      
    }
  };

  return (
    <div>
      <h2>{name} {genderIcon}</h2> 
      <dl>
        <dt>ssh: {ssn}</dt>
        <dt>occupation: {occupation}</dt>
      </dl>
      <h3>entries</h3>
      {entries && (
        <div>
          {entries.map(e => (
            <div key={e.id}>
              <EntryDetail entry={e}/>
            </div>
          ))}
        </div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        patient={patient as Patient}
        error={errorText}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetailPage;