import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import Input from '@components/Input/Input';
import CampinFeatureContaienr from '@components/CampinFeatureContaienr';
import api from '../../../apis/userAPI';
import Confirmation from '@components/Confirmation/Confirmation';
import Link from 'next/link';
const initialCampaign = {
  isDescription: false,
  isGoal: false,
  isEndDate: false,
  isDonorList: false,
  isPresrDontaion: false,
  isCertificate: false,
  isMainBanner: false,
  isImgVideoSlider: false,
  campaignName: '',
  goal: 0,
  bonusGoal: 0,
  shortDescription: '',
  campaignContent: '',
  endDate: '',
};

const CreateCampaign = ({ campingData = null }) => {
  const { user } = useSelector((state) => state.userReducer);
  const router = useRouter();
  const [campaign, setCampaign] = useState(campingData || initialCampaign);
  const [endDate, setEndDate] = useState(new Date());
  const [campName, setCampName] = useState(EditorState.createEmpty());
  const [shortDesc, setShortDesc] = useState(EditorState.createEmpty());
  const [didCompleteCampaign, setCompletedCampaign] = useState(false);
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCampaign({ ...campaign, [name]: value });
  };

  const toggleFeatures = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    setCampaign({ ...campaign, [name]: checked });
  };
  useEffect(() => {
    if (campingData) {
      console.log('campingData');
      console.log('short desc', campingData.shortDescription);
      setShortDesc(campingData.shortDescription);
    }
  }, [campingData]);
  useEffect(() => {
    campaign = { ...campaign, endDate };
  }, [endDate]);

  useEffect(() => {
    console.log('here now');
    // const short = htmlToDraft('<p>Hello world</p>');
    // const long = htmlToDraft(htmlToDraft);
    // console.log('short', short);

    setShortDesc(campaign.shortDescription);
    // setCampaign(htmlToDraft(campingData));
  }, []);
  useEffect(() => {}, [didCompleteCampaign]);
  const createNewCampaign = async () => {
    campaign.shortDescription = shortDesc;
    campaign.campaignContent = campName;
    campaign.owner = user._id;
    campaign.endDate = endDate;
    campaign._id ? updateCampaign() : createCampaign();
  };

  const createCampaign = async () => {
    try {
      const { data } = await api.post('/campaigns/', campaign);
      setCompletedCampaign(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCampaign = async () => {
    try {
      const { data } = await api.put('/campaigns/update', campaign);
      setCompletedCampaign(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-default-background p-2qq md:p-4 rounded'>
      <div>
        <CampinFeatureContaienr
          campaign={campaign}
          toggleFeatures={toggleFeatures}
        />
        <div className='mt-5'>
          <div>
            <Tabs>
              <TabList>
                <Tab>Campaign Details</Tab>
                <Tab className='font-bold'>Screen Details</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <div className='flex flex-col md:flex-row  md:2 md:gap-8 '>
                    <div className='basis-1/2 flex flex-col  gap-2'>
                      <h3 className='text-black text-xl font-bold'>
                        Campaign Name
                      </h3>
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
                          <h3 className='text-black text-xl font-bold'>
                            Campaign end date
                          </h3>
                          <div>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        </div>
                      )}
                      <h3 className='mt-4 text-black text-xl font-bold'>
                        Enter a Goal
                      </h3>
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
                      <h3 className='mt-4 text-black text-xl font-bold'>
                        Bonus goal
                      </h3>
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
                          <h3 className='mt-4 mb-2 text-black text-xl font-bold'>
                            Short description
                          </h3>

                          <div className='bg-white min-h-[100px]'>
                            <Editor
                              toolbarHidden
                              editorState={shortDesc}
                              onEditorStateChange={(e) => {
                                // const test = draftToHtml(
                                //   convertToRaw(shortDesc.getCurrentContent())
                                // );
                                console.log(
                                  'tere',
                                  e.getCurrentContent().getPlainText()
                                );
                                setShortDesc(e);
                              }}
                              toolbarClassName='toolbarClassName'
                              wrapperClassName='wrapperClassName'
                              editorClassName='editorClassName'
                            />
                          </div>
                        </div>
                      )}
                      <h3 className='mt-4 mb-2  text-black text-xl font-bold'>
                        About the campaign
                      </h3>
                      <div className='bg-white min-h-[300px]'>
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
        <div className='button bg-red' onClick={createNewCampaign}>
          {campaign._id ? 'Update campaign' : 'Create Campaign'}
        </div>
        {didCompleteCampaign && (
          <Confirmation
            visible={didCompleteCampaign}
            title='Campaign successfully created.'
          >
            <div className='mt-2 font-bold'>
              Your campaign is being review and will bla bla
              <p>
                Please press{' '}
                <Link href='/crm/campaigns/'> Here to return to the list </Link>
              </p>
            </div>
          </Confirmation>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
