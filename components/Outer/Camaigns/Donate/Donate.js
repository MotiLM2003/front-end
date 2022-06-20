import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGenericOnChange } from "../../../../hooks/useGenericOnChange";
import { getNewPayment } from "../../../../utils/payments";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import api from "../../../../apis/userAPI";

import { initialRecurringData } from "../../../../json-data/initialRecurring";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ChevronsDownLeft } from "tabler-icons-react";
const Donate = ({
  campaign,
  donation = null,
  customCompleteDonation = null,
  goToStage = 0,
}) => {
  let isAdmin = null;
  let isUpdatedByAdmin = null;
  if (donation && !donation._id) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  if (donation && donation._id) {
    isUpdatedByAdmin = true;
  } else {
    isUpdatedByAdmin = false;
  }

  const initialRecurring = { ...initialRecurringData };
  if (donation) {
    initialRecurring = { ...donation };
  }
  const [recurring, setRecurring] = useState(
    donation
      ? { ...donation, isAdmin: isAdmin, isUpdatedByAdmin: isUpdatedByAdmin }
      : {
          ...initialRecurring,
          isAdmin: isAdmin,
          isUpdatedByAdmin: isUpdatedByAdmin,
        }
  );

  const [privateRecurring, setPrivateRecurring] = useState({
    ...initialRecurring,
    isPrivateDonation: true,
    sum: 0,
    isAdmin: isAdmin,
    isUpdatedByAdmin: isUpdatedByAdmin,
  });
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

  const [stage, setStage] = useState(goToStage);

  const completeDonation = async () => {
    let result = null;
    // adding new donation.
    if (customCompleteDonation === null) {
      try {
        //  adding new recurring  data
        result = await api.post("/recurring/", {
          recurring,
          privateRecurring,
        });

        const newPayment = getNewPayment(result.data);
        // console.log("afte");
        // const test = await api.post("/payments/", newPayment);
        // console.log("new payment", newPayment);
        goToStage(4);
      } catch (e) {}
    } else {
      const result = customCompleteDonation({ recurring, privateRecurring });
    }
    // creating new payment
  };
  useEffect(() => {}, [privateRecurring]);

  useEffect(() => {}, [recurring]);
  useEffect(() => {
    onRecurringUpdate("firstName", privateRecurring.firstName);
    onRecurringUpdate("lastName", privateRecurring.lastName);
    onRecurringUpdate("cellphone", privateRecurring.cellphone);
    onRecurringUpdate("email", privateRecurring.email);
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
            donation={donation}
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

  useEffect(() => {}, [recurring]);
  useEffect(() => {}, [privateRecurring]);
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
