import axios from "axios";
import { BASE_URL } from "../config";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { useLocation } from "react-router-dom";
const ProductListHook = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [productList, setProductList] = useState([]);

  const productListReponseData = async () => {
    try {
      const res: any = await axios.get(`${BASE_URL}/product-list.json`);
      const { status } = res;
      const data = await res.data;
      switch (status) {
        case 200:
          let recieveData: any = [];
          for (const key in data) {
            recieveData.push({
              productId: key,
              name: data[key].productName,
              price: data[key].price,
              quantity: 1,
              rating: 4,
              category: data[key].category,
              img: data[key].image,
              size:data[key].productSize
            });
          }
          setProductList(recieveData);
          break;
        default:
          enqueueSnackbar("Some Thing Went Wrong", {
            variant: "error",
          });
          break;
      }
    } catch (error) {
      enqueueSnackbar("Some Thing Went Wrong", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    productListReponseData();
  }, [location.pathname]);
  return {
    productListData: productList,
  };
};

export default ProductListHook;
