import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Progress, Text } from '@chakra-ui/react';
import Layout from 'pages/shared/Layout';
import api from '../../apis/userAPI';
import Image from 'next/image';
import hero from '../../images/temp/banner-temp.svg';
import fakeSlider from '../../images/temp/fake-slider.png';
const CampaignDetails = () => {
  // const [id, setId] = useState(null);
  const [campaign, setCampaign] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const getCamping = async () => {
      const { data } = await api.post('/campaigns/getOne', { _id: id });
      console.log(id);
      console.log(data);
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
          <section className='w-[82%] -mt-[80px] bg-white shadow rounded flex flex-col gap-4 justify-center relative z-50 p-3'>
            <Heading className='text-black'>{campaignName}</Heading>
            <div>
              <Text>{shortDescription}</Text>
            </div>
            <div className='flex gap-3'>
              <div>
                <Image src={fakeSlider} />
              </div>
              <div className='grow flex flex-col gap-3'>
                <h2 className='text-black  font-bold'>
                  Raised Percent: $25,718
                </h2>
                <div>
                  <Progress value={80} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
