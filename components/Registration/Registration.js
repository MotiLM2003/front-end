import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
const initialData = {
  email: '',
  password: '',
  rePassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  language: 0,
  birthDate: '',
  idNumber: '',
  country: '',
  city: '',
  street: '',
  zipCode: '',
  companyName: '',
  moreDetails: '',
  certificateNumber: '',
  isAgree: false,
  creditCardNumber: '',
  creditCardExpire: '',
  CVC: '',
};

const Registration = () => {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState(initialData);

  const onSetStage = (newStage) => {
    setStage(newStage);
  };

  const setFinalData = () => {
    console.log('data', data);
    setStage(2);
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.table(data);
    setData({ ...data, [name]: value });
  };

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <Stage1 onSetStage={onSetStage} data={data} onChange={onChange} />
        );
      case 1:
        return (
          <Stage2 onSetStage={setFinalData} data={data} onChange={onChange} />
        );
      case 2:
        return (
          <Stage3 onSetStage={setFinalData} data={data} onChange={onChange} />
        );
      default:
        return <Stage1 />;
    }
  };

  return <AnimatePresence>{renderStage()}</AnimatePresence>;
};

export default Registration;
