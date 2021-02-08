import React from 'react';
import Home from './pages/home';
import Auth from './pages/auth';
import { Route } from 'react-router-dom';
import Login from './component/auth/login';
import Join from './component/auth/join';
import UserInfo from './pages/userinfo';
import RefreshToken from './component/auth/refresh';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/join" component={Join} />
      <Route path="/auth/userinfo" component={UserInfo} />
      <Route exact path="/auth" component={Auth} />
    </div>
  );
}

export default App;
