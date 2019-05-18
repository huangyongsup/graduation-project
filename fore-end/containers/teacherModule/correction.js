import React from 'react'
import { Table, Button, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import moment from 'moment'
import * as actions from './action'

class Correction extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperList, setLoading, userInfo: { username } } = this.props
    setLoading()
    getTestPaperList({ tableName: 'getTestPaperList', username })
  }

  render() {
    const { testPaperList, isLoading } = this.props
    const columns = [{
      title: '试题名',
      dataIndex: 'testPaperTitle',
    }, {
      title: '命题教师',
      dataIndex: 'teacher',
    }, {
      title: '学生姓名',
      dataIndex: 'username',
    }, {
      title: '该生所在班级',
      dataIndex: 'className',
    }, {
      title: '评阅作业',
      key: 'testPaperId',
      render: (text, record, index) => {
          const disabled = moment().isBefore(moment(record.endTime).add(7, 'days'))
          return (
            <Button type={'primary'} disabled={!disabled}><Link to={{
              pathname: '/student/analysis',
              search: `${record.testPaperId}&${record.username}`
            }}>去答题</Link></Button>
          )
      }
    }, ]

    return (
      <Skeleton loading={isLoading} active={true}>
      <Table
        columns={columns}
        dataSource={testPaperList}
        rowKey={'testPaperId'}
      />
      </Skeleton>
    )
  }
}

const mapStateToProps = state => ({ ...state.loginReducer, ...state.teacherReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Correction)
