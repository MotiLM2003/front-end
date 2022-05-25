import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Progress, Text } from '@chakra-ui/react';
import Layout from 'pages/shared/Layout';
import api from '../../apis/userAPI';
import Image from 'next/image';
import hero from '../../images/temp/banner-temp.svg';
import fakeSlider from '../../images/temp/fake-slider.png';
import graph from '../../images/icons/graph.svg';
import goal from '../../images/icons/goal.svg';
import donors from '../../images/icons/donors.svg';
import donate from '../../images/icons/white/donate.svg';
import CharityButtons from '@components/Outer/Camaigns/CharityButtons/CharityButtons';
const CampaignDetails = () => {
  // const [id, setId] = useState(null);
  const [campaign, setCampaign] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    console.log('first');
    const getCamping = async () => {
      const { data } = await api.post('/campaigns/getOne', { _id: id });

      setCampaign(data);
    };
    getCamping();
  }, []);
  const { campaignName, shortDescription, isDescription } = campaign;
  return (
    <Layout>
      <div className='default-container'>
        <Image src={hero} />
        <div className='flex justify-center'>
          <section className='w-[88%] -mt-[80px] bg-white shadow rounded flex flex-col gap-4 justify-center relative z-50 p-3'>
            <Heading className='text-black'>{campaignName}</Heading>
            <div>
              <Text>{shortDescription}</Text>
            </div>
            <div className='flex gap-4'>
              <div>
                <Image src={fakeSlider} />
              </div>
              <div
                className='grow flex flex-col gap-5
              '
              >
                <h2 className='text-black  font-bold'>
                  Raised Percent: $25,718
                </h2>
                <div>
                  <Progress value={80} />
                </div>
                <div>
                  <div className='flex justify-center items-center gap-6'>
                    <div className='basis-[33%]'>
                      <div className='flex flex-col justify-center items-center'>
                        <Image src={graph} width={36} height={33} />
                        <Text className='font-bold'>Found Raised:</Text>
                        <Heading as='div' size='md'>
                          25.75%
                        </Heading>
                      </div>
                    </div>
                    <div className='basis-[33%]'>
                      <div className='flex flex-col justify-center items-center'>
                        <Image src={goal} width={36} height={33} />
                        <Text className='font-bold'>Funding Goal:</Text>
                        <Heading as='div' size='md'>
                          $100,000
                        </Heading>
                      </div>
                    </div>
                    <div className='basis-[33%]'>
                      <div className='flex flex-col justify-center items-center'>
                        <Image src={donors} width={36} height={33} />
                        <Text className='font-bold'>Donors</Text>
                        <Heading as='div' size='md'>
                          165
                        </Heading>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center  my-14'>
              <div className='flex gap-3 bg-primary opacity-70 hover:shadow-1 hover:opacity-100 hover:scale-[1.05] cursor-pointer transition duration-200 min-w-[220px] rounded justify-center items-center'>
                <div>
                  <Image src={donate} width={42} height={41} />
                </div>
                <Text className='font-bold text-white'>DONATE</Text>
              </div>
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
