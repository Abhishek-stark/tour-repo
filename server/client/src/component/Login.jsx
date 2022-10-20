import { useState, useEffect } from 'react';
import './login.css';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, getAllusers } from '../reducers/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // navigate('/error');
      console.log('error');
    }

    if (isSuccess || user) {
      navigate('/');
    }

    if (user && user.role === 'admin') {
      // console.log('this is role with admin');

      navigate('/admin');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    navigate('/loading');
  }

  return (
    <>
      <section className="main_form">
        <form className="left_form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </section>{' '}
    </>
  );
}

export default Login;
