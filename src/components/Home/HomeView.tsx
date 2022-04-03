import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HomeViewProps } from "../../types";
import MapView from "../Map/MapView";

/**
 * About View Component with description and {@link MapView}
 *
 * @property name
 * @property description
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function HomeView(props: HomeViewProps) {
  const { fullname, profession } = props;

  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Typography variant="h4">{fullname}</Typography>
      <Typography variant="h6">{profession}</Typography>
      <MapView />
    </Box>
  );
}
