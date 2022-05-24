import React from 'react';
import { useRouter } from 'next/router';

const CampaignDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>CampaignDetails - {id}</div>;
};

export default CampaignDetails;
