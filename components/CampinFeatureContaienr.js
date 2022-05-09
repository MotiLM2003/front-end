import React from 'react';
import CampaignFeature from './Camaigns/CreateCamaigns/CampaignFeature';

const CampinFeatureContaienr = ({ campaign, setCampaign }) => {
  return (
    <div className='flex gap-4  flex-wrap md:min-w-[900px]'>
      <CampaignFeature
        text='Description'
        field={campaign.isDescription}
        onChange={() => {
          setCampaign({
            ...campaign,
            isDescription: !campaign.isDescription,
          });
        }}
      />

      <CampaignFeature
        text='End Date'
        onChange={() => {
          setCampaign({ ...campaign, isEndDate: !campaign.isEndDate });
        }}
      />
      <CampaignFeature
        text='Donor List'
        onChange={() => {
          setCampaign({ ...campaign, isDonorList: !campaign.isDonorList });
        }}
      />
      <CampaignFeature
        text='Presrt Donation'
        onChange={() => {
          setCampaign({
            ...campaign,
            isPresrDontaion: !campaign.isPresrDontaion,
          });
        }}
      />
      <CampaignFeature
        text='Main Banner'
        onChange={() => {
          setCampaign({
            ...campaign,
            isMainBanner: !campaign.isMainBanner,
          });
        }}
      />
      <CampaignFeature
        text='Img Video Slider'
        onChange={() => {
          setCampaign({
            ...campaign,
            isImgVideoSlider: !campaign.isImgVideoSlider,
          });
        }}
      />
    </div>
  );
};

export default CampinFeatureContaienr;
