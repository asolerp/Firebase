import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native'
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
    marginTop: 15,
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
    name: Yup.string()
      .label('Nombre')
      .required('El nombre es obligatoria'),
    age: Yup.string()
      .label('Edad')
      .required('La edad es obligatoria'),
    height: Yup.string()
      .label('Edad')
      .required('La edad es obligatoria'),
    weight: Yup.string()
      .label('Edad')
      .required('La edad es obligatoria'),
    position: Yup.string().required('Position requerida'),
    foot: Yup.string().required('Pie requerido'),
  })

  return (
    <ScrollView>
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
            initialValues={{ ...user }}
            onSubmit={(values, actions) => {
              const { age, name, height, weight, position, foot } = values
              const { uid } = props.firebase.currentUser()
              props.firebase
                .uriToBlob(imgProfile)
                .then(blob => props.firebase.uploadToFirebase(blob, uid, 'profile'))
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(downloadURL => {
                  const userData = {
                    uid,
                    name,
                    age,
                    height,
                    weight,
                    position,
                    foot,
                    imgProfile: downloadURL,
                  }
                  dispatch({
                    type: 'updateProfile',
                    userProfile: userData,
                  })
                  return props.firebase.updateUserProfile(userData)
                })
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
                  name="name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Nombre"
                  autoCapitalize="none"
                  iconName="ios-person"
                  iconColor="#2C384A"
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
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
                  value={values.height}
                  onChangeText={handleChange('height')}
                  placeholder="Altura"
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur('height')}
                />
                <ErrorMessage errorValue={touched.height && errors.height} />
                <FormInput
                  name="weight"
                  value={values.weight}
                  onChangeText={handleChange('weight')}
                  placeholder="Peso"
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur('weight')}
                />
                <ErrorMessage errorValue={touched.weight && errors.weight} />
                <FormSelect
                  selectedValue={values.position}
                  mode="dropdown"
                  prompt="Seleccionar posición"
                  values={positions}
                  onValueChange={itemValue => setFieldValue('position', itemValue)}
                />
                <FormSelect
                  selectedValue={values.foot}
                  mode="dropdown"
                  prompt="Pierna principal"
                  values={foot}
                  onValueChange={itemValue => setFieldValue('foot', itemValue)}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    onPress={handleSubmit}
                    title="Editar"
                    buttonColor="#039BE5"
                    disabled={!isValid}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default withFirebaseHOC(ProfileForm)
