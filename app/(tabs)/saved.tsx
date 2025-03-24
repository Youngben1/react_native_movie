import { Image, Text, View } from 'react-native';
import { icons } from '@/constants/icons';

const Saved = () => {
  return (
    <View className='flex-1 px-10 bg-primary'>
          <View className='flex flex-col flex-1 gap-5 justify-center items-center'>
            <Image source={icons.save} className='size-10' tintColor="#fff"/>
            <Text className='text-base text-gray-600'>Save</Text>
            <Text className='text-white text-3xl font-bold'>Coming Soon</Text>  
          </View>
          
    </View>
  )
}

export default Saved