import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native'
import { Formik } from 'formik'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'
import * as Permissions from 'expo-permissions'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import { withFirebaseHOC } from '../config/Firebase'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import FormSelect from '../components/form/FormSelect'
import ErrorMessage from '../components/form/ErrorMessage'
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    flex: 2,
    width: '100%',
  },
  formWrapper: {
    flex: 3,
    width: '100%',
  },
  inputsWrapper: {
    marginLeft: 15,
    marginRight: 15,
  },
  avatar: {
    marginTop: 15,
    marginBottom: 10,
  },
  numericInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {user && (
          <BlurBackgroundWithAvatar
            backgroundUrl={imgProfile}
            avatarUrl={imgProfile}
            showEditButton
            onEditPress={() => pickImage()}
            size="xlarge"
          />
        )}
      </View>
      <View style={styles.formWrapper}>
        <ScrollView style={{ marginTop: 10 }}>
          <View style={styles.inputsWrapper}>
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
                handleBlur,
                isSubmitting,
              }) => (
                <>
                  <FormInput
                    name="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label="Nombre"
                    placeholder="Nombre de jugador"
                    autoCapitalize="none"
                    onBlur={handleBlur('name')}
                  />
                  <FormInput
                    name="age"
                    value={values.age}
                    onChangeText={handleChange('age')}
                    label="Edad"
                    placeholder="Edad"
                    autoCapitalize="none"
                    onBlur={handleBlur('age')}
                  />
                  <FormInput
                    name="height"
                    value={values.height}
                    onChangeText={handleChange('height')}
                    label="Altura (cm)"
                    placeholder="Altura"
                    onBlur={handleBlur('height')}
                  />
                  <FormInput
                    name="weight"
                    value={values.weight}
                    onChangeText={handleChange('weight')}
                    label="Peso"
                    placeholder="Peso (kg)"
                    onBlur={handleBlur('weight')}
                  />
                  <View style={styles.numericInputs}>
                    <FormSelect
                      selectedValue={values.position}
                      label="Posición"
                      values={positions}
                      placeholder={{
                        label: 'Posición',
                        value: null,
                        color: '#9EA0A4',
                      }}
                      mode="dialog"
                      onValueChange={itemValue => setFieldValue('position', itemValue)}
                    />
                    <FormSelect
                      selectedValue={values.foot}
                      placeholder={{
                        label: 'Pierna principal',
                        value: null,
                        color: '#9EA0A4',
                      }}
                      label="Pierna"
                      values={foot}
                      onValueChange={itemValue => setFieldValue('foot', itemValue)}
                    />
                  </View>
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
        </ScrollView>
      </View>
    </View>
  )
}

export default withFirebaseHOC(ProfileForm)
