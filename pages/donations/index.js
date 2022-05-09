import React, { useEffect } from 'react';
import CRMLayout from '../../pages/shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../store/menuSlice';

const id = 1;
const donations = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    console.log('id: ', CRMMenuId);
    dispatch(setCRMId(id));
  }, []);
  return <CRMLayout>donations</CRMLayout>;
};

export default donations;
