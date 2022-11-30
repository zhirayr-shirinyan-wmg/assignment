import React, { useCallback, useRef } from 'react'
import { List, Card, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import { useFormContext } from 'react-hook-form'

import {
  deleteLeadAsync, selectLeadAsync,
  setCurrentLead
} from 'features/leads/store/leadsSlice'
import './LeadList.scss'


const LeadList = ({ leads }) => {

  const { reset } = useFormContext()

  const dispatch = useDispatch()
  const pendingClick = useRef(0)

  const onLeadClick = useCallback((lead) =>
    () => {
      dispatch(setCurrentLead(lead.id))
      reset({ ...lead }, { keepDefaultValues: true })
    }, [dispatch, reset])

  const onDoubleClick = useCallback((lead) => {
    dispatch(selectLeadAsync(lead))
  }, [dispatch])

  const handleCardClick = useCallback((lead) => (e) => {
    if (pendingClick.current) {
      clearTimeout(pendingClick.current)
      pendingClick.current = 0
    }
    switch (e.detail) {
      case 1:
        pendingClick.current = setTimeout(
          onLeadClick(lead),
          200
        )
        break
      case 2:
        onDoubleClick(lead)
        break
      default:
        return
    }
  }, [onDoubleClick, onLeadClick])


  const handleLeadDelete = useCallback((lead) => () => {
    dispatch(deleteLeadAsync(lead.id))
  }, [dispatch])
  return (
    <>
      {
        leads ? <List
          className="leads-list"
          grid={{
            gutter: 10,
            column: 1
          }}
          bordered={false}
          split={false}
          itemLayout="horizontal"
          dataSource={leads}
          renderItem={(lead) => (
            <List.Item key={lead.id}>
              <div
                className="leads-list__container"
                onClick={handleCardClick(lead)}
              >
                <Card
                  className={classNames('leads-list__item', {"leads-list__item--selected": lead.selected})}
                >
                  <p>{lead.name}</p>
                  <p>{lead.lastName}</p>
                  <p>{lead.organisation}</p>
                  <p>{lead.email}</p>
                  <p>{lead.phone}</p>
                  <Button
                    type="text"
                    danger
                    icon={<CloseCircleOutlined />}
                    className="leads-list__close-button"
                    onClick={handleLeadDelete(lead)} />
                </Card>
              </div>
            </List.Item>
          )}
        /> : null
      }
    </>
  )
}

export default LeadList


