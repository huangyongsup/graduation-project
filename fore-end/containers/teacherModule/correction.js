import React from 'react'
import { Tooltip,Table, Button, Skeleton } from 'antd'
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
      title: '作业名',
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
      title: '未批改',
      key: 'testPaperId',
      render: (text, record, index) => {
        if (!parseInt(text.isGrade)) {
          if(moment().isAfter(moment(text.endTime).add(7, 'days'))){
            return (
              <Tooltip title={'此作业不在有效评分期限内'}>
                <Button type={'primary'} disabled><Link to={{
                  pathname: '/student/analysis',
                  search: `${record.testPaperId}&${record.username}`
                }}>批改作业</Link></Button>
              </Tooltip>
            )
          } else {
            return (
              <Button type={'primary'}><Link to={{
                pathname: '/student/analysis',
                search: `${record.testPaperId}&${record.username}`
              }}>批改作业</Link></Button>
            )
          }
        }
      }
    }, {
      title: '已批改',
      key: 'shortAnswerId',
      render: (text, record, index) => {
        if (parseInt(text.isGrade)) {
          return (
            <Button type={'primary'}><Link to={{
              pathname: '/student/analysis',
              search: `${record.testPaperId}&${record.username}`
            }}>查看作业</Link></Button>
          )
        }
      }
    }]

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
