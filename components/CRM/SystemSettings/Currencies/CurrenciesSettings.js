import React, { useState, useEffect } from "react";
import { Text, Button, Heading } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";

import CurrencyItem from "./CurrencyItem";
import initialCurrency from "json-data/initialCurrency";

import api from "apis/userAPI";
import { currencies } from "json-data/currency";
const CurrenciesSettings = () => {
  const [currentCurrency, setCurrentCurrency] = useState(initialCurrency);
  const [currenciesList, setCurrenciesList] = useState([]);

  const addItem = async (item) => {
    const { data } = await api.post("/currencies/add", item);
    toast.success(`${data.symbol} - ${data.description} created successfully!`);
    setCurrenciesList([...currenciesList, data]);
    setCurrentCurrency(initialCurrency);
  };

  const getItems = async () => {
    const { data } = await api.post("/currencies/get", {});
    setCurrenciesList(data);
  };

  const updateItem = async (item) => {
    const { data } = await api.put("/currencies/update", item);
    toast.success(`${item.symbol} - ${item.description} updated successfully!`);
    console.log("updated");
  };

  useEffect(() => {}, [currentCurrency]);

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <div class="flex flex-col gap-2 justify-center border rounded p-2">
        <p className="text-[1.1rem] text-primary font-bold ">
          Add new currency type:
        </p>

        <CurrencyItem item={currentCurrency} onSave={addItem} />
      </div>
      <div className="flex flex-col gap-2 mt-[2rem] flex flex-col gap-2 justify-center border rounded p-2">
        <p className="text-[1.1rem] text-primary font-bold ">
          Currencies list:
        </p>
        {currenciesList.map((item) => {
          return (
            <CurrencyItem
              item={item}
              onSave={(newItem) => updateItem(newItem)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CurrenciesSettings;
