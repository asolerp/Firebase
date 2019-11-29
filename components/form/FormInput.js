/* eslint react/prop-types: 0 */

import React from 'react'
// import { Input } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Content, Item, Input, Label, Icon } from 'native-base'

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
  <View style={{ marginBottom: 10 }}>
    <Content>
      <Label>{label}</Label>
      <Item>
        <Input
          {...rest}
          inputContainerStyle={styles.inputStyle}
          placeholderTextColor="grey"
          name={name}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          style={styles.input}
        />
        {/* <Text>cm</Text> */}
        {/* <Icon name="close-circle" />
        <Icon name='checkmark-circle' /> */}
      </Item>
    </Content>
  </View>
  // <View style={styles.inputWrapper}>
  //   <Text style={styles.label}>{label}</Text>
  //   <Input
  //     {...rest}
  //     inputContainerStyle={styles.inputStyle}
  //     leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
  //     leftIconContainerStyle={styles.iconStyle}
  //     placeholderTextColor="grey"
  //     name={name}
  //     placeholder={placeholder}
  //     placeholderStyle={styles.placeholder}
  //     style={styles.input}
  //   />
  // </View>
)

const styles = StyleSheet.create({
  inputStyle: {
    marginRight: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
  },
  input: {
    fontFamily: 'montserrat',
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
