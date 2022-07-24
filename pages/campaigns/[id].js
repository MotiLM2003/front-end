import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Heading, Progress, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedNumber from "animated-number-react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Layout from "pages/shared/Layout";
import api from "../../apis/userAPI";

import Image from "next/image";
import hero from "../../images/temp/banner-temp.svg";
import fakeSlider from "../../images/temp/fake-slider.png";
import graph from "../../images/icons/graph.svg";
import goal from "../../images/icons/goal.svg";
import donors from "../../images/icons/donors.svg";
import CharityButtons from "@components/Outer/Camaigns/CharityButtons/CharityButtons";
import DonateModel from "@components/Outer/Camaigns/Donate/DonateModel";
import { initialRecurringData } from "../../json-data/initialRecurring";
import DonateContainerModel from "@components/Outer/Camaigns/Donate/DonateContainerModel";
import Panel from "./Panel";

const CampaignDetails = ({ data }) => {
  // const [id, setId] = useState(null);
  const [campaign, setCampaign] = useState({});
  const [isCharityButtonDonation, setIsCharityButtonDonation] = useState(false);
  const [charityDonation, setCharityDonation] = useState(initialRecurringData);
  const [progressWidth, setProgressWidth] = useState(0);
  const router = useRouter();
  useEffect(() => {
    setCampaign(data);
    setTimeout(() => {
      setProgressWidth(95);
    }, 2000);

    const interval = setInterval(() => {
      moveToNextPanel();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { campaignName, shortDescription, isDescription } = campaign;

  const customCompleteDonation = () => {};

  const openCharityButtonDonation = (sum) => {
    setIsCharityButtonDonation(true);
    setCharityDonation({ ...initialRecurringData, sum });
  };

  const closeCharityButtonDonation = () => {
    setIsCharityButtonDonation(false);
  };

  const mainVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 1.2, delayChildren: 0.5 },
    },
  };

  const childVariants1 = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
  };

  const childVariants2 = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring", damping: 15, stiffness: 52 },
    },
  };

  const spring = {
    type: "spring",
    damping: 110,
    stiffness: 1020,
  };

  const sliderVariant = {
    hidden: { scale: 1.5, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, type: "spring", damping: 15, stiffness: 52 },
    },
  };

  const formatValue = (total) => {
    const isDecimal = total - Math.floor(total) > 0;

    return total
      .toFixed(isDecimal ? 2 : 0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const flick = useRef(null);

  const moveToNextPanel = async () => {
    if (flick && flick.current) {
      await flick.current.next();
    }
  };

  const moveToPrevPanel = () => {};

  useEffect(() => {
    if (!flick.current) return;
    console.log(flick.current.next());
  }, [flick.current]);

  return (
    <Layout>
      <div className="default-container">
        <Image src={hero} />
        <div className="flex justify-center">
          <section
            style={{ overflow: "hidden" }}
            className="w-[88%] -mt-[40px] md:-mt-[80px] bg-white shadow rounded flex flex-col gap-4 justify-center relative z-50 p-3"
          >
            <Heading className="text-black">{campaignName}</Heading>
            <div>
              <Text>{shortDescription}</Text>
            </div>
            <div className="flex flex-col md:flex-row justify-center ">
              {campaign.isImgVideoSlider && (
                <div className={`basis-1/2 flex  flex-col justify-center`}>
                  <motion.div
                    variants={sliderVariant}
                    initial="hidden"
                    animate="show"
                    className={` w-[80%] ${
                      campaign.isGoal ? "max-w-[450px]" : "max-w-650px"
                    }`}
                  >
                    <Flicking ref={flick} circular={true}>
                      <div
                        className={`${
                          campaign.isGoal
                            ? "h-[300px] w-[450px]"
                            : "h-[400px] w-[650px]"
                        }   bg-red  flex items-center justify-center panel`}
                      >
                        <p className="text-white"> items-center 1</p>
                      </div>
                      <div
                        className={`${
                          campaign.isGoal
                            ? "h-[300px] w-[450px]"
                            : "h-[400px] w-[650px]"
                        } bg-green-500 flex items-center justify-center  panel`}
                      >
                        <p className="text-white"> items-center 2</p>
                      </div>
                      <div
                        className={`${
                          campaign.isGoal
                            ? "h-[300px] w-[450px]"
                            : "h-[400px] w-[650px]"
                        } bg-purple-500  flex items-center justify-center panel`}
                      >
                        <p className="text-white"> items-center 3</p>
                      </div>
                    </Flicking>
                  </motion.div>
                  <div className="flex gap-1 mt-3 justify-center mr-[6.5rem]">
                    <div className="bg-[#1979BE] w-[40px] h-[13px] rounded-xl cursor-pointer">
                      &nbsp;
                    </div>
                    <div className="bg-[#8BB8D8] w-[20px] h-[13px] rounded-xl  cursor-pointer">
                      &nbsp;
                    </div>
                    <div className="bg-[#8BB8D8] w-[20px] h-[13px] rounded-xl  cursor-pointer">
                      &nbsp;
                    </div>
                  </div>
                </div>
              )}

              {campaign.isGoal && (
                <motion.div
                  variants={mainVariants}
                  initial="hidden"
                  animate="show"
                  className={`${
                    campaign.isImgVideoSlider ? "basis-1/2" : "grow"
                  } flex flex-col gap-5`}
                >
                  <h2 className="text-black  font-bo ld flex items-center ">
                    <div className="mr-2">Raised Percent:</div>
                    <div>$</div>
                    <div>
                      <AnimatedNumber
                        value={"25800"}
                        formatValue={formatValue}
                        duration={800}
                        easing="linear"
                      />
                    </div>
                  </h2>
                  <div>
                    <Progress
                      value={progressWidth}
                      isIndeterminate={progressWidth <= 0}
                    />
                  </div>
                  <div>
                    <motion.div
                      variants={childVariants1}
                      initial="hidden"
                      animate="show"
                      className="flex justify-center items-center gap-6"
                    >
                      <motion.div className="basis-[30%]">
                        <div className="flex flex-col justify-center items-center">
                          <Image src={graph} width={36} height={33} />
                          <Text className="font-bold">Found Raised:</Text>
                          <Heading as="div" size="md">
                            25.75%
                          </Heading>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={childVariants2}
                        className="basis-[40%] border-l-2 border-r-2 border-stone-400"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <Image src={goal} width={36} height={33} />
                          <Text className="font-bold">Funding Goal:</Text>
                          <Heading as="div" size="md">
                            $100,000
                          </Heading>
                        </div>
                      </motion.div>
                      <motion.div
                        className="basis-[30%]"
                        variants={childVariants2}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <Image src={donors} width={32} height={28} />
                          <Text className="font-bold">Donors</Text>
                          <Heading as="div" size="md">
                            165
                          </Heading>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="flex justify-center  my-14 ">
              <div>{campaign && <DonateModel campaign={campaign} />}</div>
              <div className="flex justify-center  my-14 gap-5 ">
                <Button
                  onClick={() => {
                    setCampaign({
                      ...campaign,
                      isGoal: !campaign.isGoal,
                    });
                  }}
                >
                  Is goal
                  <span className="ml-2 text-red">
                    {campaign && campaign.isGoal && campaign.isGoal.toString()}
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    setCampaign({
                      ...campaign,
                      isImgVideoSlider: !campaign.isImgVideoSlider,
                    });
                  }}
                >
                  Is Slider{" "}
                  <span className="ml-2 text-red">
                    {campaign &&
                      campaign.isImgVideoSlider &&
                      campaign.isImgVideoSlider.toString()}
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    // console.log(flick.current._panels[2]);
                    moveToNextPanel();
                  }}
                >
                  Switch to next
                </Button>
                <Button
                  onClick={() => {
                    console.log(flick.current._panels[2]);
                    flick.current.prev();
                  }}
                >
                  Switch to prev
                </Button>
              </div>
            </div>

            <div>
              <CharityButtons
                campaign={campaign}
                openCharityButtonDonation={openCharityButtonDonation}
              />
            </div>
          </section>
        </div>
      </div>
      {isCharityButtonDonation && (
        <DonateContainerModel
          isOpen={isCharityButtonDonation}
          onClose={closeCharityButtonDonation}
          donation={charityDonation}
          customCompleteDonation={customCompleteDonation}
        />
      )}
    </Layout>
  );
};

export default CampaignDetails;

export async function getServerSideProps({ query }) {
  const id = query.id;
  const { data } = await api.post("/campaigns/getOne", { _id: id });
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}
