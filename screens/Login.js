/* eslint react/prop-types: 0 */

import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import ErrorMessage from '../components/form/ErrorMessage'
import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { useStateValue } from '../config/User/UserContextManagement'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
  },
  inputsWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
  },
})

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Introduce un email válido')
    .required('Introduce una cuenta de email'),
  password: Yup.string()
    .label('Password')
    .required('El password es obligatorio')
    .min(6, 'El password debe tener como mínimo 6 carácteres '),
})

function Login(props) {
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState('ios-eye')

  const goToSignup = () => props.navigation.navigate('Signup')

  const handlePasswordVisibility = () => {
    setRightIcon(prevState => (prevState === 'ios-eye' ? 'ios-eye-off' : 'ios-eye'))
    setPasswordVisibility(prevState => !prevState)
  }

  const handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      const response = await props.firebase.loginWithEmail(email, password)
      if (response.user) {
        props.navigation.navigate('App')
      }
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <View style={styles.container}>
      <HideWithKeyboard style={styles.logoContainer}>
        <AppLogo />
      </HideWithKeyboard>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          handleOnLogin(values, actions)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <>
            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Usuario"
              autoCapitalize="none"
              iconName="ios-person"
              iconColor="#2C384A"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureTextEntry={passwordVisibility}
              iconName="ios-lock"
              iconColor="#2C384A"
              onBlur={handleBlur('password')}
              rightIcon={
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="LOGIN"
                buttonColor="#039BE5"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </>
        )}
      </Formik>
      <Button
        title="Aun no tienes una cuenta? Registrate!"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </View>
  )
}

export default withFirebaseHOC(Login)
