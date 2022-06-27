import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import IsActive from "@components/Shared/IsActive/IsActive";

const PaymentInterfaceItem = ({
  item,
  updateInterfaces,
  openResponseEditor,
}) => {
  const [paymentInterface, setPaymentInterface] = useState(item);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "isActive") {
      value = !paymentInterface.isActive;
    }

    setPaymentInterface({ ...paymentInterface, [name]: value });
  };

  useEffect(() => {}, [paymentInterface]);
  return (
    <>
      <div className=" border-b border-b-shades-100 p-2 flex items-center gap-3">
        <Checkbox
          size="sm"
          className="w-[55px]"
          isChecked={paymentInterface.isActive}
          onChange={onChange}
          name="isActive"
        >
          <IsActive isActive={paymentInterface.isActive} />
        </Checkbox>
        <div className="w-[150px]">
          <Input
            size="xs"
            value={paymentInterface.paymentName}
            onChange={onChange}
            name="paymentName"
            maxLength="30"
          />
        </div>
        <div className="w-[90px]">
          <Input
            type="number"
            size="xs"
            value={paymentInterface.feePercentage}
            className="small-input  text-center"
            name="feePercentage"
            onChange={onChange}
          />
        </div>
        <div className="w-[90px]">
          <Input
            type="number"
            size="xs"
            value={paymentInterface.fixedFee}
            className="small-input text-center"
            name="fixedFee"
            onChange={onChange}
          />
        </div>
        <div className="w-[90px]">
          <Input
            type="number"
            size="xs"
            value={paymentInterface.daysToRelease}
            className="small-input text-center"
            name="daysToRelease"
            onChange={onChange}
            max="3"
          />
        </div>

        <div>
          <Button size="xs" variant="outline" colorScheme="blue">
            Currencies
          </Button>
        </div>
        <div>
          <Button
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={() => openResponseEditor(paymentInterface)}
          >
            Interface Responses
          </Button>
        </div>
        <div>
          <Button
            size="xs"
            colorScheme="green"
            onClick={() => updateInterfaces(paymentInterface)}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentInterfaceItem;
