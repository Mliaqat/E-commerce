import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Cart.scss";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../store/store";
import {
  setDecreaseQuanitity,
  setIncreaseQuanitity,
  deleteItemToCartHandler,
} from "../../store/slices/cart-item/cartItem.slice";
import Fade from "@mui/material/Fade";
import { ModalStyle } from "../../UI/ModalStyle/ModalStyle";
import IconButton from "@mui/material/IconButton";
import OrderPlaced from "../../hooks/order-placed";
import { StyledBadge } from "./CartStyle";
import CustomButton from "../../UI/CommonButton/CustomButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../store/store";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { setCartItem } from "../../store/slices/cart-item/cartItem.slice";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useSnackbar } from "notistack";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fireBaseOrderPlaced: fireBaseOrderPlaced } = OrderPlaced();
  const ItemToCart = useAppSelector((item) => item.cartItemReducer.ItemsToCart);
  const isloggedIn = useAppSelector((item) => item.authReducer.isloggedIn);
  const userInfo = useAppSelector((item) => item.authReducer.loggedInfo);

  const [open, setOpen] = React.useState(false);
  const [cartPrice, setCartPrice] = React.useState(0);
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ItemTotalPrice = () => {
    let newArr = ItemToCart.map((item: any) => {
      let { totalPrice } = item;
      return totalPrice;
    });
    const totalPriceAllItem = newArr.reduce(
      (a: any, b: any) => Number(a) + Number(b),
      0
    );
    setCartPrice(totalPriceAllItem);
  };

  React.useEffect(() => {
    ItemTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(ItemToCart));
  }, [ItemToCart]);

  const increaseQuantityHandler = (items: any) => {
    dispatch(setIncreaseQuanitity(items));
  };
  const decreaseQuantityHandler = (items: any) => {
    dispatch(setDecreaseQuanitity(items));
  };
  const deleteHandler = (value: any) => {
    dispatch(deleteItemToCartHandler(value));
  };
  // api post data to database for at order-placed

  const orderSubmitHandler = async (onSubmitData: any) => {
    try {
      const res: any = await axios.post(
        `${BASE_URL}/order-placed.json`,
        onSubmitData
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Your order is placed", {
            variant: "success",
          });
          setOrderPlaced(true);
          dispatch(setCartItem(null));
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

  const orderUpdateHandler = async (onSubmitData: any) => {
    try {
      const res: any = await axios.put(
        `${BASE_URL}/order-placed/${fireBaseOrderPlaced?.id}.json`,
        onSubmitData
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Your order is placed", {
            variant: "success",
          });
          setOrderPlaced(true);
          dispatch(setCartItem(null));
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

  //---------------------------------------------------->
  const orderItemHandler = () => {
    if (isloggedIn) {
      if (fireBaseOrderPlaced) {
        const data = {
          userEmail: userInfo,
          orderPlacedItems: fireBaseOrderPlaced
            ? ItemToCart.concat(fireBaseOrderPlaced.orderPlacedItems)
            : ItemToCart,
        };
        orderUpdateHandler(data);
      } else {
        const data = {
          userEmail: userInfo,
          orderPlacedItems: ItemToCart,
        };
        orderSubmitHandler(data);
      }
      setOrderPlaced(false);
    } else {
      enqueueSnackbar("you need to logged in to place order", {
        variant: "info",
      });
      navigate("/login");
    }
  };
  return (
    <React.Fragment>
      <IconButton aria-label="cart" onClick={handleOpen}>
        <StyledBadge
          badgeContent={ItemToCart.length ? ItemToCart.length : "0"}
          sx={{ color: "#fff" }}
        >
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            className="cart-item"
            sx={{
              ...ModalStyle,
              width: 1000,
              minHeight: 400,
              maxHeight: 800,
              overflowY: "scroll",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  color: "#154128",
                }}
              >
                List of Items in Cart
              </Typography>
              {ItemToCart.length !== 0 && !orderPlaced ? (
                <Box>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Product Name
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Price
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Quantity
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Size
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Total Price
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: "poppins", fontWeight: 500 }}
                          >
                            Delete Item
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ItemToCart.map((item: any) => (
                        <tr key={item.productId}>
                          <td>
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
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
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
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                sx={{
                                  fontSize: 25,
                                  fontFamily: "poppins",
                                  color: "#154128",
                                }}
                                onClick={() => decreaseQuantityHandler(item)}
                              >
                                -
                              </Button>

                              <Typography sx={{ fontFamily: "poppins" }}>
                                {item.quantity}
                              </Typography>
                              <Button
                                sx={{
                                  fontSize: 25,
                                  fontFamily: "poppins",
                                  color: "#154128",
                                }}
                                onClick={() => increaseQuantityHandler(item)}
                              >
                                +
                              </Button>
                            </Box>
                          </td>
                          <td>
                            <Typography sx={{ pl: 1, fontWeight: 600 }}>
                              {item.size ? item.size : "no size available"}
                            </Typography>
                          </td>
                          <td>
                            <Typography sx={{ pl: 1, fontWeight: 600 }}>
                              ${item.totalPrice}.00
                            </Typography>
                          </td>
                          <td>
                            <Button
                              sx={{ color: "#154128" }}
                              onClick={() => deleteHandler(item)}
                            >
                              <DeleteIcon />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      Total Price <span>{cartPrice}</span>
                    </Typography>
                    <CustomButton
                      name="Order Now"
                      buttonHandler={orderItemHandler}
                    />
                  </Box>
                </Box>
              ) : !orderPlaced ? (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    fontFamily: "poppins",
                    height: "100%",
                    pt: 4,
                  }}
                >
                  no Item Available in Cart
                </Typography>
              ) : null}
              {orderPlaced && (
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontFamily: "poppins", pt: 10 }}
                >
                  Thank You For Shopping your Order is placed
                </Typography>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
