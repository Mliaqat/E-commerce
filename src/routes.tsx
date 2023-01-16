import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";

const AdminRoutes = [
  {
    path: "/",
    component: lazy(
      () => import("./components/Admin/AdminDashboard/AdminDashboard")
    ),
  },
  {
    path: "/404",
    component: lazy(() => import("./components/Error404/Error")),
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
  {
    guard: "guest",
    path: "/login",
    component: lazy(() => import("./components/Auth/LogIn/Login")),
  },
  {
    guard: "guest",
    path: "/order-history",
    component: lazy(
      () => import("./components/Admin/OrderHistory/OrderHistory")
    ),
  },
  {
    guard: "guest",
    path: "/product-history",
    component: lazy(
      () => import("./components/Admin/ProductHistory/ProductHistory")
    ),
  },
];

const routesData = [
  {
    path: "/",
    component: lazy(() => import("./components/dashboard/Dashboard")),
  },
  {
    path: "/404",
    component: lazy(() => import("./components/Error404/Error")),
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
  {
    guard: "guest",
    path: "/login",
    component: lazy(() => import("./components/Auth/LogIn/Login")),
  },
  {
    guard: "guest",
    path: "/create-account",
    component: lazy(
      () => import("./components/Auth/CreateAccount/CreateAccount")
    ),
  },
  {
    path: "/store",
    component: lazy(() => import("./components/Store/Store")),
  },
  {
    path: "/frequently-asked-question",
    component: lazy(() => import("./components/Question/Question")),
  },
  {
    path: "/contact-us",
    component: lazy(() => import("./components/ContactUs/ContactUs")),
  },
  {
    path: "/history",
    component: lazy(() => import("./components/History/History")),
  },
];

const renderRoutes = (routesData: any) =>
  routesData ? (
    <Suspense>
      <Routes>
        {routesData.map((item: any) => {
          const Component = item?.component;
          return (
            <Route
              key={item.component}
              path={item.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;
function CutomRoutes() {
  const [updateRoutes, setUpdateRoutes] = React.useState(routesData);
  const isloggedIn = useAppSelector((item) => item.authReducer.isloggedIn);
  const newLocal = localStorage.getItem("isAdmin");
  const adminlogged = newLocal !== null ? JSON.parse(newLocal) : false;
  const routesUpdateFunction = () => {
    const updatedRoutes =
      isloggedIn === true
        ? routesData.filter((item: any) => item?.guard !== "guest")
        : routesData;
    setUpdateRoutes(updatedRoutes);
  };
  React.useEffect(() => {
    routesUpdateFunction();
  }, [isloggedIn]);

  return renderRoutes(adminlogged ? AdminRoutes : updateRoutes);
}

export default CutomRoutes;
