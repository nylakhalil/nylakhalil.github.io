import { SyntheticEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
import SwipeableViews from "react-swipeable-views";
import theme from "../theme";
import { PhotoInfo } from "../types";
import { PHOTOS_JSON_ENDPOINT } from "../config/AppConfig";

/**
 * Carousel Component to render images specified in JSON file.
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function PhotoView() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(0);
  const [images, setImages] = useState<Array<PhotoInfo> | null>(null);

  useEffect(() => {
    fetch(PHOTOS_JSON_ENDPOINT)
      .then((res) => res.json())
      .then((result) => {
        setImages(result);
        setMaxSteps(result.length);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (event: SyntheticEvent) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log(event.currentTarget.textContent);
    ReactGA.event({
      category: "Photography Page",
      action: "Selected Image: " + event.currentTarget.textContent,
      label: "Navigation",
    });
  };

  if (!images || Object.keys(images).length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        <FontAwesomeIcon icon={faAngleLeft} size="2x" inverse />
      </Button>

      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 0,
          m: 0,
        }}
      >
        <SwipeableViews index={activeStep} enableMouseEvents>
          {images.map((image: PhotoInfo, index: number) => (
            <Box
              key={"img-parent-" + index}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                key={"img-" + index}
                component="img"
                src={image.url}
                alt={image.title}
                sx={{ height: "auto", maxWidth: "100%" }}
              />
              <Button
                key={"img-caption-" + index}
                size="small"
                color="info"
                href={image.link}
              >
                {image.title}
              </Button>
            </Box>
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          backButton={<Button sx={{ display: 'none' }}/>}
          nextButton={<Button sx={{ display: 'none' }}/>}
          sx={{
            p: 0,
            m: 0,
            background: "transparent",
            "& .MuiMobileStepper-dots": {
              "& .MuiMobileStepper-dot": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiMobileStepper-dotActive": {
                backgroundColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>

      <Button
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        <FontAwesomeIcon icon={faAngleRight} size="2x" inverse />
      </Button>
    </Box>
  );
}
