import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppDispatch } from "../../../store/store";
import Backdrop from "@mui/material/Backdrop";
import { ModalStyle } from "../../../UI/ModalStyle/ModalStyle";
import Card from "@mui/material/Card";
import { ProductListMockData } from "./ProdcutListMockData";
import CustomButton from "../../../UI/CommonButton/CustomButton";
import { useAppSelector } from "../../../store/store";
import Typography from "@mui/material/Typography";
import SelectedModal from "./SelectedModal/SelectedModal";
import { setCartItem } from "../../../store/slices/cart-item/cartItem.slice";
import CloseIcon from "@mui/icons-material/Close";
import { VariantType, useSnackbar } from "notistack";
import ProductListHook from "../../../hooks/product-list";
const ProductList = (props: any) => {
  const ItemToCart = useAppSelector((item) => item.cartItemReducer.ItemsToCart);
  const { enqueueSnackbar } = useSnackbar();
  const selectedCategory = props.catergory;
  const { productListData: productListData } = ProductListHook();

  const mergedArray =
    productListData.length > 0
      ? ProductListMockData.concat(productListData)
      : ProductListMockData;

  const updatedProductList =
    selectedCategory !== "all"
      ? mergedArray.filter((item) => item.category === selectedCategory)
      : mergedArray;

  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const handleClose = () => setOpen(false);

  const itemViewHandler = (item: any) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const AddItemToCartHandler = (variant: VariantType, cartItem: any) => {
    // variant could be success, error, warning, info, or default
    let productInCart = [];
    productInCart = ItemToCart.filter(
      (item: any) => item.productId === cartItem.productId
    );
    const cartUpdate = {
      ...cartItem,
      status: "Pending",
      totalPrice: cartItem.price,
    };

    if (productInCart.length === 0) {
      dispatch(setCartItem(cartUpdate));
      enqueueSnackbar("Item is Added To Cart", { variant });
    } else {
      enqueueSnackbar("Item is alreay Added To Cart", { variant: "warning" });
    }
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {updatedProductList &&
            updatedProductList.map((item: any, index) => (
              <Grid item xs={3} key={index}>
                <Card
                  sx={{
                    maxWidth: 250,
                    height: 400,
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    px: 3,
                    py: 3,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        width: "250px",
                        height: "250px",
                        justifyContent: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() => itemViewHandler(item)}
                    >
                      <img
                        src={item?.img}
                        alt=""
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontFamily: "poppins", fontWeight: 500 }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "poppins", fontWeight: 600 }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                    <Box>
                      <Rating name="read-only" value={item.rating} readOnly />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <CustomButton
                        name="Add to Cart"
                        buttonHandler={() =>
                          AddItemToCartHandler("success", item)
                        }
                      />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          {updatedProductList.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  fontFamily: "poppins",
                  textAlign: "center",
                }}
              >
                We're Sorry, Currently their is no Items Available for This
                Selected Category
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
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
          <Box sx={ModalStyle}>
            <Box sx={{ textAlign: "end", cursor: "pointer" }}>
              <CloseIcon onClick={() => setOpen(false)} />
            </Box>
            <SelectedModal selectedItemprop={selectedItem} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ProductList;
