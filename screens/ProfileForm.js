import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, View, Text, Image } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import FormSelect from '../components/FormSelect'

const positions = [
  { label: 'Delantero', value: 'DC' },
  { label: 'Medio Centro', value: 'MC' },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      Alert('Sorry, we need camera roll permissions to make this work!')
    }
  }
}

function ProfileForm() {
  const [imgProfile, setImgProfile] = useState(
    'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  )
  const [value, setValue] = useState('')

  const pickImage = async () => {
    console.log('hola')
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImgProfile(result.uri)
    }
  }

  useEffect(() => {
    getPermissionAsync()
    console.log('hola')
  }, [])

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        showEditButton
        onEditPress={() => pickImage()}
        source={{
          uri: imgProfile,
        }}
      />
      <FormSelect
        values={positions}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
      />
    </View>
  )
}

export default ProfileForm
