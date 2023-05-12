import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomepageUIProps } from './homepage.ui';
import { PagesProps } from '../PageParameters';
//import { useGetScreenHome } from '../../apis/rest/endpoints';
import { useLoginState } from '../../globals/loginState/loginState';
import { useEffect } from 'react';

export const useHomepageController = (
  propsScreen: NativeStackScreenProps<PagesProps, 'Home'>,
): HomepageUIProps => {
  const { data: homeData, refetch: refetchHomeData } = useGetScreenHome();
  const { userInfo } = useLoginState();
  useEffect(() => {
    const unsubscribe = propsScreen.navigation.addListener('focus', () => {
      refetchHomeData();
    });
    return unsubscribe;
  });
  return {
    data: [],  // TODO: what datas to return
    goToVoteMe: (idDisplay, labelName, imgProfile, voteType) =>
      propsScreen.navigation.navigate('VoteMe', { idDisplay, labelName, imgProfile, voteType }),
    goToDisplay: () => propsScreen.navigation.navigate('Display'),
    userImgProfile: userInfo?.imageProfilePath ?? '',
  };
};
