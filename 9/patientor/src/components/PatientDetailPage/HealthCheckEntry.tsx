import { HealthCheck } from "../../types";
import { MedicalServices, Favorite } from "@mui/icons-material";
import defaultStyle from "./entryStyle";

interface Props {
  entry: HealthCheck;
}



const HealthCheckEntry: React.FC<Props> = ({ entry }) => {
  const categoryIcon = <MedicalServices/>;

  const healthCheckRating = entry.healthCheckRating;
  
  const healthRatingIcon0 = <Favorite style={{ fill: 'green'}}/>;
  const healthRatingIcon1 = <Favorite style={{ fill: 'yellow'}}/>;
  const healthRatingIcon2 = <Favorite style={{ fill: 'red'}}/>;
  const healthRatingIcon3 = <Favorite style={{ fill: 'black' }}/>;

  const healthRatingIcon = 
    healthCheckRating === 0 ? healthRatingIcon0 :
    healthCheckRating === 1 ? healthRatingIcon1 :
    healthCheckRating === 2 ? healthRatingIcon2 :
    healthCheckRating === 3 ? healthRatingIcon3 :
    <Favorite/>;
  
  return (
    <dl style={defaultStyle}>
      <dt>{entry.date} {categoryIcon}</dt>
      <dt>{entry.description}</dt>
      <dt>{healthRatingIcon}</dt>
      <dt>diagnose by {entry.specialist}</dt>
    </dl>
  );
};

export default HealthCheckEntry;