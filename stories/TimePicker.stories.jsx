import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import TimePicker from '../src'

const Picker = props => {
  const [time, setTime] = useState(moment())

  return (
    <TimePicker
      minuteStep={15}
      showSecond={false}
      // show AM/PM
      use12Hours={true}
      // default to now
      value={time}
      {...props}
      onChange={value => {
        console.log('onChange', value)
        setTime(value)
      }}
    />
  )
}

storiesOf('Timepicker', module)
  .add('Step input only', () => <Picker />)
  .add('Any input allowed', () => <Picker allowStepInputOnly={false} />)
  .add('Null value', () => <Picker value={null} />)
