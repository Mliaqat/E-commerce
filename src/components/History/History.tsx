import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OrderPlaced from "../../hooks/order-placed";
const History = () => {
  const { orderItems: orderItems } = OrderPlaced();

  return (
    <Box className="page-style frequenlty-asked-question">
      <Box sx={{ p: 10, pt: 15 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff" }}>
          Your Order History
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
          <Box
            sx={{
              height: 500,
              overflowY: "scroll",
              overflowX: "hidden",
              borderRadius: 10,
              background: "#fff",
              p: 4,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "& table": {
                p: "20px",
                "& td": {
                  whiteSpace: "nowrap",
                  p: "10px 50px",
                  textAlign: "center",
                },
              },
              textAlign: "center",
            }}
          >
            {orderItems.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Product Id
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Product Name
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Price
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Quantity
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Size
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Total Price
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        Status
                      </Typography>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item: any) => (
                    <tr>
                      <td>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "poppins" }}
                        >
                          {item.productId}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "poppins" }}
                        >
                          {item.name}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "poppins" }}
                        >
                          ${item.price}.00
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "poppins" }}
                        >
                          {item.quantity}
                        </Typography>
                      </td>
                      <td>
                        <Typography sx={{ pl: 1, fontFamily: "poppins" }}>
                          34
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="body1"
                          sx={{ pl: 1, fontFamily: "poppins" }}
                        >
                          ${item.totalPrice}.00
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="body2"
                          sx={{ pl: 1, fontWeight: 500, fontFamily: "poppins" }}
                        >
                          {item.status}
                        </Typography>
                        <Button sx={{ color: "#154128" }}></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {orderItems.length === 0 && (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  height: "100%",
                  pt: "50%",
                }}
              >
                no Item Available History
              </Typography>
            )}
            <Box
              sx={{
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 600,
                  color: "#154128",
                  "& span": {},
                }}
              >
                {/* Total Price <span>{cartPrice}</span> */}
              </Typography>
              {/* <CustomButton
                      name="Order Now"
                      buttonHandler={orderItemHandler}
                    /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default History;
