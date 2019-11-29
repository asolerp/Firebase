import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.48,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 10,
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  iconSyle: {
    justifyContent: 'center',
  },
})

const FormSelect = ({ values, label, iconName, iconSize, iconColor, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <RNPickerSelect
          style={{
            ...styles.inputStyle,
            iconContainer: {
              top: 20,
              right: 10,
            },
            placeholder: {
              color: 'black',
              fontSize: 15,
              fontFamily: 'montserrat-regular',
            },
          }}
          items={values}
          {...rest}
        />
      </View>
      <View style={styles.iconSyle}>
        <Ionicons name={iconName} size={Number(iconSize)} color={iconColor} />
      </View>
    </View>
  )
}

export default FormSelect
