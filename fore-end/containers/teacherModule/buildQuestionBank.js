import React from 'react'
import { Tabs } from 'antd'

class BuildQuestionBank extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Tabs>
        <Tabs.TabPane tab={'单选题'} key={'single'}>单选题</Tabs.TabPane>
        <Tabs.TabPane tab={'多选题'} key={'multi'}>多选题</Tabs.TabPane>
        <Tabs.TabPane tab={'简答题'} key={'shortAnswer'}>简单题</Tabs.TabPane>
      </Tabs>
    )
  }
}

export default BuildQuestionBank
