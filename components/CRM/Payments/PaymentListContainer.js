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

const PaymentListContainer = ({ donation, futurePayments, list }) => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>
                <span className="text-primary text-center">Created</span>
              </Th>
              <Th>
                <Center>
                  <span className="text-primary text-center">Status</span>
                </Center>
              </Th>
              <Th>
                <span className="text-primary text-center">Sum</span>
              </Th>
              <Th>
                <Center>
                  <span className="text-primary text-center">Fee</span>{" "}
                </Center>
              </Th>
              <Th>
                <span className="text-primary text-center">
                  {" "}
                  <Center>Payment # </Center>
                </span>
              </Th>
              <Th>
                <span className="text-primary text-center font-bold">
                  <Center>Currency</Center>
                </span>
              </Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          {list &&
            [...list, ...futurePayments].map((item) => (
              <PaymentRow key={item._id} item={item} />
            ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentListContainer;
