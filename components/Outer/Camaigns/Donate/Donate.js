import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGenericOnChange } from "../../../../hooks/useGenericOnChange";

import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import api from "../../../../apis/userAPI";

const donationCount = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const initialRecurring = {
  displayName: "",
  currency: 0,
  sum: 0,
  recurringType: 0,
  recurringCount: 0,
  isRecurring: "1",
  isAnonymous: false,
  isAddPublicNote: false,
  isCompleteFee: false,
  publicNote: "",
  owner: "",
  firstName: "",
  lastName: "",
  paymentType: 0,
  cellphone: "",
  email: "",
  donationNote: "",
  fee: 5.25,
  creditCardNumber: "",
  creditCardExpire: "",
  CVC: "",
  isMarketingEmail: false,
  campaign: "",
};

const Donate = ({ campaign }) => {
  const [recurring, setRecurring] = useState(initialRecurring);
  const [privateRecurring, setPrivateRecurring] = useState(initialRecurring);
  const onRecurringUpdate = (name, value) => {
    setRecurring((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPrivateRecurring({ ...privateRecurring, [name]: value });
  };
  const onCreditcardChange = (inputName, value) => {
    onUpdate(useGenericOnChange(inputName, value));
  };

  const [stage, setStage] = useState(0);

  const completeDonation = async () => {
    try {
      console.log(recurring);
      const r = await api.post("/recurring/", recurring);
      // setStage(3);
    } catch (e) {}
  };
  useEffect(() => {
    console.log("privateRecurring", privateRecurring);
  }, [privateRecurring]);

  useEffect(() => {
    onRecurringUpdate("firstName", privateRecurring.firstName);
    onRecurringUpdate("lastName", privateRecurring.lastName);
    onRecurringUpdate("cellphone", privateRecurring.cellphone);
    onRecurringUpdate("email", privateRecurring.email);

    console.log("ere", privateRecurring);
  }, [
    privateRecurring.firstName,
    privateRecurring.lastName,
    privateRecurring.firstName,
    privateRecurring.cellphone,
    privateRecurring.email,
  ]);

  useEffect(() => {
    onUpdate(useGenericOnChange("campaign", campaign._id));
    onRecurringUpdate("campaign", campaign._id);
  }, []);
  const renderStage = () => {
    switch (stage) {
      case 0: {
        return (
          <Stage1
            campaign={campaign}
            setStage={setStage}
            renderStage={renderStage}
            onRecurringUpdate={onRecurringUpdate}
            recurring={recurring}
          />
        );
      }
      case 1: {
        return (
          <Stage2
            campaign={campaign}
            setStage={setStage}
            onRecurringUpdate={onCreditcardChange}
            recurring={privateRecurring}
          />
        );
      }
      case 2: {
        return (
          <Stage3
            campaign={campaign}
            setStage={setStage}
            recurring={recurring}
            privateRecurring={privateRecurring}
            onCreditcardChange={onCreditcardChange}
            onUpdate={onUpdate}
            completeDonation={completeDonation}
          />
        );
      }
      case 3: {
        return <Stage4 campaign={campaign} />;
      }
    }
  };

  useEffect(() => {
    console.log("recurring", recurring);
  }, [recurring]);
  useEffect(() => {
    console.log("privateRecurring", privateRecurring);
  }, [privateRecurring]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ scale: 0, opacity: 0 }}
        className="mt-4"
      >
        {renderStage()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Donate;
