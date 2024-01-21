import React from "react";
import { useRoutes } from "react-router-dom";
import {
  Summary,
  Upload,
  CurrentProducts,
  Product,
  ProductHistory,
  AddProduct,
  CurrentMouldChange,
  MouldChange,
  MouldChangeHistory,
  AddMouldChange,
  CurrentStock,
  Stock,
  MaterialRequests,
  Request,
  RequestHistory,
  Profile,
  EditProfile,
} from "./components";
import { Home, SignIn, SignUp, Dashboard } from "./pages";

const AppRoutes = () => {
  const routing = useRoutes([
    { path: "/", element: <Home />, index: true },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { path: "/dashboard/", element: <Summary /> },
        { path: "upload", element: <Upload /> },
        {
          path: "view",
          children: [
            {
              path: "current",
              element: <CurrentProducts />,
              children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: "history",
              element: <ProductHistory />,
              children: [{ path: ":id", element: <Product /> }],
            },
            { path: "add", element: <AddProduct /> },
          ],
        },
        {
          path: "mouldchange",
          children: [
            {
              path: "current",
              element: <CurrentMouldChange />,
              children: [{ path: ":id", element: <MouldChange /> }],
            },
            {
              path: "history",
              element: <MouldChangeHistory />,
              children: [{ path: ":id", element: <MouldChange /> }],
            },
            { path: "add", element: <AddMouldChange /> },
          ],
        },
        {
          path: "material",
          children: [
            {
              path: "current",
              element: <CurrentStock />,
              children: [{ path: ":id", element: <Stock /> }],
            },
            {
              path: "request",
              element: <MaterialRequests />,
              children: [{ path: ":id", element: <Request /> }],
            },
            { path: "history", element: <RequestHistory /> },
          ],
        },
        {
          path: "profile",
          children: [
            {
              path: "detail",
              element: <Profile />,
            },
            { path: "edit", element: <EditProfile /> },
          ],
        },
      ],
    },
  ]);
  return routing;
};
export default AppRoutes;
