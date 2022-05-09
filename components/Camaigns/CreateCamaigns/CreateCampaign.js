import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CampaignFeature from './CampaignFeature';
import Input from '@components/Input/Input';
import CampinFeatureContaienr from '@components/CampinFeatureContaienr';

const initialCampaign = {
  isDescription: true,
  isGoal: true,
  isEndDate: false,
  isDonorList: true,
  isPresrDontaion: false,
  isMainBanner: true,
  isImgVideoSlider: true,
  campaignName: '',
  goal: 0,
  bonusGoal: 0,
  shortDescription: '',
  campaignContent: '',
  endDate: '',
};

const CreateCampaign = () => {
  const [campaign, setCampaign] = useState(initialCampaign);
  const [endDate, setEndDate] = useState(new Date());
  const [campName, setCampName] = useState();
  const [shortDesc, setShortDesc] = useState();
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCampaign({ ...campaign, [name]: value });
  };

  useEffect(() => {
    console.log(endDate);
    campaign = { ...campaign, endDate };
  }, [endDate]);

  const createNewCampaign = () => {
    campaign.shortDescription = shortDesc;
    campaign.campaignContent = campName;
    console.log(campaign);
  };
  return (
    <div>
      <div>
        <CampinFeatureContaienr campaign={campaign} setCampaign={setCampaign} />
        <div className='mt-5'>
          <div>
            <Tabs>
              <TabList>
                <Tab>Campaign Details</Tab>
                <Tab className='font-bold'>Screen Details</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <div className='flex gap-2'>
                    <div className='basis-1/2 flex flex-col  gap-2'>
                      <h1 className='text-black text-xl font-bold'>
                        Campaign Name
                      </h1>
                      <div>
                        <Input
                          placeholder='Campaign'
                          className='w-[100%]'
                          name='campaignName'
                          onChange={onChange}
                          value={campaign.campaignName}
                        />
                      </div>
                      {campaign.isEndDate && (
                        <div>
                          <h1 className='text-black text-xl font-bold'>
                            Campaign end date
                          </h1>
                          <div>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        </div>
                      )}
                      <h1 className='mt-4 text-black text-xl font-bold'>
                        Enter a Goal
                      </h1>
                      <div>
                        <Input
                          type='number'
                          placeholder='000000'
                          className='w-[100%] '
                          name='goal'
                          onChange={onChange}
                          value={campaign.goal}
                        />
                      </div>
                      <h1 className='mt-4 text-black text-xl font-bold'>
                        Bonus goal
                      </h1>
                      <div>
                        <Input
                          type='number'
                          placeholder='00000'
                          className='w-[100%] '
                          name='bonusGoal'
                          onChange={onChange}
                          value={campaign.bonusGoal}
                        />
                      </div>
                    </div>
                    <div>
                      {campaign.isDescription && (
                        <div>
                          <h1 className='mt-4 text-black text-xl font-bold'>
                            Short description
                          </h1>

                          <div className='bg-white min-h-[100px]'>
                            <Editor
                              editorState={shortDesc}
                              toolbarClassName='toolbarClassName'
                              wrapperClassName='wrapperClassName'
                              editorClassName='editorClassName'
                              placeholder='Short description'
                              onEditorStateChange={(e) => {
                                setShortDesc(e);
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className='bg-white min-h-[300px]'>
                        <h1 className='mt-4 text-black text-xl font-bold'>
                          About the campaign
                        </h1>
                        <Editor
                          editorState={campName}
                          toolbarClassName='toolbarClassName'
                          wrapperClassName='wrapperClassName'
                          editorClassName='editorClassName'
                          placeholder='About the campaign'
                          onEditorStateChange={(e) => {
                            setCampName(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
      <div className='flex justify-end pr-5'>
        <div
          className='bg-primary px-5 py-2 rounded text-white  cursor-pointer hover:scale-[1.05]  transition 500 hover:shadow'
          onClick={createNewCampaign}
        >
          Sumbit
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
