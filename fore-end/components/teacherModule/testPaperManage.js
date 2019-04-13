import React from 'react'
import { Button, Row, Col } from 'antd'
import TestPaperModal from "./testPaperModal";

class TestPaperManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showTestPaperModal = () => {
    this.setState({visible: true})
  }

  onCancel = () => {
    this.setState({visible: false})
  }
  render() {
    return (
      <div>
        <Row>
          <Button type={'primary'} onClick={this.showTestpaperModal}>新增试卷</Button>
          <TestPaperModal visible={this.state.visible} onCancel={this.onCancel}/>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
      </div>
    )
  }
}

export default TestPaperManage
