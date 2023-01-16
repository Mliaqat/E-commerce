import axios from "axios";
import { BASE_URL } from "../config";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
const OrderPlaced = () => {
  const { enqueueSnackbar } = useSnackbar();
  const accountUpdated = useAppSelector(
    (item) => item.authReducer.accountCreated
  );
  const userInfo = useAppSelector((item) => item.authReducer.loggedInfo);
  const [allOrder, setAllOrder] = useState<any>([]);
  const [orderPlaced, setOrderPlaced] = useState<any>({});
  const [orderItems, setOrderItems] = useState<any>([]);
  const getItemFromData = () => {
    const itemsArray = orderPlaced?.orderPlacedItems;
    let placedItem: any = [];
    for (const key in itemsArray) {
      placedItem.push({
        id: key,
        category: itemsArray[key].category,
        name: itemsArray[key].name,
        price: itemsArray[key].price,
        productId: itemsArray[key].productId,
        quantity: itemsArray[key].quantity,
        totalPrice: itemsArray[key].totalPrice,
        status: itemsArray[key].status,
      });
    }
    setOrderItems(placedItem);
  };
  useEffect(() => {
    getItemFromData();
  }, [orderPlaced]);

  const orderPlacedItem = async () => {
    try {
      const res: any = await axios.get(`${BASE_URL}/order-placed.json`);
      const { status } = res;
      const data = await res.data;
      switch (status) {
        case 200:
          let recieveData: any = [];
          for (const key in data) {
            recieveData.push({
              id: key,
              userEmail: data[key].userEmail,
              orderPlacedItems: data[key].orderPlacedItems,
            });
          }
          setAllOrder(recieveData);
          const userData = recieveData.find(
            (item: any) => item.userEmail === userInfo
          );
          setOrderPlaced(userData);
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
    orderPlacedItem();
  }, [accountUpdated]);
  return {
    allBookedOrder: allOrder,
    fireBaseOrderPlaced: orderPlaced,
    orderItems: orderItems,
  };
};

export default OrderPlaced;
