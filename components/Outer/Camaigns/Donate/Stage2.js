import React, { useState, useEffect } from "react";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Radio,
  Stack,
  RadioGroup,
  Text,
  Button,
  Switch,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, PhoneIcon } from "@chakra-ui/icons";
import AccountIcon from "@components/Icons/AccountIcon";
import Cellphone from "@components/Icons/Cellphone";
import Email from "@components/Icons/Email";
import { currencies } from "../../../../json-data/currency";
import DonateOptions from "./DonateOptions";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloudFog } from "tabler-icons-react";
import NumberFormat from "react-number-format";

//faCircleArrowRight;
// importint

const Stage2 = ({ campaign, setStage, recurring, onRecurringUpdate }) => {
  const [isPublic, setIsPublic] = useState(false);

  const { campaignName } = campaign;
  const { firstName, lastName, email, cell, sum, currency } = recurring;
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className=""
      style={{ overflow: "hidden" }}
    >
      <div>
        <div className="flex justify-around">
          <div>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AccountIcon color="gray.100" />}
              />

              <Input
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  onRecurringUpdate(e.target.name, e.target.value);
                }}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AccountIcon color="gray.100" />}
              />
              <Input
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  onRecurringUpdate(e.target.name, e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <div className="my-4 flex justify-center text-primary">
          <Text>
            The name that will appear in the names of the donors in receipt
          </Text>
        </div>
        <div className="flex justify-around">
          <div>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Cellphone color="gray.100" />}
              />

              <Input
                placeholder="Cell"
                name="cellphone"
                value={firstName}
                onChange={(e) => {
                  onRecurringUpdate(e.target.name, e.target.value);
                }}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Email color="gray.100" />}
              />
              <Input
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => {
                  onRecurringUpdate(e.target.name, e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <div className="mt-5 bg-[#DFDFDF] py-10 px-3 rounded flex flex-col justify-center items-center">
          <Heading as="div" size="md" className="text-red font-bold">
            THE WORLD OF TZEDAKA NEEDS YOUR HELP!
          </Heading>
          <Text className="text-black my-5 text-center  leading-5">
            World of Tzedaka also has many cases of tragedies that we are not
            able to publicize. Please consider adding a donation to our general
            tzeadakah fund.
          </Text>
          <Text className="font-bold text-primary text-xl">
            General Donation Amount
          </Text>
          <div className="generalDonation relative">
            <NumberFormat
              thousandSeparator={true}
              prefix={"$"}
              value={sum}
              className="bg-white"
              customInput={Input}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                onRecurringUpdate("sum", value);
              }}
            />
            <div className="absolute top-[0] right-0 ">
              <Select
                icon={<ChevronDownIcon />}
                bg="tomato"
                borderColor="tomato"
                color="white"
                className="max-w-[80px] text-center"
                value={currency}
                onChange={(e) => {
                  onRecurringUpdate(e.target.name, e.target.value);
                }}
              >
                {currencies.map((item) => (
                  <option className="text-black" value={item.id} key={item.id}>
                    {" "}
                    {item.symbol}{" "}
                  </option>
                ))}
              </Select>
            </div>
            <DonateOptions
              recurring={recurring}
              onRecurringUpdate={onRecurringUpdate}
            />{" "}
          </div>
        </div>
        <div className="flex justify-center  gap-10  mt-12 cursor-pointer hover:scale(200) pb-4">
          <div onClick={() => setStage(0)}>
            <FontAwesomeIcon
              className="text-slate-700 hover:text-red transition duration-250 hover:scale-[1.1] "
              icon={faCircleArrowLeft}
              size="3x"
            />
          </div>
          <div onClick={() => setStage(2)}>
            <FontAwesomeIcon
              className="text-slate-700 hover:text-red transition duration-250 hover:scale-[1.1] "
              icon={faCircleArrowRight}
              size="3x"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stage2;