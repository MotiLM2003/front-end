import React from "react";
import moment from "moment";
import { Center, Td, Text, Tr } from "@chakra-ui/react";
import NumberFormat from "react-number-format";

import { getCurrency } from "../.././../json-data/currency";

const PaymentRow = ({ item }) => {
  return (
    <>
      <Tr>
        <Td>{moment(item.createdAt).format("DD-MM-YY HH:mm")}</Td>
        <Td className="text-success text-xs font-bold ">
          <Text className="text-success text-sm font-bold ">Success</Text>
        </Td>
        <Td>
          <NumberFormat
            value={item.sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Td>
        <Td>
          <NumberFormat
            value={item.fee}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Td>
        <Td>
          <Center>{item.recurringCount}</Center>
        </Td>
        <Td>
          <Center>{getCurrency(item.currency).symbol}</Center>
        </Td>
      </Tr>
    </>
  );
};

export default PaymentRow;
