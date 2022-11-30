import React from 'react'
import { Input, Switch } from 'antd'

import './LeadSearch.scss'

const { Search } = Input

const LeadSearch = ({onSearch, onFilterChange}) => {
  return (
    <div className="search">
      <Search onSearch={onSearch}/>
      <Switch onChange={onFilterChange}/>
    </div>
  )
}

export default LeadSearch