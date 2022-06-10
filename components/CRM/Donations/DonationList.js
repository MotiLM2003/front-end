import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Center, useToast } from "@chakra-ui/react";
import FlipMove from "react-flip-move";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { Stack, Button, ButtonGroup } from "@chakra-ui/react";
import api from "../../../apis/userAPI";
import edit from "../../../images/icons/edit.svg";
import Loading from "@components/Loader/Loader";
import Loader from "@components/Loader/Loader";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import edit2 from "../../../images/icons/white/edit.svg";
import close from "../../../images/icons/white/close.svg";
import DonationRow from "./DonationRow";
import { returnTrue } from "react-currency-format/lib/utils";
import DonateModel from "@components/Outer/Camaigns/Donate/DonateModel";
import DonateContainerModel from "@components/Outer/Camaigns/Donate/DonateContainerModel";

const DonationList = () => {
  const toast = useToast();
  const [donations, setDonations] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [filterByMenu, setFilterBy] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showDonationType, setShowDonationType] = useState(0);
  const [openEditDonation, setOpenEditDonation] = useState(false);
  const [totals, setTotals] = useState({
    all: 0,
    archive: 0,
    pending: 0,
    approved: 0,
  });

  const [currentDonation, setCurrentDonation] = useState(null);

  const onChange = (e, user) => {
    const name = e.target.name;
    const value = e.target.value;
    // setUser({ ...users, [name]: value });
    // setUser(
    //   users.map((u) => {
    //     return u._id === user._id ? { ...user, [name]: value } : u;
    //   })
    // );
  };

  const openEditDonationMenu = (donation) => {
    setOpenEditDonation(true);
    setCurrentDonation(donation);
  };

  const changeUser = async (user, update) => {
    // setUser(
    //   users.map((u) => {
    //     return u._id === user._id ? user : u;
    //   })
    // );
    // const user = await api.post("/users/UpdateById", update);
    // toast({
    //   position: "top",
    //   title: "Action successfully committed.",
    //   status: "success",
    //   duration: 4000,
    //   isClosable: true,
    // });
    // try {
    // } catch (error) {}
  };

  const updateUserDetails = async (updates) => {
    // setLoadingMessage("Updating user details, please wait...");
    // setLoading(true);
    // try {
    //   const user = await api.post("/users/UpdateById", updates);
    //   toast({
    //     position: "top",
    //     title: "User details successfully updated!",
    //     status: "success",
    //     duration: 4000,
    //     isClosable: true,
    //   });
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
  };

  //   useEffect(() => {
  //     setTotals({
  //       all: users.length,
  //       archive: users.filter((x) => x.status === 3).length,
  //       pending: users.filter((x) => x.status === 0).length,
  //       approved: users.filter((x) => x.status === 1).length,
  //     });
  //   }, [users]);

  useEffect(() => {
    const getData = async () => {
      setLoadingMessage("Getting users list..");
      setLoading(true);
      try {
        const { data } = await api.post("/recurring/get", {});
        setLoading(false);
        console.log(data);
        setDonations(data);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const customCompleteDonation = (data) => {
    console.log("data", data);
  };
  const orderBy = () => {
    console.log(donations);
    switch (showDonationType) {
      case 0: {
        return donations;
      }
      // private
      case 1: {
        const recurring = donations.filter((x) => !x.isPrivateDonation);
        return recurring;
      }
      // approve
      case 2: {
        const recurring = donations.filter((x) => x.isPrivateDonation);
        return recurring;
      }
    }

    return donations;
  };

  return (
    <div>
      <div className="flex items-center  gap-5 donation-buttons mb-5">
        <div>
          <Button
            variant="outline"
            className={`${
              showDonationType === 0 ? "bg-primary" : ""
            } text-white`}
            onClick={() => {
              setShowDonationType(0);
            }}
          >
            All Donations
          </Button>{" "}
        </div>
        <div>
          <Button
            className={`${
              showDonationType === 1 ? "bg-primary" : ""
            } text-white`}
            variant="outline"
            onClick={() => {
              setShowDonationType(1);
            }}
          >
            To Campaign
          </Button>{" "}
        </div>
        <div>
          <Button
            className={`${
              showDonationType === 2 ? "bg-primary" : ""
            } text-white`}
            variant="outline"
            onClick={() => {
              setShowDonationType(2);
            }}
          >
            Only Private
          </Button>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>
                  <span className="text-primary text-center">Active</span>
                </Th>
                <Th>
                  <span className="text-primary flex justify-center">
                    {" "}
                    type
                  </span>
                </Th>
                <Th>
                  <span className="text-primary">Created</span>
                </Th>
                <Th>
                  <span className="text-primary">
                    <Center> Currency</Center>
                  </span>
                </Th>
                <Th>
                  <span className="text-primary">Sum</span>
                </Th>
                <Th>
                  <span className="text-primary">Fee</span>
                </Th>
                <Th>
                  <span className="text-primary">Full Name</span>
                </Th>
                <Th>
                  <span className="text-primary">Email</span>
                </Th>
                <Th>
                  <span className="text-primary">Phone</span>
                </Th>
                <Th>
                  <span className="text-primary">Tools</span>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {orderBy(filterByMenu).map((donation, index) => {
                return (
                  <DonationRow
                    key={donation._id}
                    donation={donation}
                    isLoading={isLoading}
                    openEditDonationMenu={openEditDonationMenu}
                  />
                );
              })}
            </Tbody>

            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </div>

      {isLoading && <Loader isLoading={isLoading} text={loadingMessage} />}

      {openEditDonation && (
        <DonateContainerModel
          isOpen={openEditDonation}
          onClose={() => {
            setOpenEditDonation(false);
          }}
          campaign={{ campaignName: "test" }}
          donation={currentDonation}
          customCompleteDonation={customCompleteDonation}
        />
      )}
    </div>
  );
};

export default DonationList;
