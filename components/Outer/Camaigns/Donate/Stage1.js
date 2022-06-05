import React, { useState, useEffect } from "react";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Radio,
  Stack,
  RadioGroup,
  Text,
  Button,
  Switch,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, PhoneIcon } from "@chakra-ui/icons";
import AccountIcon from "@components/Icons/AccountIcon";
import { currencies } from "../../../../json-data/currency";
import DonateOptions from "./DonateOptions";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloudFog } from "tabler-icons-react";

//faCircleArrowRight;
// importint
const initialRecurring = {
  displayName: "",
  currency: 0,
  sum: null,
  recurringType: 0,
  recurringCount: 0,
  isRecurring: "1",
  isAnonymous: false,
  isAddPublicNote: false,
  isCompleteFee: false,
  publicNote: "",
  owner: "",
};

const Stage1 = ({ campaign }) => {
  const [recurring, setRecurring] = useState(initialRecurring);
  const [isPublic, setIsPublic] = useState(false);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecurring({ ...recurring, [name]: value });
  };

  useEffect(() => {
    console.log("effect", recurring);
  }, [recurring]);
  const { campaignName } = campaign;
  const { displayName, sum, currency } = recurring;
  return (
    <div className="mt-2 mb-10">
      <div className="flex flex-col items-center gap-2">
        <Heading as="div" size="md" className="text-red font-bold">
          Donation for:
        </Heading>
        <Text className="text-black"> {campaignName} </Text>

        <div className="w-[550px] flex flex-col gap-3 mt-5">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AccountIcon color="gray.100" />}
            />

            <Input
              placeholder="Display Name"
              name="displayName"
              value={displayName}
              onChange={onChange}
            />
          </InputGroup>
          <div className="relative">
            <Input
              placeholder="Please enter the amount you want donate"
              value={sum}
              name="sum"
              onChange={onChange}
            />
            <div className="absolute top-[0] right-0">
              <Select
                icon={<ChevronDownIcon />}
                bg="tomato"
                borderColor="tomato"
                color="white"
                className="max-w-[80px] text-center"
                value={currency}
                onChange={(e) =>
                  setRecurring({ ...recurring, currency: e.target.value })
                }
              >
                {currencies.map((item) => (
                  <option className="text-black" value={item.id} key={item.id}>
                    {" "}
                    {item.symbol}{" "}
                  </option>
                ))}
              </Select>
            </div>
            <Text className="text-red text-center text-sm mt-4">
              The name that will appear in the names of the donors in the fund{" "}
            </Text>
            <DonateOptions recurring={recurring} setRecurring={setRecurring} />{" "}
            <div className="mt-5">
              <Stack direction="column" gap={1}>
                <div className="flex items-center gap-3">
                  <Switch
                    //   checked={campaign.isCertificate}
                    //   onChange={toggleFeatures}
                    //   name={'isCertificate'}
                    colorScheme="red"
                    //   isChecked={campaign.isCertificate}
                    checked={recurring.isAnonymous}
                    onChange={(e) => {
                      setRecurring({
                        ...recurring,
                        isAnonymous: e.target.checked,
                      });
                    }}
                  />{" "}
                  <Text className="font-bold">
                    I prefer to remain anonymous{" "}
                  </Text>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    colorScheme="red"
                    checked={recurring.isAddPublicNote}
                    onChange={(e) => {
                      setIsPublic(e.target.checked);

                      setRecurring({
                        ...recurring,
                        isAddPublicNote: e.target.checked,
                      });
                    }}
                  />
                  <div>
                    <Text className="font-bold">
                      {" "}
                      Add a public donation Note{" "}
                    </Text>
                    <AnimatePresence>
                      {isPublic && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-4"
                        >
                          <Input placeholder="Donation note..." />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    colorScheme="red"
                    checked={recurring.isCompleteFee}
                    onChange={(e) => {
                      setRecurring({
                        ...recurring,
                        isCompleteFee: e.target.checked,
                      });
                    }}
                  />
                  <Text className="font-bold text-primary">
                    {" "}
                    Complete Help offset the cost fees of this transaction.
                  </Text>
                </div>
              </Stack>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-12 cursor-pointer hover:scale(200)">
          <div className="grow">
            {" "}
            <FontAwesomeIcon
              className="text-slate-700 hover:text-red transition duration-500 hover:scale-[1.1] "
              icon={faCircleArrowRight}
              size="3x"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage1;
