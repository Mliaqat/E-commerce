import React from "react";
import { Box } from "@mui/material";
import "./Store.scss";
import HomeHeader from "./HomeHeader/HomeHeader";
import Categories from "./Categories/Categories";
import ProductList from "./ProductList/ProductList";
const Store = () => {
  const [selctedCat, setSelectedCat] = React.useState("all");
  const selectedCategory = (item: any) => {
    setSelectedCat(item);
  };
  return (
    <Box className="page-style">
      <Box sx={{ paddingTop: 20 }}>
        <Box sx={{ px: 15 }}>
          <HomeHeader />
        </Box>
        <Box sx={{ px: 15, py: 5 }}>
          <Categories itemType={selectedCategory} />
        </Box>
        <Box sx={{ px: 15, py: 5 }}>
          <ProductList catergory={selctedCat} />
        </Box>
      </Box>
    </Box>
  );
};

export default Store;
