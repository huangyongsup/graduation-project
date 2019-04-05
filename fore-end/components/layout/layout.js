import React, { Component } from 'react'
import { Redirect,Link, withRouter } from 'react-router-dom'
import { Button, Layout, Menu, Icon } from 'antd'

import menus from './menus.json'

const { Header, Content, Sider, Footer } = Layout
const { SubMenu } = Menu

class RootLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [menus.subMenu.admin, menus.subMenu.teacher, menus.subMenu.student],
      collapsed: false,
    }
  }

  renderMenu = () => {
    return (
      <Menu
        mode="inline"
        theme="dark"
      >
        {this.state.arr.map(subMenu => {
          return (
            <SubMenu key={subMenu.key} title={
              <span>
                <Icon type={subMenu.iconType} />
                <span>{subMenu.title}</span>
              </span>
            }>
              {
                subMenu.menuItem.map(menuItem => {
                  return (
                    <Menu.Item key={menuItem.key}>
                      <Link to={menuItem.key}>
                        {menuItem.option}
                      </Link>
                    </Menu.Item>
                  )
                })
              }
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
                <span style={{ padding: 20 }}>
                  <Icon type="user" />
                  {''}
                </span>
                <Button type="danger">
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

export default withRouter(RootLayout)
