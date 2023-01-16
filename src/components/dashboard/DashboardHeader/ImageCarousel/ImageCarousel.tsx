import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ImageCarousel.scss";
import { ImageCarouselData } from "./CarouselMockData";
import { Paper, Button, Box } from "@mui/material";

function ImageCarousel(props: any) {
  return (
    <Box className="homepage-carousel">
      <Carousel>
        {ImageCarouselData.map((itemCar) => (
          <Paper
            key={itemCar.id}
            className="image-paper"
            sx={{ background: "transparent", border: "none", maxHeight: 700 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={itemCar.image} alt="" height="500px" />
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
