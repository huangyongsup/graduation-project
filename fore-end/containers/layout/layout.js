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
    const menus = {
      admin: {
        key: "admin",
        title: "管理员模块",
        iconType: "appstore",
        menuItem: [
          {
            key: "/admin/testManage",
            option: "考试管理"
          }, {
            key: "/admin/teacherManage",
            option: "教师管理"
          }, {
            key: "/admin/studentManage",
            option: "学生管理"
          }
        ],
      },
      teacher: {
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
      },
      student: {
        key: "student",
        title: "学生模块",
        iconType: "appstore",
        menuItem: [
          {
            key: "/student/myTestList",
            option: "我的作业"
          }
        ]
      }
    }
    const arr = [menus.admin, menus.teacher, menus.student]
    return (
      <Menu
        mode="inline"
        theme="dark"
      >
        {arr.map(subMenu => {
          return (
            subMenu.subMenu ?
              <SubMenu key={subMenu.key} title={
                <span>
                <Icon type={subMenu.iconType} />
                <span>{subMenu.title}</span>
              </span>
              }>
                <SubMenu key={subMenu.subMenu.key} title={
                  <span>
                        <Icon type={subMenu.subMenu.iconType} />
                        <span>{subMenu.subMenu.title}</span>
                      </span>
                }>
                  {subMenu.subMenu.menuItem.map(menuItem => {
                      return (
                        <Menu.Item key={menuItem.key}>
                          <Link to={menuItem.key}>
                            {menuItem.option}
                          </Link>
                        </Menu.Item>
                      )
                    })}
                </SubMenu>
                {subMenu.menuItem.map(menuItem => {
                  return (
                    <Menu.Item key={menuItem.key}>
                      <Link to={menuItem.key}>
                        {menuItem.option}
                      </Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
              :
              <SubMenu key={subMenu.key} title={
                <span>
                <Icon type={subMenu.iconType} />
                <span>{subMenu.title}</span>
              </span>
              }>
                {subMenu.menuItem.map(menuItem => {
                  return (
                    <Menu.Item key={menuItem.key}>
                      <Link to={menuItem.key}>
                        {menuItem.option}
                      </Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
          )
        })}
      </Menu>
    )
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    })
  }

  render() {
    const { signOut, children, userInfo: { username } } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Sider
            style={{ paddingTop: 50 }}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            {this.renderMenu()}
          </Sider>
          <Layout>
            <Header style={{ background: '#49ACF1' }}>
              <div style={{ position: 'absolute', right: 32 }}>
                <span style={{ padding: 10 }}>
                  <Icon type="user" />
                  {` ${username}`}
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
