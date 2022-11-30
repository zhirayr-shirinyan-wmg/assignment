import React from 'react'
import { Controller } from 'react-hook-form'
import { Input as AntdInput } from 'antd'
import classnames from 'classnames'

const Input = ({
  fieldName,
  control,
  placeholder,
  className,
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
        <AntdInput
          {...field}
          className={classnames('input', className)}
          placeholder={placeholder}
          {...(error && {status: 'error', placeholder: error.message})}
        />
      )}
    />
  )
}

export default Input