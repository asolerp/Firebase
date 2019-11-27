import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
import { Formik } from 'formik'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'
import { Avatar } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { withFirebaseHOC } from '../config/Firebase'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import FormSelect from '../components/FormSelect'
import ErrorMessage from '../components/ErrorMessage'

const positions = [
  { label: 'Delantero', value: 'dc' },
  { label: 'Medio Centro', value: 'mc' },
  { label: 'Defensa', value: 'df' },
  { label: 'Portero', value: 'pt' },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
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

  const [position, setPosition] = useState('dc')

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const pickImage = async () => {
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

  const validationSchema = Yup.object().shape({
    position: Yup.string()
      .label('Posicion')
      .oneOf(['dc', 'mc'])
      .required('Introduce una posición'),
    age: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    height: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    weight: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    // foot: Yup.number()
    //   .label('Pie')
    //   .oneOf(['Diestro', 'Zurdo', 'Ambidiestro'])
    //   .required('Introduce tu pierna buena'),
  })

  return (
    <SafeAreaView style={styles.container}>
      <HideWithKeyboard>
        <Avatar
          rounded
          size="xlarge"
          showEditButton
          onEditPress={() => pickImage()}
          source={{
            uri: imgProfile,
          }}
        />
      </HideWithKeyboard>
      <View style={styles.formWrapper}>
        <Formik
          initialValues={{ age: '', height: '', weight: '' }}
          onSubmit={(values, actions) => {
            console.log(values, actions)
            // handleOnLogin(values, actions)
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <>
              <FormInput
                name="age"
                value={values.age}
                onChangeText={handleChange('age')}
                placeholder="Edad"
                autoCapitalize="none"
                iconName="ios-person"
                iconColor="#2C384A"
                onBlur={handleBlur('age')}
              />
              <ErrorMessage errorValue={touched.age && errors.age} />
              <FormInput
                name="height"
                value={values.password}
                onChangeText={handleChange('height')}
                placeholder="Altura"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('height')}
              />
              <ErrorMessage errorValue={touched.height && errors.height} />
              <FormInput
                name="weight"
                value={values.password}
                onChangeText={handleChange('weight')}
                placeholder="Peso"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('weight')}
              />
              <ErrorMessage errorValue={touched.weight && errors.weight} />
              <FormSelect
                selectedValue={position}
                mode="dropdown"
                prompt="Seleccionar posición"
                values={positions}
                onValueChange={itemValue => {
                  setFieldValue('position', itemValue)
                  setPosition(itemValue)
                }}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="#039BE5"
                  disabled={!isValid}
                  // loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

export default withFirebaseHOC(ProfileForm)
