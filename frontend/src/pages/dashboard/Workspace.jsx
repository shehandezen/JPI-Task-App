import React from "react";
import { Outlet } from "react-router-dom";

const Workspace = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default Workspace;
