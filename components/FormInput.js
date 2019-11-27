/* eslint react/prop-types: 0 */

import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputWrapper}>
    <Input
      {...rest}
      inputContainerStyle={styles.inputStyle}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
)

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 0,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    borderBottomWidth: 0,
    marginRight: 0,
    padding: 0,
    margin: 0,
  },
  iconStyle: {
    marginRight: 15,
    marginLeft: 0,
  },
  rightSymbol: {
    backgroundColor: 'black',
  },
})

export default FormInput
