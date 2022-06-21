import React from "react";
import moment from "moment";
import { Button, Center, Tag, TagLabel, Td, Text, Tr } from "@chakra-ui/react";
import NumberFormat from "react-number-format";

import { getCurrency } from "../.././../json-data/currency";
import { paymentStatus } from "../.././../utils/payments";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";

const renderStatus = (status) => {
  switch (status) {
    case 0: {
      return (
        <Center>
          <Tag
            size="sm"
            key="sm"
            variant="outline"
            colorScheme="green"
            className="min-w-[150px]"
          >
            <TagLabel> {paymentStatus[status].text}</TagLabel>
          </Tag>
        </Center>
      );
    }
    case 3: {
      return (
        <Center>
          <Tag size="sm" key="sm" variant="outline" colorScheme="red">
            <TagLabel> {paymentStatus[status].text}</TagLabel>
          </Tag>
        </Center>
      );
    }
  }
  return paymentStatus[status].text;
};
const PaymentRow = ({ item }) => {
  return (
    <>
      <Tr>
        <Td>{moment(item.createdAt).format("DD-MM-YY HH:mm")}</Td>
        <Td className="text-success text-xs font-bold ">
          <Text className="text-success text-sm font-bold ">
            {renderStatus(item.status)}
          </Text>
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
          <Center>
            {" "}
            <div className="flex gap-1">
              <div>
                {" "}
                {item.isCompleteFee ? <Ok2 size={16} /> : <Cancel2 size={16} />}
              </div>
              <div>
                <NumberFormat
                  value={item.fee}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>
            </div>{" "}
          </Center>
        </Td>
        <Td>
          <Center>{item.recurringCount}</Center>
        </Td>
        <Td>
          <Center>{getCurrency(item.currency).symbol}</Center>
        </Td>
        <Td>
          <Button size="xs" colorScheme="red">
            Refund
          </Button>{" "}
        </Td>
      </Tr>
    </>
  );
};

export default PaymentRow;
