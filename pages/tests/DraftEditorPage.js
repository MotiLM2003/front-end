import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import api from '../../apis/userAPI';
const DraftEditor = dynamic(
  () => import('@components/Tests/react-draft-wysiwyg/DraftEditor'),
  {
    ssr: false,
  }
);

const DraftEditorPage = () => {
  useEffect(() => {
    // console.log(Savedcontent);
  }, []);
  const [content, setContent] = useState(null);
  useEffect(() => {
    console.log('here');
    const getCamping = async () => {
      const { data } = await api.post('/campaigns/getOne', {
        _id: '627e355dd490ff04709bdef2',
      });
      console.log(data);
      setContent(data);
    };
    getCamping();
  }, []);
  return (
    <div>
      <DraftEditor content={content} />
    </div>
  );
};

export default DraftEditorPage;
