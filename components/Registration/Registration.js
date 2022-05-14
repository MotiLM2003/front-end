import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import api from '../../apis/userAPI';

import { fakeData, data } from './data';
const initialData = fakeData;

const Registration = () => {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState(initialData);
  const [rabiList, setRabiList] = useState([]);

  const onSetStage = (newStage) => {
    if (newStage !== 2) {
      setStage(newStage);
    } else {
      data.rabiList = rabiList;
      setFinalData();
    }
  };

  const setFinalData = async () => {
    const user = await api.post('http://localhost:5000/users/', data);
    setStage(2);
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked;
      setData({ ...data, [name]: isChecked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <Stage1 onSetStage={onSetStage} data={data} onChange={onChange} />
        );
      case 1:
        return (
          <Stage2
            onSetStage={onSetStage}
            data={data}
            onChange={onChange}
            rabiList={rabiList}
            setRabiList={setRabiList}
          />
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
