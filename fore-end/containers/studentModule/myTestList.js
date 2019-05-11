import React from 'react'
import { Table, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import * as actions from './action'

class MyTestList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperList, initialize, userInfo: { classNo } } = this.props
    getTestPaperList({ type: 'getTestPaperList', classNo})
    initialize()
  }

  render() {
    const { testPaperList } = this.props
    const columns = [{
      title: '试卷名',
      dataIndex: 'testPaperTitle',
    }, {
      title: '操作',
      dataIndex: 'testPaperId',
      render: testPaperId => <Button type={'primary'}><Link to={{
           pathname: '/student/myTest',
           search: `${testPaperId}`
         }}>去答题
      </Link></Button>
    }]

    return (
      <Table
        columns={columns}
        dataSource={testPaperList}
        rowKey={'testPaperId'}
        />
    )
  }
}

const mapStateToProps = state => ({ ...state.loginReducer, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MyTestList)
