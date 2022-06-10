import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
  Button,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Edit from "@components/Icons/Edit";
import Close from "@components/Icons/Close";
import { currencies } from "../../../json-data/currency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPenToSquare,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";

const DonationRow = ({
  donation,
  changeUser,
  updateUserDetails,
  isLoading,
  openEditDonationMenu,
}) => {
  const updateChanges = () => {
    const updates = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      idNumber: user.idNumber,
    };
    updateUserDetails(updates);
  };

  return (
    <>
      <Tr key={donation._id} className="h-[60px]">
        <Td>
          <div className="flex  items-center gap-1 ">
            <div
              className={`rounded-2xl border ${
                donation.isActive == 1 ? "bg-success" : "bg-red"
              } w-[12px] h-[12px]`}
            ></div>
            {donation.isActive == 1 ? "Active" : "Disabled"}
          </div>
        </Td>
        <Td>
          <div className="flex  items-center gap-1 ">
            <div
              className={`rounded-2xl border ${
                donation.isPrivateDonation == 1 ? "bg-success" : "bg-red"
              } w-[12px] h-[12px]`}
            ></div>

            {donation.isPrivateDonation == 1 ? "Private" : "Campaign"}
          </div>
        </Td>
        <Td className="text-center">
          {moment(donation.createdAt).format("DD-MM-YY HH:mm")}
        </Td>
        <Td>
          <Center> {currencies[donation.currency].symbol}</Center>
        </Td>
        <Td>
          <NumberFormat
            value={donation.sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Td>
        <Td>{donation.fee}</Td>
        <Td>
          {donation.firstName} {donation.lastName}
        </Td>
        <Td>
          <FontAwesomeIcon
            icon={faEnvelope}
            size="1x"
            className="text-slate-500 hover:text-slate-900 transition duration-500 cursor-pointer"
          />
        </Td>
        <Td>{donation.cellphone}</Td>
        <Td>
          <div className="flex items-center gap-2">
            <div>
              <FontAwesomeIcon
                icon={faCirclePlus}
                size="1x"
                className="text-green-500 hover:text-green-900 transition duration-500 cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                openEditDonationMenu(donation);
              }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="1x"
                className="text-blue-500 hover:text-blue-900 transition duration-500 cursor-pointer"
              />
            </div>
          </div>
        </Td>
      </Tr>
    </>
  );
};

export default DonationRow;
