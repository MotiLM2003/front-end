import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Creditcard from "@components/Icons/Creditcard";
import Ach from "@components/Icons/Ach";
import Paypal from "@components/Icons/Paypal";
import OJC from "@components/Icons/OJC";
import Donors from "@components/Icons/Donors";
import googlePay from "../../../../images/icons/dark/google-pay.png";
import Image from "next/image";
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
  Checkbox,
} from "@chakra-ui/react";
import CreditcardHandler from "@components/Creditcard/CreditcardHandler";
import ACHUI from "@components/ACHUI/ACHUI";
import EditableText from "@components/Shared/EditableText/EditableText";

const Stage3 = ({
  campaign,
  setStage,
  recurring,
  privateRecurring,
  onCreditcardChange,
  onRecurringUpdate,
  onUpdate,
  completeDonation,
  onUpdateWithValues,
}) => {
  const [paymentType, setPaymentType] = useState(0);
  const { campaignName } = campaign;
  const { sum, fee } = recurring;
  const [isLoading, setIsLoading] = useState(false);
  const getTotal = () => {
    const feeSum = recurring.isCompleteFee ? fee : 0;
    const result =
      parseFloat(sum) + parseFloat(feeSum) + parseFloat(privateRecurring.sum);
    setTotal(result);
  };

  const [total, setTotal] = useState(0);
  useEffect(() => {
    // setting initial total
    getTotal();
  }, []);

  useEffect(() => {
    getTotal();
  }, [recurring.sum, privateRecurring.sum, recurring.isCompleteFee]);
  useEffect(() => {
    console.log("payment type", paymentType);
  }, [paymentType]);

  const completeDonate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      completeDonation(paymentType);
    }, 500);
  };
  const renderButton = () => {
    if (!recurring._id) {
      return (
        <Button
          colorScheme="orange"
          isLoading={isLoading}
          onClick={() => completeDonate()}
          loadingText="Thank you! Completing donation..."
        >
          Donate:&nbsp;
          {
            <CurrencyFormat
              value={total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              is
            />
          }
        </Button>
      );
    } else {
      return (
        <Button
          colorScheme="orange"
          isLoading={isLoading}
          onClick={() => completeDonate()}
          loadingText="Updating details..."
        >
          Update details
        </Button>
      );
    }
  };

  const renderPaymentDetails = () => {
    switch (paymentType) {
      case "0": {
        return (
          <CreditcardHandler
            onChange={onCreditcardChange}
            state={privateRecurring}
          />
        );
      }
      case "1": {
        console.log("here");
        return <ACHUI onChange={onUpdate} state={privateRecurring} />;
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    console.log("fee", recurring.isCompleteFee);
  }, [recurring.isCompleteFee]);
  const renderFee = () => {
    if (recurring.isCompleteFee) {
      return (
        <div className="flex gap-2  mb-3">
          <div className="fit-content text-primary  font-bold basis-50% w-[170px]">
            Transition Fee:
          </div>
          <div>
            <CurrencyFormat
              value={fee}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              size="sm"
              colorScheme="red"
              isChecked={recurring.isCompleteFee}
              onChange={(e) => {
                onRecurringUpdate("isCompleteFee", e.target.checked);
              }}
            />
            <Text className="italic text-xs">Cancel fee payment.</Text>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-3 mb-4">
          <Switch
            size="sm"
            colorScheme="red"
            isChecked={recurring.isCompleteFee}
            onChange={(e) => {
              onRecurringUpdate("isCompleteFee", e.target.checked);
            }}
          />
          <Text className="italic text-xs text-black">
            Complete Help offset the cost fees of this transaction ({" "}
            <CurrencyFormat
              value={fee}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            )
          </Text>
        </div>
      );
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -80 }}
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col gap-2  bg-white ">
        <div className="border p-7 rounded flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="fit-content text-primary  font-bold basis-50% w-[170px]">
              Campaign name:
            </div>
            <div>{campaignName}</div>
          </div>
          <div className="flex gap-2">
            <div className="fit-content text-primary  font-bold basis-50% w-[170px]">
              Donation:
            </div>
            <div className="donate-amount">
              <EditableText
                value={sum}
                onDonateAmountSumChanged={onRecurringUpdate}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="fit-content text-primary  font-bold basis-50% w-[170px]">
              General Donation:
            </div>
            <div>
              <div className="donate-amount">
                <EditableText
                  value={privateRecurring.sum}
                  onDonateAmountSumChanged={onUpdateWithValues}
                />
              </div>
            </div>
          </div>
          {renderFee()}
          <div className="flex gap-2">
            <div className="fit-content text-primary  font-bold basis-50% w-[170px] text-2xl">
              Total
            </div>
            <div className="text-2xl text-black font-bold">
              <CurrencyFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
        </div>
        <RadioGroup onChange={setPaymentType} value={paymentType}>
          <div className="flex flex-col gap-4 mt-5 pb-2">
            <div className="flex justify-around items-center  gap-2">
              <div
                className={`flex items-center gap-2 border p-3 rounded-xl border-gray-500 w-[200px] transition duration-1000 text-sm  ${
                  parseInt(paymentType) === 0 ? "bg-shades-500" : ""
                } `}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="0" defaultChecked={true}></Radio>
                </div>
                <div>
                  <Creditcard />
                </div>
                <div>Credit card</div>
              </div>
              <div
                className={`flex items-center gap-2 border p-3 rounded-xl border-gray-500 w-[200px] transition duration-1000 text-sm ${
                  parseInt(paymentType) === 1 ? "bg-shades-500" : ""
                }`}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="1"></Radio>
                </div>
                <div>
                  <Ach />
                </div>
                <div>ACH</div>
              </div>
              <div
                className={`flex items-center  gap-2 border p-3 rounded-xl border-gray-500 w-[200px]  transition duration-1000 text-sm ${
                  parseInt(paymentType) === 2 ? "bg-shades-500" : ""
                }`}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="2"></Radio>
                </div>
                <div>
                  <Paypal />
                </div>
                <div>Paypal</div>
              </div>
            </div>
            <div className="flex justify-around items-center ">
              <div
                className={`flex items-center gap-2 border p-3 rounded-xl border-gray-500 w-[200px] transition duration-1000 text-sm  ${
                  parseInt(paymentType) === 3 ? "bg-shades-500" : ""
                }`}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="3"></Radio>
                </div>
                <div>
                  <OJC />
                </div>
                <div>use OJC card</div>
              </div>
              <div
                className={`flex items-center gap-2 border p-3 rounded-xl border-gray-500 w-[200px] transition duration-1000 text-sm ${
                  parseInt(paymentType) === 4 ? "bg-shades-500" : ""
                }`}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="4"></Radio>
                </div>
                <div>
                  <Donors />
                </div>
                <div>use donors fund</div>
              </div>
              <div
                className={`flex items-center gap-2 border p-2 rounded-xl border-gray-500 w-[200px] transition duration-1000 text-sm ${
                  parseInt(paymentType) === 5 ? "bg-shades-500" : ""
                }`}
              >
                <div className="flex items-center justify-center ">
                  <Radio value="5"></Radio>
                </div>
                <div>
                  <Image src={googlePay} width={33} height={33} />
                </div>
                <div>GooglePay</div>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div className="bg-white">
        <AnimatePresence>{renderPaymentDetails()}</AnimatePresence>
      </div>
      <div className="pl-1 pt-4 flex flex-col gap-2">
        <div>
          <Checkbox oncChange={onUpdate} name="isMarketingEmail">
            I agree to receive marketing email
          </Checkbox>
        </div>
        <div>
          <Checkbox>I agree to Terms</Checkbox>
        </div>
      </div>
      <div className="py-8 flex items-center justify-center gap-10">
        <div>
          {" "}
          <div onClick={() => setStage(1)}>
            <FontAwesomeIcon
              className="text-slate-700 hover:text-red transition duration-250 hover:scale-[1.1] cursor-pointer "
              icon={faCircleArrowLeft}
              size="3x"
            />
          </div>
        </div>
        <div>{renderButton()}</div>
      </div>
    </motion.div>
  );
  טוב;
};

export default Stage3;
