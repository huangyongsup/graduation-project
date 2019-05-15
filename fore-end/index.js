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
import MyTestList from './containers/studentModule/myTestList'
import MyTest from './containers/studentModule/myTest'
import Analysis from './containers/studentModule/analysis'
import BuildQuestionBank from "./containers/teacherModule/buildQuestionBank";
import ShortAnswer from './containers/teacherModule/shortAnswer'
import Correction from './containers/teacherModule/correction'

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
          <Route exact path={'/teacher/shortAnswer'} component={ShortAnswer} />
          <Route exact path={'/teacher/createTestPaper'} component={createTestPaper} />
          <Route exact path={'/teacher/buildQuestionBank'} component={BuildQuestionBank} />
          <Route exact path={'/teacher/correction'} component={Correction} />
          <Route exact path={'/student/myTestList'} component={MyTestList} />
          <Route exact path={'/student/myTest'} component={MyTest} />
          <Route exact path={'/student/analysis'} component={Analysis} />
        </Layout>
      </Switch>
    </HashRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
)
