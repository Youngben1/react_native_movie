import { icons } from '@/constants/icons'
import { View, Image, TextInput } from 'react-native'

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string,
    onChangeText: (text: string) => void
}

const SearchBar = ({ onPress, placeholder, value, onChangeText}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className="size-5" resizeMode='contain' tintColor="#ab8bff" />
      <TextInput onPress={onPress} value={value} placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor="#a8b5db" className='flex-1 ml-2 text-white' />
    </View>
  )
}

export default SearchBar