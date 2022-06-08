import {
  Button,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

// import  {faCircleArrowRight } from
import { ChevronDownIcon, PhoneIcon } from "@chakra-ui/icons";
const DonateOptions = ({ recurring, onRecurringUpdate }) => {
  const { recurringType, isRecurring, recurringCount } = recurring;

  return (
    <div className="flex flex-col gap-3 mt-5 shadow rounded p-4 bg-white">
      <div>
        <RadioGroup
          onChange={(e) => {
            console.log("e", e);
            onRecurringUpdate("isRecurring", e);
          }}
          value={isRecurring}
          name="isRecurring"
        >
          <Stack direction="row" className="flex justify-around">
            <Radio value="0">Single Contribution</Radio>
            <Radio value="1">Recurring Contribution</Radio>
          </Stack>
        </RadioGroup>
      </div>
      <section>
        <div className="flex justify-between mt-4">
          <Button
            variant={`${recurringType === 0 ? "solid" : "outline"}`}
            colorScheme="blue"
            onClick={() => {
              onRecurringUpdate("recurringType", 0);
            }}
          >
            Weekly
          </Button>
          <Button
            variant={`${recurringType === 1 ? "solid" : "outline"}`}
            colorScheme="blue"
            onClick={() => {
              onRecurringUpdate("recurringType", 1);
            }}
          >
            Bi-Weekly
          </Button>
          <Button
            variant={`${recurringType === 2 ? "solid" : "outline"}`}
            colorScheme="blue"
            onClick={() => {
              onRecurringUpdate("recurringType", 2);
            }}
          >
            Monthly
          </Button>
          <Button
            variant={`${recurringType === 3 ? "solid" : "outline"}`}
            colorScheme="blue"
            onClick={() => {
              onRecurringUpdate("recurringType", 3);
            }}
          >
            Quarterly
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 mt-5 items-center">
            <div className="grow">
              <Text className="text-black grow text-sm font-bold">
                After how many recurrences should the donation end?
              </Text>
            </div>
            <div>
              <Select
                icon={<ChevronDownIcon />}
                bg="tomato"
                borderColor="tomato"
                color="white"
                size="xs"
                className="text-center font-bold"
                value={recurringCount}
                onChange={(e) =>
                  onRecurringUpdate("recurringCount", e.target.value)
                }
              >
                <option className="text-black" value={0} selected>
                  On Going
                </option>
                {[...Array(100).keys()].map((item, index) => (
                  <option key={index} value={index + 1} className="text-black">
                    {index + 1}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <Text
            className="text-xs
              "
          >
            to cancel recurring donations at any time, please send request to
            support@worldoftzedaka.org
          </Text>
        </div>
      </section>
    </div>
  );
};

export default DonateOptions;
