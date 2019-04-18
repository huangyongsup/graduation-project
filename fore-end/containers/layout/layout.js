import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { message, Button, Layout, Menu, Icon } from 'antd'
import { bindActionCreators } from 'redux'
import * as actions from '../loginModule/action'
import menus from './menus.json'

const { Header, Content, Sider, Footer } = Layout

class RootLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  componentWillMount() {
    const { userInfo } = this.props
    if(!userInfo.userType){
      location.href = 'http://localhost:1234/#/login'
    }
  }

  renderMenu = () => {
    const { userInfo } = this.props
    const { userType } = userInfo
    return (
      <Menu
        mode="inline"
        theme="dark"
      >
        { menus[userType].menuItem.map( menuItem => {
          return (
            <Menu.Item key={ menuItem.key }>
              <Link to={menuItem.key}>
                <Icon type={menus[userType].iconType} />
                { menuItem.option }
              </Link>
            </Menu.Item>
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
                  {` ${this.props.userInfo.userType}`}
                </span>
                <Button type="danger" onClick={this.props.signOut}>
                  <Link to="/login">注销</Link>
                </Button>
              </div>
            </Header>
            <Content>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => state.loginReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RootLayout)
