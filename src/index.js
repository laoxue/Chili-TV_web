import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chili from './components/chili.jsx'; // 应用后台
import Index from './components/index.jsx'
import Login from './components/login.jsx'
import Quill from './components/quill.jsx'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/home" exact>
          <Index />
      </Route>
      <Route path="/chili" exact>
          <Chili />
      </Route>
      <Route path="/login" exact>
          <Login />
      </Route>
      <Route path="/quill" exact>
          <Quill />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
// 路由加载
reportWebVitals();
