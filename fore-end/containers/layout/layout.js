import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { message, Button, Layout, Menu, Icon } from 'antd'
import { bindActionCreators } from 'redux'
import * as actions from '../loginModule/action'

const { Header, Content, Sider, Footer } = Layout
const { SubMenu } = Menu

class RootLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  componentWillMount() {
    const { userInfo: { userType } } = this.props
    if(!userType){
      location.hash = '#/login'
    }
  }

  renderMenu = () => {
    const teacher = {
      key: "teacher",
      title: "教师模块",
      iconType: "appstore",
      menuItem: [
        {
          key: "/teacher/correction",
          option: "批阅作业"
        }, {
          key: "/teacher/buildQuestionBank",
          option: "题库建设"
        },
      ],
      subMenu: {
        key: "createHomework",
        title: "布置作业",
        iconType: "setting",
        menuItem: [
          {
            key: "/teacher/singleChoice",
            option: "选择单选题"
          }, {
            key: "/teacher/multiChoice",
            option: "选择多选题"
          }, {
            key: "/teacher/shortAnswer",
            option: "选择简答题"
          }, {
            key: "/teacher/createTestPaper",
            option: "生成作业"
          },
        ]
      }
    }

    return (
      <Menu
        mode="inline"
        theme="dark"
      >
        {teacher.menuItem.map(value => {
          return (
            <Menu.Item key={value.key}>
              <Icon type={teacher.iconType} />
              <span>
              <Link to={value.key}>
                <span style={{color: "rgba(255, 255, 255, 0.65)"}}>{value.option}</span>
              </Link>
              </span>
            </Menu.Item>
          )
        })}
        <SubMenu title={
          <span>
            <Icon type={teacher.subMenu.iconType} />
            <span>{teacher.subMenu.title}</span>
          </span>
        }>
          {teacher.subMenu.menuItem.map(value => {
            return (
              <Menu.Item key={value.key}>
                <Link to={value.key}>
                  {value.option}
                </Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      </Menu>
    )
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    })
  }

  render() {
    const { signOut, children, userInfo: { username, userType } } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          {userType !== 'student' ?
            <Sider
              style={{paddingTop: 50}}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              {this.renderMenu()}
            </Sider>
            : false
          }
          <Layout>
            <Header style={{ background: '#49ACF1' }}>
              <div style={{ position: 'absolute', right: 32 }}>
                <span style={{ padding: 10 }}>
                  <Icon type="user" />
                  {username}
                </span>
                <Button type="danger" onClick={signOut}>
                  <Link to="/login">注销</Link>
                </Button>
              </div>
            </Header>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => state.loginReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RootLayout)
