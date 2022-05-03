import React from 'react';
import Layout from 'pages/shared/Layout';
import Image from 'next/image';

import rabi1 from '../../images/rabbi-1.svg';
import rabi2 from '../../images/rabbi-2.png';

const OurCampaings = () => {
  return (
    <Layout>
      <div className='min-h-[80vh] default-container flex flex-col items-center'>
        <h1 className='mb-10'>Our Champions</h1>

        <div className='flex'>
          <div className='max-w-[650px]'>
            <h2>הר"ר שרגא קוטלר</h2>
            <p className='text-black font-bold'>A Champion of our cause:</p>
            <p className='font-bold mb-2'>
              Harav Shraga Kotler - Director of Bais Medrash Govoha
            </p>
            <p>
              Harav Shraga Kotler is the son of the revered Rosh Yeshiva of Bais
              Medrash Govoha HaGaon Harav Shneor Kotler z"l and grandson of the
              founder and first Rosh Yeshiva Maran HaGaon Harav Aharon Kotler
              z"l.
            </p>
            <p className='mt-6'>
              Harav Shraga continues the glorious family tradition of giving and
              helping others. As someone who grew up in the home of his elder
              father and grandfather whose home served as an address for all
              public affairs in the United States and abroad, and as someone who
              was educated on the needs of the morals of the soul for the
              oppressed and the weak holocaust survivors, alongside the Gedolim
              of the world who founded and laid the cornerstone for the American
              yeshiva world, makes him a great and besieged Shaliach for the
              continuation of the many holy enterprises.
            </p>
            <p className='mt-6'>
              <span className='text-primary'>
                In addition to being the director of the world's largest Torah
                power, Harav Shraga serves as an address for many charities and
                charitable activities throughout the American continent in
                general, and in the city of Lakewood in particular.
              </span>{' '}
              Many of the various charitable activities (both more visible and
              those hidden from the public eye) are driven and operated by him,
              and he is in fact the protagonist of worldwide charities.
            </p>
            <p className='mt-6'>
              Rabbi Kotler serves as a member of the board of our organization
              and decides on the various issues that require a decision. Many
              hours are spent, on his part, for the sake of those who need it
              and he does it with an indescribable devotion.
            </p>
          </div>
          <div className='shrink'>
            <Image src={rabi1} />
          </div>
        </div>
        {/*  */}

        <div className='flex flex-row-reverse mt-[5rem]'>
          <div className='max-w-[650px]'>
            <h2>הר"ר נתן נוסבוים</h2>
            <p className='text-black font-bold'>A Champion of our cause:</p>
            <p className='font-bold mb-2'>
              Harav Nosson Shalom Nussbaum - Director of the Vaad HaTzedaka of
              Lakewood
            </p>
            <p>
              Harav Nosson Shalom Nussbaum's name is carried with appreciation
              and admiration in the mouths of thousands of Roshei Yeshivos,
              Menahelim of Mosdos, mishulachim and regular Yidden who visit the
              offices of the vaad frequented daily in the heart of the great
              City of Torah in the United States.
            </p>
            <p className='mt-6'></p>
          </div>
          <div className='shrink'>
            <Image src={rabi2} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OurCampaings;
