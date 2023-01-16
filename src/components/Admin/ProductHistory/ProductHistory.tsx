import OrderPlaced from "../../../hooks/order-placed";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../../config";
import axios from "axios";
import Paper from "@mui/material/Paper";
import ProductListHook from "../../../hooks/product-list";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";

const ProductHistory = () => {
  const { productListData: productListData } = ProductListHook();
  const [isData, setIsData] = React.useState(productListData);
  const { enqueueSnackbar } = useSnackbar();
  const deleteApiData = async (data: any) => {
    try {
      const res: any = await axios.delete(
        `${BASE_URL}/product-list/${data.productId}.json`
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Product is deleted ", {
            variant: "success",
          });
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
    } finally {
      console.log("in ideal State");
    }
  };

  const deleteHandler = (value: any) => {
    // const rest = isData.filter(
    //   (item: any) => item?.productId !== value.productId
    // );
    // setIsData(rest);
    deleteApiData(value);
  };

  return (
    <Box className="page-style frequenlty-asked-question">
      <Box sx={{ p: 10, pt: 15 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff" }}>
          Total Number Products
        </Typography>
        <Box
          sx={{
            mt: 4,
            borderRadius: 10,
            background: "#fff",
            p: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Product ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {productListData.map((item: any) => (
                <TableBody>
                  <React.Fragment>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "poppins",
                          color: "#154128",
                        }}
                      >
                        {item.productId}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "poppins",
                          color: "#154128",
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            textAlign: "center",
                            width: "50px",
                            height: "50px",
                            justifyContent: "center",
                            overflow: "hidden",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={item.img}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "poppins",
                          color: "#154128",
                        }}
                      >
                        {item.price}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "poppins",
                          color: "#154128",
                        }}
                      >
                        {item.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "poppins",
                          color: "#154128",
                        }}
                      >
                        <Button
                          sx={{ color: "#154128" }}
                          onClick={() => deleteHandler(item)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                </TableBody>
              ))}
            </Table>
            {productListData.length < 0 && <Box>Not Item Available</Box>}
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductHistory;
