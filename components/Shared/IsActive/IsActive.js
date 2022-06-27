import IsActiveIcon from "@components/Icons/IsActiveIcon";
import React from "react";

const IsActive = ({ isActive }) => {
  return (
    <IsActiveIcon
      width="10"
      height="9"
      fill={isActive ? "#29DC26" : "#e93f2a"}
    />
  );
};

export default IsActive;
