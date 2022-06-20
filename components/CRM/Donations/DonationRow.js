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
  Text,
  Divider,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Edit from "@components/Icons/Edit";
import Close from "@components/Icons/Close";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";
import { currencies } from "../../../json-data/currency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

import {
  faEnvelope,
  faPenToSquare,
  faCirclePlus,
  faFileCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Donate from "@components/Outer/Camaigns/Donate/Donate";
import { CloudFog } from "tabler-icons-react";

const DonationRow = ({
  donation,
  changeUser,
  updateUserDetails,
  isLoading,
  openEditDonationMenu,
  openNewDonationMenu,
  currentDonation,
  updatePrivateNotes,
  openPaymentList,
}) => {
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [privateNote, setPrivateNote] = useState(
    donation ? donation.privateNotes : ""
  );
  const renderFullDetailsRecurring = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 120 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, height: 0 }}
        className="flex justify-around"
      >
        <div className="donation-full-details-content p-4 min-w-[450px] my-2">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Payments Number</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {`${
                    donation.recurringCount === 0
                      ? "Ongoing"
                      : donation.recurringCount
                  }`}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payments Done</Text>
                <Text className="pl-4 text-xs font-bold mt-1">1</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Payment Method</Text>
                <Text className="pl-4 text-xs font-bold mt-1">Credit Card</Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payment Processor</Text>
                <Text className="pl-4 text-xs font-bold mt-1">Banquest</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="donation-full-details-content p-4 min-w-[450px] my-2">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• By Partner</Text>
                <Text className="pl-4 text-xs font-bold mt-1">{`${donation.firstName} ${donation.lastName}`}</Text>
              </div>
              <div>
                <Text className="text-red font-bold">• UTM link</Text>
                <Text className="pl-4 text-xs font-bold mt-1">[WIP]</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Note</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.donationNote}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFullDetailsPayment = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: donation.isRecurring === "1" ? 120 : 150,
        }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0, height: 0 }}
        className="flex justify-around"
      >
        <div className="donation-full-details-content p-4 min-w-[450px] my-1">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• By Partner</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {`${donation.firstName} ${donation.lastName}`}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• UTM link</Text>
                <Text className="pl-4 text-xs font-bold mt-1">[WIP]</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">•Donor Note</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.donationNote}
                </Text>
              </div>
              <div className="mt-4 pl-4">
                <Text className="text-xs font-bold mt-1">Private note:</Text>
                <div className="flex gap-3 mt-1 items-center">
                  <Input
                    className=""
                    size="xs"
                    placeholder="Add private note."
                    value={privateNote}
                    onChange={(e) => {
                      setPrivateNote(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    size="1x"
                    className="text-primary hover:text-green-900 transition duration-500 cursor-pointer"
                    onClick={() => {
                      const { _id } = donation;

                      updatePrivateNotes({ _id, privateNote });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="donation-full-details-content p-3 min-w-[450px] my-1">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center min-w-[250px]">
              <div>
                <Text className="text-red font-bold">• Payment Method</Text>
                <Text className="pl-4 text-xs font-bold mt-1">Credit Card</Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payment Processor</Text>
                <Text className="pl-4 text-xs font-bold mt-1">Banquest</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red mx-2">
              &nbsp;
            </div>
            <div className="bg-shades-100 px-4 py-2 rounded min-w-[200px] ">
              <div className="flex flex-col gap-1 justify-center">
                <div className="flex flex-col justify-center gap-1">
                  <Text className="text-red font-bold">• Processing fee</Text>
                  <Text className="pl-4 text-xs font-bold mt-1">
                    <NumberFormat
                      value={donation.fee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Text>
                  {donation.isCompleteFee ? (
                    <div className="flex items-center gap-1 pl-4">
                      <div>
                        <Ok2 size={12} />
                      </div>
                      <div className="text-success font-bold text-xs ">
                        Fee covered
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 pl-4">
                      <div>
                        <Cancel2 size={12} />
                      </div>
                      <div className="text-red font-bold text-xs ">
                        Fee is not covered
                      </div>
                    </div>
                  )}
                  <div className="pl-4 mt-1">
                    <Text className="text-red font-bold text-xs">
                      • Time till funds available
                    </Text>

                    <Text className="text-xs font-bold mt-1">
                      4 days and 10 hours (2022-05-07)
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  const renderFullDetails = () => {
    return donation.isRecurring.trim() === "1"
      ? renderFullDetailsRecurring()
      : renderFullDetailsPayment();
  };

  return (
    <>
      <Tr key={donation._id} className="h-[60px]">
        <Td>
          <Center>
            <div className="flex  items-center gap-1 ">
              <div
                className={`rounded-2xl border ${
                  donation.isActive == 1 ? "bg-success" : "bg-red"
                } w-[12px] h-[12px]`}
              ></div>
            </div>
          </Center>
        </Td>
        <Td>
          <div className="flex  items-center gap-3 ">
            <div
              className={`rounded-2xl order ${
                donation.isPrivateDonation == 1 ? "bg-success" : "bg-red"
              } w-[12px] h-[12px]`}
            ></div>

            <div className="text-sm">
              {donation.isPrivateDonation == 1 ? "Private" : "Campaign"}
            </div>
          </div>
        </Td>
        <Td>
          <Center>
            <div className="flex  items-center gap-1 ">
              <div
                className={`rounded-2xl border ${
                  donation.isRecurring === "1" ? "bg-success" : "bg-red"
                } w-[12px] h-[12px]`}
              ></div>
            </div>
          </Center>
        </Td>
        <Td className="text-center">
          <div className="text-sm">
            {moment(donation.createdAt).format("DD-MM-YY HH:mm")}
          </div>
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
        <Td>
          <div className="flex items-center gap-2">
            <div>
              {donation.isCompleteFee ? (
                <Ok2 size={16} />
              ) : (
                <Cancel2 size={16} />
              )}
            </div>
            <div>
              {" "}
              <NumberFormat
                value={donation.fee}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
        </Td>
        <Td>{donation.firstName}</Td>
        <Td> {donation.lastName}</Td>
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
            <div
              onClick={() => {
                setIsFullDetails((prev) => !prev);
              }}
            >
              <FontAwesomeIcon
                icon={faCirclePlus}
                size="1x"
                className="text-red hover:text-green-900 transition duration-500 cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                openNewDonationMenu(donation);
              }}
            >
              <FontAwesomeIcon
                icon={faFileCirclePlus}
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
            {donation.isRecurring === "1" && (
              <div
                onClick={() => {
                  openPaymentList(donation);
                }}
              >
                <FontAwesomeIcon
                  icon={faList}
                  size="1x"
                  className="text-blue-500 hover:text-blue-900 transition duration-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </Td>
      </Tr>
      <AnimatePresence>
        {isFullDetails && (
          <motion.tr
            className={` bg-shades-200`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 120 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Td colSpan={11}>{renderFullDetails()}</Td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationRow;
