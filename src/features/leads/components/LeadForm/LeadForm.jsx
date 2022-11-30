import React from 'react'
import { Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import { organisationOptions, rules } from 'features/leads/constants'
import { Select, Input } from 'shared/components'

import './LeadForm.scss'

const LeadForm = ({ onClear }) => {
  const { control } = useFormContext()
  return (
    <div className="lead-form">
      <Input
        rules={rules.name}
        className="lead-form__field"
        fieldName="name"
        control={control}
        placeholder="Name"
      />
      <Input
        rules={rules.lastName}
        className="lead-form__field"
        fieldName="lastName"
        control={control}
        placeholder="Last Name"
      />
      <Select
        rules={rules.organisation}
        className="lead-form__field"
        control={control}
        fieldName="organisation"
        placeholder="Organization"
        options={organisationOptions} />
      <Input
        rules={rules.email}
        className="lead-form__field"
        fieldName="email"
        control={control}
        placeholder="Email"
      />
      <Input
        rules={rules.phone}
        className="lead-form__field"
        fieldName="phone"
        control={control}
        placeholder="Phone"
      />
      <div className="lead-form__controls">
        <Button
          className="lead-form__button"
          htmlType="submit"
          type="primary">Save</Button>
        <Button
          className="lead-form__button"
          onClick={onClear}
          type="primary">Clear</Button>
      </div>
    </div>

  )
}

export default LeadForm