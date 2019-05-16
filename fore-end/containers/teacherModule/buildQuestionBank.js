import React from 'react'
import { Checkbox,Input, Form, Button, Card, Radio, Tabs, Tooltip } from 'antd'
import * as actions from "./action";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import SingleChoiceModal from '../../components/singleChoiceModal'
import MultiChoiceModal from '../../components/multiChoiceModal'
import ShortAnswerModal from '../../components/shortAnswerModal'

class BuildQuestionBank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singleChoiceModalVisible: false,
      multiChoiceModalVisible: false,
      shortAnswerModalVisible: false,
    }
  }

  showModal = (type) => {
    this.setState({ [`${type}ModalVisible`]: true })
  }

  onCancel = (type) => {
    this.setState({ [`${type}ModalVisible`]: false })
  }

  render() {
    const { singleChoiceModalVisible, multiChoiceModalVisible, shortAnswerModalVisible }= this.state
    const { userInfo: { username } } = this.props
    return (
      <Card title={'题库建设'}>
        <Card title={'添加单选题'}
              extra={<Button onClick={e => this.showModal('singleChoice')}>添加单选题</Button>}
        >
        </Card>
        <Card title={'添加多选题'}
              extra={<Button onClick={e => this.showModal('multiChoice')}>添加多选题</Button>}
        >

        </Card>
        <Card title={'添加简答题'}
              extra={<Button onClick={e => this.showModal('shortAnswer')}>添加简答题</Button>}
        >

        </Card>
        <SingleChoiceModal
          key={'singleChoice'}
          onCancel={e => this.onCancel('singleChoice')}
          visible={singleChoiceModalVisible}
          username={username}
        />
        <MultiChoiceModal
          key={'multiChoice'}
          onCancel={e => this.onCancel('multiChoice')}
          visible={multiChoiceModalVisible}
          username={username}
        />
        <ShortAnswerModal
          key={'shortAnswer'}
          username={username}
          onCancel={e => this.onCancel('shortAnswer')}
          visible={shortAnswerModalVisible}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => ({ userInfo: state.loginReducer.userInfo, ...state.teacherReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BuildQuestionBank))
