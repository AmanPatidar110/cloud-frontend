import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { loginUser, logoutUser } from './store/appSlice';
import { auth } from './utils/firebase';
import Loader from './UI/Reusable/Loader';
import ProtectedRoute from './UI/Reusable/ProtectedRoute';
import Dashboard from './UI/Controllers/Dashboard';
import { Login } from './UI/Controllers/Login';
import { useAuthState } from 'react-firebase-hooks/auth';

// import useLogout from "./helpers/hooks/useLogout";

const App = (props) => {
  const dispatch = useDispatch();
  // const logout = useLogout();
  const history = useHistory();

  const showLoader = useSelector((state) => state.app.showLoader);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return history?.replace('/login');

    dispatch(
      loginUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
  }, [user, loading]);

  console.log('showLoader', showLoader);

  return (
    <React.Fragment>
      {showLoader ? <Loader title={showLoader} /> : null}

      <BrowserRouter>
        <Switch>
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
          <Route path={'/login'} component={Login} />
          {/* <Route path={"/forget-password"} component={ForgetPassword} /> */}

          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
