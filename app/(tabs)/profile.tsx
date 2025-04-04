import { Image, Text, View } from 'react-native';
import { icons } from '@/constants/icons';

const Profile = () => {
  return (
    <View className='flex-1 px-10 bg-primary'>
      <View className='flex flex-col flex-1 gap-5 justify-center items-center'>
        <Image source={icons.person} className='size-10' tintColor="#fff"/>
        <Text className='text-base text-gray-600'>Profile</Text>
        <Text className='text-white text-3xl font-bold'>Under Construction</Text>
      </View>
    </View>
  )
}

export default Profile
