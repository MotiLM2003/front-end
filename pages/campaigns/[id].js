import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Heading, Progress, Text } from "@chakra-ui/react";
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
const CampaignDetails = ({ data }) => {
  // const [id, setId] = useState(null);
  const [campaign, setCampaign] = useState({});
  const router = useRouter();

  useEffect(() => {
    setCampaign(data);
  }, []);
  const { campaignName, shortDescription, isDescription } = campaign;
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
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <Image src={fakeSlider} />
              </div>
              <div
                className="grow flex flex-col gap-5
              "
              >
                <h2 className="text-black  font-bo ld ">
                  Raised Percent: $25,718
                </h2>
                <div>
                  <Progress value={80} />
                </div>
                <div>
                  <div className="flex justify-center items-center gap-6">
                    <div className="basis-[30%]">
                      <div className="flex flex-col justify-center items-center">
                        <Image src={graph} width={36} height={33} />
                        <Text className="font-bold">Found Raised:</Text>
                        <Heading as="div" size="md">
                          25.75%
                        </Heading>
                      </div>
                    </div>
                    <div className="basis-[40%] border-l-2 border-r-2 border-stone-400">
                      <div className="flex flex-col justify-center items-center">
                        <Image src={goal} width={36} height={33} />
                        <Text className="font-bold">Funding Goal:</Text>
                        <Heading as="div" size="md">
                          $100,000
                        </Heading>
                      </div>
                    </div>
                    <div className="basis-[30%]">
                      <div className="flex flex-col justify-center items-center">
                        <Image src={donors} width={32} height={28} />
                        <Text className="font-bold">Donors</Text>
                        <Heading as="div" size="md">
                          165
                        </Heading>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center  my-14 ">
              {campaign && <DonateModel campaign={campaign} />}
            </div>
            <div>
              <div>
                <CharityButtons campaign={campaign} />
              </div>
            </div>
          </section>
        </div>
      </div>
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
