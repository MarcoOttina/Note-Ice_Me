import { Box, Flex, Pressable, ScrollView, Text, View } from 'native-base';
import React, { FC } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import tw from 'twrnc';

// import { ProfileImageName } from '../../components/profileImageName';

export type HomepageUIProps = {
  data: VoteList;
  goToVoteMe: (idDisplay: number, labelName: string, imgProfile: string, voteType: number) => void;
  goToDisplay: () => void;
  userImgProfile: string;
};

export const HomepageUI: FC<HomepageUIProps> = ({
  data,
  goToVoteMe,
  goToDisplay,
  userImgProfile,
}) => (
  <ScrollView bgColor="secondary">
    <View marginX={5}>
      <ProfileImageName image={userImgProfile} />
      <CardIcon
        key="test"
        rightElement={<Text color="white">{data.displaycount}</Text>}
        icon={
          <IconIonicons
            name="shield-checkmark-outline"
            size={23}
            style={tw.style('text-5xl text-primary-bg')}
          />
        }
        title="I miei display"
        direction="row"
        style={tw`mb-5`}
        onPress={() => goToDisplay()}
      />
      <CardIcon
        key="test1"
        rightElement={<Text color="white">{data.stars}</Text>}
        icon={<IconFeather name="star" size={23} style={tw.style('text-5xl text-primary-bg')} />}
        title="I punti stella"
        direction="row"
        style={tw`mb-10`}
      />
      {data.voteList?.length === 0 ? (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          py={3}
          width="100%"
          alignContent="center"
        >
          <Text fontWeight="bold" color="primary" textTransform="uppercase">
            Non ci sono votazioni in corso
          </Text>
        </Box>
      ) : (
        data?.voteList?.map(vote => (
          <Pressable
            key={vote.idObj}
            marginBottom={10}
            onPress={() => goToVoteMe(vote.idObj!, vote.labelName!, vote.img!, vote.voteType!)}
          >
            <DisplayPreview title={vote.labelName!} image={vote.img ?? ''} />
          </Pressable>
        ))
      )}
    </View>
  </ScrollView>
);
