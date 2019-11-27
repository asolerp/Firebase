import React from 'react'
import { Picker } from 'react-native'

const FormSelect = ({ values, ...rest }) => (
  <Picker {...rest} style={{ height: 50, width: '100%' }}>
    {values && values.map((v, i) => <Picker.Item {...v} key={i} />)}
  </Picker>
)

export default FormSelect
