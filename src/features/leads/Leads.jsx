import React from 'react'
import { Col, Row } from 'antd'

import { LeadsContainer } from "./containers";

import './Leads.scss'

const ProjectCreatePage = () => {
  return (
    <div className="page leads">
      <Row>
        <Col xs={{ span: 14, offset: 5 }}>
          <LeadsContainer />
        </Col>
      </Row>
    </div>
  )
}

export default ProjectCreatePage
