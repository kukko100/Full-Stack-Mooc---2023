import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl, Radio, FormLabel, RadioGroup, FormControlLabel, Box, Autocomplete, Chip } from '@mui/material';

import { EntryFormValues, EntryType, HealthCheckRating, SickLeave } from "../../types";

import { useForm, Controller } from "react-hook-form";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface EntryTypeOption{
  value: EntryType;
  label: string;
}


const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [entryDate, setEntryDate] = useState<dayjs.Dayjs>(dayjs('2023-10-23'));
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] =  useState<string[]>([]);
  const [type, setType] = useState(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.CriticalRisk);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState<dayjs.Dayjs>(dayjs('2023-10-23'));
  const [sickLeaveEnd, setSickLeaveEnd] = useState<dayjs.Dayjs>(dayjs('2023-10-24'));


  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const tempEntryType = Object.values(EntryType).find(e => e.toString() === value);
      if (tempEntryType) {
        setType(tempEntryType);
      }
    }
  };
  
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEntryDate(date);
    }
  };

  const handleSickLeaveStartChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSickLeaveStart(date);
    }
  };

  const handleSickLeaveEndChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSickLeaveEnd(date);
    }
  };

  const handleHealthRating = (event: SelectChangeEvent) => {
    setHealthCheckRating(event.target.value as unknown as HealthCheckRating);
  };

 const addEntry = (event: SyntheticEvent) => {
  event.preventDefault();
  const date = entryDate.format('YYYY-MM-DD');
  if (type === EntryType.Hospital) {
    onSubmit({
      type,
      description,
      date,
      specialist,
      diagnosisCodes
    });
  } else if (type === EntryType.HealthCheck) {
    onSubmit({
      type,
      description,
      date,
      specialist,
      healthCheckRating
    });
  } else if (type === EntryType.OccupationalHealthcare) {
    const sickLeave: SickLeave = {
      startDate: sickLeaveStart.format('YYYY-MM-DD'),
      endDate: sickLeaveEnd.format('YYYY-MM-DD')
    };
    onSubmit({
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave
    });
  }
};

  const {
    control,
    formState: { errors },
} = useForm();

  return (
    <div>
      <form onSubmit={addEntry}>
      <InputLabel>Entry Type</InputLabel>
      <Select
          label="EntryType"
          fullWidth
          value={type}
          onChange={onEntryTypeChange}
          style={{ marginBottom: 20}}
        >
        {entryTypeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <FormControl style={{marginBottom: 20}}>
          <FormLabel style={{marginTop: 20, marginBottom: 10}}>Date</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={entryDate} onChange={handleDateChange} label="Date" defaultValue={dayjs('2023-10-23')} />
          </LocalizationProvider>
        </FormControl>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        

        {type === "HealthCheck" && (
          <div>
            <FormControl style={{marginBottom: 20}}>
              <FormLabel id="demo-radio-buttons-group-label">Health rating</FormLabel>
              <RadioGroup
                name="radio-buttons-group"
                onChange={handleHealthRating}
              >
                <FormControlLabel value="Healthy" control={<Radio color="primary" />} label="0" />
                <FormControlLabel value="LowRisk" control={<Radio color="primary"/>} label="1" />
                <FormControlLabel value="HighRisk" control={<Radio color="primary"/>} label="2" />
                <FormControlLabel value="CriticalRisk" control={<Radio color="primary"/>} label="3" />
              </RadioGroup>
            </FormControl>
          </div>
        )}

        {type === "Hospital" && (
          <div>
            <Box mt={2}>
              <Controller
                control={control}
                name="tags"
                render={() => (
                  <Autocomplete
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                      />
                      ))
                  }
                  onChange={(event, values) => {
                      event.preventDefault();
                      setDiagnosisCodes(values);
                  }}
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label="ICD codes"
                      placeholder="Press enter to add icd codes"
                      error={!!errors.tags}
                      />
                    )}
                    />
                )}
              />
            </Box>
          </div>

        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
                style={{marginTop: 20}}
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            <Box mt={2}>
              <Controller
                control={control}
                name="tags"
                render={() => (
                  <Autocomplete
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                      />
                      ))
                  }
                  onChange={(event, values) => {
                      event.preventDefault();
                      setDiagnosisCodes(values);
                  }}
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label="ICD codes"
                      placeholder="Press enter to add icd codes"
                      error={!!errors.tags}
                      />
                    )}
                    />
                )}
              />
            </Box>
            <FormControl style={{marginBottom: 20}}>
              <FormLabel style={{marginTop: 20, marginBottom: 10}}>Sick Leave</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={sickLeaveStart} onChange={handleSickLeaveStartChange} label="Start date" defaultValue={dayjs('2023-10-23')} />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={sickLeaveEnd} onChange={handleSickLeaveEndChange} label="End date" defaultValue={dayjs('2023-10-24')} />
              </LocalizationProvider>
            </FormControl>
            
            
          </div>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;