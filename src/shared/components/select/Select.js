import React from 'react'
import { Controller } from 'react-hook-form'
import { Select as AntdSelect } from 'antd'
import classnames from 'classnames'

import './Select.scss'

const Select = ({
  fieldName,
  control,
  options,
  placeholder,
  className = '',
  rules
}) => {
  return (
    <Controller
      rules={rules}
      control={control}
      name={fieldName}
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState
      }) => (
        <AntdSelect
          {...field}
          placeholder={placeholder}
          className={classnames('select', className)}
          checked={field.value}
          options={options}
          {...(error && {status: 'error', placeholder: error.message})}
        />
      )}
    />
  )
}

export default Select