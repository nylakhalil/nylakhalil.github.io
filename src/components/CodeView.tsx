import { SyntheticEvent, useEffect, useState } from "react";
import ReactGA from "react-ga";
import ReactWordcloud, { OptionsProp } from "react-wordcloud";
import {
  faPalette,
  faCode,
  faCubes,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Card, Grid, Tab, Tabs } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DEVELOP_JSON_ENDPOINT } from "../config/AppConfig";
import { CodeViewResponse, DescriptionCardProps, WordCloudCardProps } from "../types";

const DescriptionCard = (props: DescriptionCardProps) => {
  const { title, description, link } = props;
  return (
    <>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            size="small"
            color="primary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

const WordCloudCard = (props: WordCloudCardProps) => {
  const { options, words } = props;
  return (
    <Card>
      <ReactWordcloud options={options} words={words} />
    </Card>
  );
};

/**
 * Develop View Component configured via JSON
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function CodeView() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [stageTitle, setStageTitle] = useState<string>("design");
  const [stageInfo, setStageInfo] = useState<CodeViewResponse | null>(null);
  const [options] = useState<OptionsProp>({
    colors: ["#B5BABE"],
    enableTooltip: false,
    fontFamily: "impact",
    fontSizes: [5, 40],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 10,
    rotations: 1,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  });

  useEffect(() => {
    fetch(DEVELOP_JSON_ENDPOINT)
      .then((response) => {
        return response.json();
      })
      .then((data) => setStageInfo(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  if (!stageInfo || Object.keys(stageInfo).length === 0) {
    return null;
  }

  const description = stageInfo[stageTitle]["content"];
  const link = stageInfo[stageTitle]["link"];
  const words = stageInfo[stageTitle]["words"];

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
    setStageTitle(event.currentTarget.textContent || 'design');
    ReactGA.event({
      category: "Develop Page",
      action: "Selected Icon: " + stageTitle,
      label: "Navigation",
    });
  };

  return (
    <Box
      sx={{
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Stages"
      >
        <Tab icon={<FontAwesomeIcon icon={faPalette} />} label="design" />
        <Tab icon={<FontAwesomeIcon icon={faCode} />} label="develop" />
        <Tab icon={<FontAwesomeIcon icon={faShieldAlt} />} label="test" />
        <Tab icon={<FontAwesomeIcon icon={faCubes} />} label="deploy" />
      </Tabs>

      <Box
        sx={{
          m: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={0} columns={16}>
          <Grid container spacing={0} columns={16}>
            <Grid item xs={16} sm={16} md={8}>
              <WordCloudCard options={options} words={words} />
            </Grid>
            <Grid item xs={0} sm={0} md={8}>
              <div></div>
            </Grid>
          </Grid>
          <Grid container spacing={0} columns={16}>
            <Grid item xs={0} sm={0} md={8}>
              <div></div>
            </Grid>
            <Grid item xs={16} sm={16} md={8}>
              <DescriptionCard
                title={stageTitle}
                description={description}
                link={link}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
