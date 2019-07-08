import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

// import { action } from '@storybook/addon-actions'
// import {
//   withKnobs,
//   text,
//   boolean,
//   number,
//   selectV2
// } from '@storybook/addon-knobs/react'

import TimePicker from '../src/'

storiesOf('Timepicker', module).add('First', () => (
  <TimePicker
    minuteStep={15}
    showSecond={false}
    // show AM/PM
    use12Hours={true}
    // component manages state
    defaultValue={moment()}
  />
))
