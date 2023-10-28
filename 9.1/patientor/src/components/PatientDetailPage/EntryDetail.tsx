import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";


const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry icdCodes={entry.diagnosisCodes} entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntry icdCodes={entry.diagnosisCodes} entry={entry}/>;
    default:
      return (
        <div>
          asdf
        </div>
      );
  }
};

export default EntryDetail;