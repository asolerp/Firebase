/* eslint react/prop-types: 0 */

import React from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
// import { Content, Item, Input, Label, Icon } from 'native-base'

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
      inputStyle={styles.input}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#aaaaaa",
    padding: 5
  },
  inputStyle: {
    borderBottomWidth: 0,
    height: 25
  },
  input: {
    fontSize: 15,
    margin: 0,
    height: 10,
    padding: 0,
    fontFamily: "montserrat-regular"
  },
  label: {
    fontWeight: "400",
    color: "#B6B6B6",
    marginLeft: 10,
    marginBottom: 0,
    fontSize: 15,
    fontFamily: "montserrat-regular"
  }
});

export default FormInput;
