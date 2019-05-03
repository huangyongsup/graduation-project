import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Layout from './containers/layout/layout'
import Admin from './containers/adminModule/admin'
import SingleChoice from './containers/teacherModule/singleChoice'
import MultiChoice from './containers/teacherModule/multiChoice'
import createTestPaper from './containers/teacherModule/createTestPaper'
import Login from './containers/loginModule/login'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/admin/testManage" component={Admin} />
          <Route exact path="/teacher/singleChoice" component={SingleChoice} />
          <Route exact path="/teacher/multiChoice" component={MultiChoice} />
          <Route exact path={'/teacher/createTestPaper'} component={createTestPaper} />
        </Layout>
      </Switch>
    </HashRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
)
