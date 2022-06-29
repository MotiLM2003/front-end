import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// WOT imports
import api from "../../../../apis/userAPI";
import PaymentInterfaceItem from "./PaymentInterfaceItem";
import InterfaceResponsesEditor from "./InterfaceResponseEditor/InterfaceResponsesEditor";
import InterfaceCurrencyEditor from "./InterfaceCurrencyEditor/InterfaceCurrencyEditor";

const PaymentsInterfaceSettings = () => {
  const [list, setList] = useState([]);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [isCurrencyEditorOpen, setIsCurrencyEditorOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const getPaymentInterfaces = async () => {
    const { data } = await api.post("/payments-interface/");
    setList(data);
  };

  const updateInterfaces = async (item) => {
    try {
      api.put("/payments-interface/update", item);
      toast.success(`${item.paymentName} was successfully updated.`);
    } catch (err) {}
  };

  const updateInterfaceAllowedCurrencies = (newItem) => {
    console.log("allowed", newItem);
    setList(
      list.map((item) => {
        return item._id === newItem._id ? newItem : item;
      })
    );
  };

  const openResponseEditor = (item) => {
    setCurrentItem(item);
    setIsResponseOpen(true);
  };

  const openCurrenciesEditor = (item) => {
    setCurrentItem(item);
    setIsCurrencyEditorOpen(true);
  };

  useEffect(() => {
    console.log(list);
  }, [list]);
  useEffect(() => {
    getPaymentInterfaces();
  }, []);
  return (
    <div>
      <div className="my-3">
        <Button colorScheme="red" size="xs">
          Add new payment interface
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" border-b border-b-shades-100 p-2 flex items-center gap-3 text-sm font-bold text-primary">
          <div className="w-[55px]">Active</div>
          <div className="w-[150px]">Interface Name</div>
          <div className="w-[90px] text-center">Fee</div>
          <div className="w-[85px] text-center">Fixed fee</div>
          <div className="w-[80px] text-center">Release</div>
        </div>
        {list.map((item) => {
          return (
            <PaymentInterfaceItem
              item={item}
              updateInterfaces={updateInterfaces}
              openResponseEditor={openResponseEditor}
              openCurrenciesEditor={openCurrenciesEditor}
            />
          );
        })}
      </div>

      {isCurrencyEditorOpen && (
        <InterfaceCurrencyEditor
          isOpen={isCurrencyEditorOpen}
          updateInterfaceAllowedCurrencies={updateInterfaceAllowedCurrencies}
          onClose={() => {
            setIsCurrencyEditorOpen(false);
          }}
          item={currentItem}
          onCurrenciesUpdated={updateInterfaceAllowedCurrencies}
        />
      )}
      {isResponseOpen && (
        <InterfaceResponsesEditor
          isOpen={isResponseOpen}
          onClose={() => {
            setIsResponseOpen(false);
          }}
          item={currentItem}
        />
      )}
    </div>
  );
};

export default PaymentsInterfaceSettings;
