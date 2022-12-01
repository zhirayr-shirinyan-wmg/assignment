import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { LeadForm, LeadList, LeadSearch } from '../components'
import {
  currentLeadSelector,
  leadsListSelector,
  getLeadsAsync,
  postLeadAsync,
  putLeadAsync,
  resetCurrentLead, searchLeadAsync
} from '../store/leadsSlice'

const LeadsContainer = () => {
  const methods = useForm({
    defaultValues: {
      name: null,
      lastName: null,
      organisation: null,
      email: null,
      phone: null
    }
  })

  const [filterUnselected, setFilterUnselected] = useState(false)

  const leadsList = useSelector(leadsListSelector)
  const currentLead = useSelector(currentLeadSelector)
  const dispatch = useDispatch()
  useEffect(( m) => {
    dispatch(getLeadsAsync())
  }, [dispatch])

  const leadListArr = useMemo(() => {
    if (!filterUnselected) return leadsList;
    return leadsList.filter((lead => !!lead.selected))
  }, [filterUnselected, leadsList])

  const handleSave = useCallback(() => {
    const lead = methods.getValues()
    dispatch(resetCurrentLead())
    methods.reset()
    if (currentLead) {
      return dispatch(putLeadAsync({ ...lead, id: currentLead }))
    }
    dispatch(postLeadAsync(lead))
  }, [currentLead, dispatch, methods])

  const handleError = useCallback((errors) => {
    const errorKeys = Object.keys(errors)
    const values = {}
    errorKeys.forEach((key) => (values[key] = null))
    methods.reset((formValues) => ({
      ...formValues,
      ...values
    }), {
      keepDefaultValues: true,
      keepErrors: true
    })
  }, [methods])

  const handleSearch = useCallback((searchValue) => {
    dispatch(searchLeadAsync(searchValue))
  }, [dispatch])

  const onClear = useCallback(() => {
    dispatch(resetCurrentLead())
    methods.reset()
  }, [dispatch, methods])

  return (
    <FormProvider  {...methods}>
      <form onSubmit={methods.handleSubmit(handleSave, handleError)}>
        <LeadForm onClear={onClear} />
      </form>
      <LeadSearch onSearch={handleSearch} onFilterChange={setFilterUnselected} />
      <LeadList leads={leadListArr} />
    </FormProvider>
  )
}

export default LeadsContainer