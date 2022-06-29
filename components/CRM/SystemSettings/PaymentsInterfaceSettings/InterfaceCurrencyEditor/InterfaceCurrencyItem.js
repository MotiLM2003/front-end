import React, { useState, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";

const InterfaceCurrencyItem = ({ item, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        isChecked={item.isChecked}
        onChange={() => {
          onChange(item);
        }}
      />
      <div>
        {item.symbol} - ({item.description})
      </div>
    </div>
  );
};

export default InterfaceCurrencyItem;
