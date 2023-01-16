import OrderPlaced from "../../../hooks/order-placed";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BASE_URL } from "../../../config";
import axios from "axios";
import { useSnackbar } from "notistack";
const OrderHistory = () => {
  const { allBookedOrder: allBookedOrder } = OrderPlaced();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState("");
  const [checkId, set_Id] = React.useState("");
  const expandHandler = (val: any) => {
    set_Id(val);
    setOpen(!open);
  };
  const selectedData = ["Pending", "Cancel", "Done", "InProgress"];
  const updateOrderData = async (data: any) => {
    try {
      const res: any = await axios.put(`${BASE_URL}/order-placed.json`, data);
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Product Status is Updated", {
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

  const handleChange = (event: any, val: any, id: any) => {
    const updatedCartStatus = [...allBookedOrder];
    const selectedUser = allBookedOrder.find((item: any) => item.id === id);
    const itemIndex = selectedUser?.orderPlacedItems.findIndex(
      (item: any) => item.productId === val.productId
    );
    const newTodo = [...selectedUser?.orderPlacedItems];
    const restVal = selectedUser.orderPlacedItems[itemIndex];
    newTodo[itemIndex] = {
      ...restVal,
      status: event.target.value as string,
    };
    const indexNumber = allBookedOrder.findIndex((item: any) => item.id === id);
    const rest = allBookedOrder[indexNumber];
    updatedCartStatus[indexNumber] = {
      ...rest,
      orderPlacedItems: newTodo,
    };
    setSize(event.target.value as string);
    updateOrderData(updatedCartStatus);
  };

  return (
    <Box className="page-style frequenlty-asked-question">
      <Box sx={{ p: 10, pt: 15 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff" }}>
          Total Number of Order
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
                  <TableCell />
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    ID
                  </TableCell>
                </TableRow>
              </TableHead>
              {allBookedOrder.map((item: any) => (
                <TableBody>
                  <React.Fragment>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => expandHandler(item?.id)}
                        >
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.userEmail}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={item.id === checkId && open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                              sx={{
                                fontFamily: "poppins",
                                fontWeight: 600,
                                color: "#154128",
                              }}
                            >
                              Booked Orders
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    productId
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    Name
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    category
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
                                    align="center"
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    quantity
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    Total price ($)
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      fontFamily: "poppins",
                                      fontWeight: 600,
                                      color: "#154128",
                                    }}
                                  >
                                    Status
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.orderPlacedItems.map(
                                  (historyRow: any) => (
                                    <TableRow key={historyRow.productId}>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontFamily: "poppins" }}
                                      >
                                        {historyRow.productId}
                                      </TableCell>
                                      <TableCell sx={{ fontFamily: "poppins" }}>
                                        {historyRow.name}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontFamily: "poppins" }}
                                      >
                                        {historyRow.category}
                                      </TableCell>
                                      <TableCell align="left">
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
                                            src={historyRow.img}
                                            alt=""
                                            style={{
                                              maxWidth: "100%",
                                              maxHeight: "100%",
                                            }}
                                          />
                                        </Box>
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontFamily: "poppins" }}
                                      >
                                        {historyRow.quantity}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontFamily: "poppins" }}
                                      >
                                        {historyRow.totalPrice}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontFamily: "poppins" }}
                                      >
                                        <Box sx={{ minWidth: "100%" }}>
                                          <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                              Process
                                            </InputLabel>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              defaultValue={historyRow.status}
                                              label="Process"
                                              onChange={(event) =>
                                                handleChange(
                                                  event,
                                                  historyRow,
                                                  item.id
                                                )
                                              }
                                              sx={{ p: 0 }}
                                            >
                                              {selectedData.map((item: any) => (
                                                <MenuItem
                                                  key={item}
                                                  value={item}
                                                >
                                                  {item}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Box>
                                        {/* {historyRow.status} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;
