import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native'
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
// import FormSelect from '../components/FormSelect'
import ErrorMessage from '../components/ErrorMessage'
import { useStateValue } from '../config/User/UserContextManagement'

const positions = [
  { label: 'Delantero', value: 'dc' },
  { label: 'Medio Centro', value: 'mc' },
  { label: 'Defensa', value: 'df' },
  { label: 'Portero', value: 'pt' },
]

const foot = [
  { label: 'Diestro', value: 'd' },
  { label: 'Zurdo', value: 'z' },
  { label: 'Ambidiestro', value: 'ad' },
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
  avatar: {
    marginBottom: 10,
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

function ProfileForm(props) {
  const [blob, setBlob] = useState()
  const [position, setPosition] = useState('dc')
  const [mainFoot, setMainFoot] = useState('d')
  const [{ user }, dispatch] = useStateValue()

  const [imgProfile, setImgProfile] = useState(user.imgProfile)

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
    age: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    height: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    weight: Yup.number()
      .label('Edad')
      .required('La edad es obligatoria'),
    // position: Yup.string()
    //   .label('Posicion')
    //   .oneOf(['dc', 'mc'])
    //   .required('Introduce una posición'),
    // foot: Yup.number()
    //   .label('Pie')
    //   .oneOf(['d', 'z', 'ad'])
    //   .required('Introduce tu pierna buena'),
  })

  return (
    <SafeAreaView style={styles.container}>
      <HideWithKeyboard>
        <Avatar
          rounded
          size="xlarge"
          containerStyle={styles.avatar}
          showEditButton
          onEditPress={() => pickImage()}
          source={{
            uri: imgProfile,
          }}
        />
        <Text>{user.email}</Text>
      </HideWithKeyboard>
      <View style={styles.formWrapper}>
        <Formik
          initialValues={{ age: '', height: '', weight: '' }}
          onSubmit={(values, actions) => {
            console.log(values, actions)
            const { uid } = props.firebase.currentUser()
            props.firebase
              .uriToBlob(imgProfile)
              .then(blob => props.firebase.uploadToFirebase(blob, uid))
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(downloadURL =>
                props.firebase.updateUserProfile({ ...userData, uid, imgProfile: downloadURL })
              )

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
              {/* <FormSelect
                selectedValue={position}
                mode="dropdown"
                prompt="Seleccionar posición"
                values={positions}
                onValueChange={itemValue => {
                  setFieldValue('position', itemValue)
                  setPosition(itemValue)
                }}
              />
              <FormSelect
                selectedValue={mainFoot}
                mode="dropdown"
                prompt="Pierna principal"
                values={foot}
                onValueChange={itemValue => {
                  setFieldValue('foot', itemValue)
                  setMainFoot(itemValue)
                }}
              /> */}
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
