import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import {
//   withKnobs,
//   text,
//   boolean,
//   number,
//   selectV2
// } from '@storybook/addon-knobs/react'

import TimePicker from '../src/'

storiesOf('Timepicker', module).add('First', () => <TimePicker />)
