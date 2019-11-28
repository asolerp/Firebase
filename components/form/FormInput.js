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
  label,
  ...rest
}) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <Input
      {...rest}
      inputContainerStyle={styles.inputStyle}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      placeholderStyle={styles.placeholder}
      style={styles.input}
    />
  </View>
)

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa',
  },
  inputStyle: {
    marginRight: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
  },
  input: {
    fontSize: 10,
    justifyContent: 'flex-end',
  },
  iconStyle: {
    marginRight: 15,
    marginLeft: 0,
  },
  rightSymbol: {
    backgroundColor: 'black',
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginLeft: 10,
    fontSize: 15,
    width: '30%',
  },
  placeholder: {
    fontSize: 10,
    color: '#aaaaaa',
  },
})

export default FormInput
