import React, { useState, useEffect } from "react";

import Stage1 from "./Stage1";

const donationCount = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const Donate = ({ campaign }) => {
  return <Stage1 campaign={campaign} />;
};

export default Donate;
