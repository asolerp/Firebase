/* eslint react/prop-types: 0 */

import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
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
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters '),
})

function Login(props) {
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState('ios-eye')

  const goToSignup = () => props.navigation.navigate('Signup')

  const handlePasswordVisibility = () => {
    setRightIcon(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    }))
    setPasswordVisibility(prevState => ({
      passwordVisibility: !prevState.passwordVisibility,
    }))
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
    <SafeAreaView style={styles.container}>
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
              placeholder="Enter email"
              autoCapitalize="none"
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Enter password"
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
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </SafeAreaView>
  )
}

export default withFirebaseHOC(Login)
