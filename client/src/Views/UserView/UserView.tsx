import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, getUserReviews } from '../../APIs/usersAPI';

const UserView: React.FC = () => {
  const { userId = '' }: any = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfoResp = await getUserById(userId);
        console.log('userInfoResp', userInfoResp);
      } catch (err) {
        console.log('err', err);
      }
    };
    getUserInfo();
    return undefined;
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfoResp = await getUserReviews(userId);
        console.log('user reviews resp', userInfoResp);
      } catch (err) {
        console.log('err', err);
      }
    };
    getUserInfo();
    return undefined;
  }, []);

  return <div>user page</div>;
};

export default UserView;
