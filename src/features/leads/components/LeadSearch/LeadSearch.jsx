import React from 'react'
import { Input, Switch, Typography, Space } from 'antd'

import './LeadSearch.scss'

const { Paragraph } = Typography

const { Search } = Input

const LeadSearch = ({onSearch, onFilterChange}) => {
  return (
    <div className="search">
      <Search onSearch={onSearch}/>
      <Space className="search__filter" align="baseline">
        <Paragraph>
        Show only selected
      </Paragraph>
        <Switch onChange={onFilterChange} title="What the fuck" />
      </Space>
    </div>
  )
}

export default LeadSearch