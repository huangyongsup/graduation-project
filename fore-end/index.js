import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Layout from './components/layout/layout'
import Admin from './components/adminModule/admin'
import Student from './components/studentModule/student'
import Teacher from './components/teacherModule/teacher'
import Login from './components/loginModule/login'
import TestPaperManage from './components/teacherModule/testPaperManage'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/admin/testManage" component={Admin} />
          <Route exact path="teacher" component={Teacher} />
          <Route exact path="student" component={Student} />
          <Route exact path={'/teacher/testPaperManage'} component={TestPaperManage} />
        </Layout>
      </Switch>
    </HashRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
)
