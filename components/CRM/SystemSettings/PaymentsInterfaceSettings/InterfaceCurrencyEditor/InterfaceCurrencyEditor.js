import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import api from "apis/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InterfaceCurrencyItem from "./InterfaceCurrencyItem";

const InterfaceCurrencyEditor = ({
  item,
  isOpen,
  onClose,
  updateInterfaceAllowedCurrencies,
  onCurrenciesUpdated,
}) => {
  const [currenciesList, setCurrenciesList] = useState([]);
  const getItems = async () => {
    const { data } = await api.post("/currencies/get", {});
    console.log("item", item.allowedCurrencies);
    setCurrenciesList(
      data.map((i) => ({
        ...i,
        isChecked: item.allowedCurrencies.find((x) => x === item._id),
      }))
    );
  };

  const onChange = (item) => {
    setCurrenciesList(
      currenciesList.map((currency) => {
        return currency._id === item._id
          ? { ...item, isChecked: !item.isChecked }
          : currency;
      })
    );
  };

  const onUpdate = () => {
    onCurrenciesUpdated(item);
  };

  useEffect(() => {
    console.log("updating", item);
    const allowedCurrencies = currenciesList
      .filter((x) => x.isChecked)
      .map((currencies) => currencies._id);
    item.allowedCurrencies = allowedCurrencies;
    updateInterfaceAllowedCurrencies(item);
  }, [currenciesList]);
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {item.paymentName} interface supported currency list
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <div class="flex gap-5">
              <div className="l-input">Currencies</div>
            </div>
            <div class="flex   gap-5">
              <div>
                {currenciesList &&
                  currenciesList.map((item) => (
                    <InterfaceCurrencyItem
                      key={item._id}
                      item={item}
                      onClose={onClose}
                      onChange={onChange}
                    />
                  ))}
              </div>
            </div>
            <div className="mt-8">
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  onUpdate();
                  onClose();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InterfaceCurrencyEditor;
