import React from 'react'
import RNPickerSelect from 'react-native-picker-select'

import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    padding: 0,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    marginRight: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0,
  },
})

const FormSelect = ({ values, label, ...rest }) => {
  return (
    <View style={styles.inputWrapper}>
      <Text>{label}</Text>
      <RNPickerSelect
        style={styles.inputStyle}
        onValueChange={value => console.log(value)}
        items={values}
        {...rest}
      />
    </View>
  )
}

export default FormSelect
