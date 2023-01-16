import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CategoriesData } from "./CatergoriesData";
import "./Categories.scss";

const Categories = (props: any) => {
  const [selctedCat, setSelectedCat] = React.useState("all");
  const CategoriesHandler = (item: any) => {
    setSelectedCat(item.category);
    props.itemType(item.category);
  };

  return (
    <Box className="store-categorie">
      <Typography variant="h5" sx={{ color: "#fff", fontFamily: "poppins" }}>
        Select Categories
      </Typography>
      <Box
        sx={{
          width: "100%",
          py: 2,
          borderRadius: 5,
          display: "flex",
          justifyContent: "start",
        }}
      >
        {CategoriesData.map((item) => (
          <Button
            key={item.name}
            className={"isChecked"}
            sx={
              item.category === selctedCat
                ? {
                    background: "#fff",
                    color: "rgb(21,65,40)",
                    mx: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontFamily: "poppins",
                    "&:hover": {
                      border: "none",
                      background: "#fff",
                      color: "rgb(21,65,40)",
                    },
                  }
                : {
                    mx: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontFamily: "poppins",
                    color: "#fff",
                    "&:hover": {
                      border: "none",
                      background: "#fff",
                      color: "rgb(21,65,40)",
                    },
                  }
            }
            onClick={() => CategoriesHandler(item)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
