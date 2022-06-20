import React, { useState, useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
  useDisclosure,
  Center,
  Box,
  Switch,
  Text,
} from "@chakra-ui/react";
import { donationOptions } from "../.././../json-data/donationOptions";
import api from "../../../apis/userAPI";
import PaymentRow from "./PaymentRow";
import { createFuturePayments } from "../../../utils/payments";

const PaymentList = ({ donation }) => {
  const [list, setList] = useState([]);
  //   const [originalList, setOriginalList] = useState([]);
  const getList = async () => {
    const { data } = await api.post("/payments/get", {
      recurring: donation._id,
    });
    console.log("data", data);
    setList(data);
    // setOriginalList(data);
  };

  useEffect(() => {
    console.log(list);
    console.log(donation._id);
  }, [list]);

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <div className="flex gap-3 items-center mt-1 mb-3 justify-around">
        <div>
          Number of payments:{" "}
          <span className="text-red text-sm font-bold">
            {donation.recurringCount === 0
              ? "On Going"
              : donation.recurringCount}
          </span>{" "}
        </div>
        <div>
          Recurring type:{" "}
          <span className="text-red text-sm font-bold">
            {donationOptions[donation.recurringType].text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Text>Enable future payments</Text>
          <Box>
            <Switch
              checked={true}
              //   onChange={toggleFeatures}
              //   name={"isDescription"}
              //   colorScheme={color}
              //   isChecked={campaign.isDescription}
            />
          </Box>
        </div>
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>
                <span className="text-primary text-center">Created</span>
              </Th>
              <Th>
                <span className="text-primary text-center">Status</span>
              </Th>
              <Th>
                <span className="text-primary text-center">Sum</span>
              </Th>
              <Th>
                <span className="text-primary text-center">Fee</span>
              </Th>
              <Th>
                <span className="text-primary text-center">
                  {" "}
                  <Center>Payment # </Center>
                </span>
              </Th>
              <Td>
                <span className="text-primary text-center font-bold">
                  <Center>Currency</Center>
                </span>
              </Td>
            </Tr>
          </Thead>
          {list && list.map((item) => <PaymentRow item={item} />)}
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentList;
