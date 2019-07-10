/* eslint jsx-a11y/no-autofocus: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Trigger from 'rc-trigger'
import moment from 'moment'
import classNames from 'classnames'
import Panel from './Panel'

function noop() {}

export default class Picker extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    defaultOpenValue: PropTypes.object,
    inputReadOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    defaultValue: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    getPopupContainer: PropTypes.func,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    popupClassName: PropTypes.string,
    popupStyle: PropTypes.object,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onAmPmChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addon: PropTypes.func,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    use12Hours: PropTypes.bool,
    hourStep: PropTypes.number,
    minuteStep: PropTypes.number,
    secondStep: PropTypes.number,
    onKeyDown: PropTypes.func,
    autoFocus: PropTypes.bool,
    id: PropTypes.string
  }

  static defaultProps = {
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    inputReadOnly: false,
    style: {},
    className: '',
    popupClassName: '',
    popupStyle: {},
    id: '',
    defaultOpenValue: moment(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    onChange: noop,
    onAmPmChange: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    onBlur: noop,
    addon: noop,
    use12Hours: false,
    onKeyDown: noop
  }

  constructor(props) {
    super(props)
    this.saveInputRef = React.createRef()
    this.savePanelRef = React.createRef()
    const {
      defaultOpen,
      defaultValue,
      open = defaultOpen,
      value = defaultValue
    } = props
    this.state = {
      open,
      value
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps
    if ('value' in nextProps) {
      this.setState({
        value
      })
    }
    if (open !== undefined) {
      this.setState({ open })
    }
  }

  onPanelChange = value => {
    this.setValue(value)
  }

  onAmPmChange = ampm => {
    const { onAmPmChange } = this.props
    onAmPmChange(ampm)
  }

  // onClear = event => {
  //   event.stopPropagation()
  //   this.setValue(null)
  //   this.setOpen(false)
  // }

  onVisibleChange = open => {
    this.setOpen(open)
  }

  closePanel = () => {
    this.setOpen(false)
    this.focus()
  }

  onKeyDown = e => {
    if (e.keyCode === 40) {
      this.setOpen(true)
    }
  }

  setValue(value) {
    const { onChange } = this.props
    if (!('value' in this.props)) {
      this.setState({
        value
      })
    }
    onChange(value)
  }

  getFormat() {
    const { format, showHour, showMinute, showSecond, use12Hours } = this.props
    if (format) {
      return format
    }

    if (use12Hours) {
      const fmtString = [
        showHour ? 'h' : '',
        showMinute ? 'mm' : '',
        showSecond ? 'ss' : ''
      ]
        .filter(item => !!item)
        .join(':')

      return fmtString.concat(' a')
    }

    return [
      showHour ? 'HH' : '',
      showMinute ? 'mm' : '',
      showSecond ? 'ss' : ''
    ]
      .filter(item => !!item)
      .join(':')
  }

  getPanelElement() {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      inputReadOnly,
      showHour,
      showMinute,
      showSecond,
      defaultOpenValue,
      addon,
      use12Hours,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep
    } = this.props
    const { value } = this.state
    return (
      <Panel
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={value}
        inputReadOnly={inputReadOnly}
        onChange={this.onPanelChange}
        onAmPmChange={this.onAmPmChange}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        showMinute={showMinute}
        showSecond={showSecond}
        closePanel={this.closePanel}
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        addon={addon}
        onKeyDown={onKeyDown}
      />
    )
  }

  setOpen(open) {
    const { onOpen, onClose } = this.props
    const { open: currentOpen } = this.state
    if (currentOpen !== open) {
      if (!('open' in this.props)) {
        this.setState({ open })
      }
      if (open) {
        onOpen({ open })
      } else {
        onClose({ open })
      }
    }
  }

  focus() {
    this.saveInputRef.current.focus()
  }

  blur() {
    this.saveInputRef.current.blur()
  }

  render() {
    const {
      prefixCls,
      placeholder,
      id,
      disabled,
      style,
      className,
      name,
      autoComplete,
      onFocus,
      onBlur,
      autoFocus,
      inputReadOnly,
      popupStyle
    } = this.props
    const { open, value } = this.state
    return (
      // <Trigger
      //   prefixCls={}
      //   popupClassName={popupClassName}
      //   popupStyle={popupStyle}
      //   popup={this.getPanelElement()}
      //   onPopupVisibleChange={this.onVisibleChange}
      // >
      <div class={`${prefixCls}-wrapper`}>
        {open ? this.getPanelElement() : null}
        <span
          className={classNames(prefixCls, className)}
          style={style}
          onClick={() => this.setOpen(true)}
          onKeyDown={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
              // enter or space
              this.setOpen(true)
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <input
            className={`${prefixCls}-input`}
            ref={this.saveInputRef}
            type="text"
            placeholder={placeholder}
            name={name}
            onKeyDown={this.onKeyDown}
            disabled={disabled}
            value={(value && value.format(this.getFormat())) || ''}
            autoComplete={autoComplete}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            onChange={noop}
            readOnly={!!inputReadOnly}
            id={id}
          />
        </span>
      </div>
    )
  }
}
