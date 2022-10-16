import { React, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../reducers/authSlice';
import Error from './Error';
import './homepage.css';
import Loading from './Loading';
const Homepage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      <Loading />;
    }
    if (isError) {
      <Error />;
    }
    if (isSuccess) {
      // if (user) navigate('/tours');
      if (user) console.log('change here in homepage jsx');
      else navigate('/login');
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]);
  const OnLogout = (e) => {
    e.preventDefault();

    dispatch(logout());

    dispatch(reset());
  };
  const OnLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  const Onregister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <>
      <div className="homepage_class">
        <nav nav_bar className="nav_container">
          <div className="left_nav">
            <h2> All Tours </h2>{' '}
          </div>{' '}
          <div className="right_nav">
            <ul>
              {' '}
              {user ? (
                <>
                  <li>
                    <button className="nav_logout_button" onClick={OnLogout}>
                      Logout{' '}
                    </button>{' '}
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <img src={user.photo} alt="dashboardLink" />
                    </Link>{' '}
                  </li>{' '}
                </>
              ) : (
                <>
                  <li>
                    <button className="nav_login_button" onClick={OnLogin}>
                      Login{' '}
                    </button>{' '}
                  </li>{' '}
                  <li>
                    <button
                      className="nav_register_button"
                      onClick={Onregister}
                    >
                      Register{' '}
                    </button>{' '}
                  </li>{' '}
                </>
              )}{' '}
            </ul>{' '}
          </div>{' '}
        </nav>{' '}
      </div>{' '}
    </>
  );
};

export default Homepage;
