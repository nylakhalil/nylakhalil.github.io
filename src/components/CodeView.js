import { Component } from "react";
import ReactGA from "react-ga";
import ReactWordcloud from "react-wordcloud";
import {
  faPalette,
  faCode,
  faCubes,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Box, Card, Grid, Tab, Tabs } from '@mui/material';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const DescriptionCard = (props) => {
  const { title, description, link } = props;
  return (
    <>
      <Card sx={{ width: 600 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small" color="primary" href={link} target="_blank" rel="noopener noreferrer">
            Wikipedia
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const WordCloudCard = (props) => {
  const { options, words } = props;
  return (
    <Card sx={{ width: 600 }}>
      <ReactWordcloud options={options} words={words} />
    </Card>
  );
}

/**
 * Develop View Component configured via JSON
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default class CodeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [
        { name: "design", color: "SeaGreen", icon: faPalette },
        { name: "develop", color: "Black", icon: faCode },
        { name: "test", color: "Black", icon: faShieldAlt },
        { name: "deploy", color: "Black", icon: faCubes },
      ],
      tabIndex: 0,
      content: {},
      title: "design",
      options: {
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
        transitionDuration: 1000,
      },
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_DEVELOP_JSON)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ content: data }))
      .catch((error) => console.error("Error: ", error));
  }

  render() {
    if (!this.state.content || Object.keys(this.state.content).length === 0) {
      return null;
    }

    const title = this.state.title || "design";
    const description = this.state.content[title]["content"];
    const link = this.state.content[title]["link"];
    const words = this.state.content[title]["words"];
    const options = this.state.options;

    const handleChange = (event, newValue) => {
      this.setState({ tabIndex: newValue, title: event.target.innerText.toLowerCase() });
      ReactGA.event({
        category: "Develop Page",
        action: "Selected Icon: " + title,
        label: "Navigation",
      });
    };

    return (
      <Box sx={{m: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <Tabs value={this.state.tabIndex} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<FontAwesomeIcon icon={faPalette} />} label="design" />
          <Tab icon={<FontAwesomeIcon icon={faCode} />} label="develop" />
          <Tab icon={<FontAwesomeIcon icon={faShieldAlt} />} label="test" />
          <Tab icon={<FontAwesomeIcon icon={faCubes} />} label="deploy" />
        </Tabs>

        <Box sx={{m: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Grid container spacing={0} columns={16}>
            <Grid container spacing={0} columns={16}>
              <Grid item xs={8}>
                <WordCloudCard options={options} words={words} />
              </Grid>
              <Grid item xs={0} sm={0} md={8}>
                <div></div>
              </Grid>
            </Grid>
            <Grid container spacing={0} columns={16}>
              <Grid item xs={0} sm={0} md={8} >
                <div></div>
              </Grid>
              <Grid item xs={8}>
                <DescriptionCard title={title} description={description} link={link} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
