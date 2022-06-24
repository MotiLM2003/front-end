import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { Heading, Input } from "@chakra-ui/react";
import Edit2 from "@components/Icons/Edit2";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";
import { CloudFog } from "tabler-icons-react";
const EditableText = ({
  value,
  placeholder = "Please add the needed information",
  onDonateAmountSumChanged,
}) => {
  const [isEditableMode, setIsEditableMode] = useState(false);
  const [sum, setSum] = useState(value);
  useEffect(() => {}, [isEditableMode]);

  const renderContent = () => {
    if (!isEditableMode) {
      return (
        <div
          className="flex gap-2 items-center"
          onClick={() => setIsEditableMode(true)}
        >
          <div>
            <NumberFormat
              value={sum}
              displayType={"text"}
              customInput={Input}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsEditableMode(true)}
          >
            <Edit2 />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 items-center">
          <div>
            <NumberFormat
              placeholder={placeholder}
              value={sum}
              prefix={"$"}
              customInput={Input}
              onValueChange={(values, sourceInfo) => {
                const { formattedValue, value } = values;
                const { event, source } = sourceInfo;
                setSum(value);
              }}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log(isEditableMode);
              setIsEditableMode((prev) => false);
              onDonateAmountSumChanged("sum", sum);
            }}
          >
            <Ok2 size="16" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsEditableMode((current) => !current)}
          >
            <Cancel2 size="16" />
          </div>
        </div>
      );
    }
  };
  return renderContent();
};

export default EditableText;
