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
  AddDailyProduction,
  MachineReport,
  ProductionReport,
  ProductionDetail,
  ProductionView,
  Notifications
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
        { path: "notifications", element: <Notifications /> },
        {
          path: "production", children: [
            {
              path: "adddailyproduction",
              element: <AddDailyProduction />,
             
            },
            {
              path: "machinereport/:id",
              element: <MachineReport />,
              // children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: "reports",
              element: <ProductionReport />,
              // children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: "view/:id",
              element: <ProductionDetail />,
              // children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: "view/:id/machine/:id",
              element: <ProductionView />,
              // children: [{ path: ":id", element: <Product /> }],
            },
          ]
        },
        {
          path: "view",
          children: [
            {
              path: "current",
              element: <CurrentProducts />,
              // children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: ":id",
              element: <Product />,
              // children: [{ path: ":id", element: <Product /> }],
            },
            {
              path: "history",
              element: <ProductHistory />,
              // children: [{ path: ":id", element: <Product /> }],
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
