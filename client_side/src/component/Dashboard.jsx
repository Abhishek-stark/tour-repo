import { React, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, update, getAllusers } from '../reducers/authSlice';

import './dashboard.css';
// import Homepage from './Homepage';
const Dashboard = () => {
  // const [formdata, setformdata] = useState({
  //   name: '',
  //   email: '',

  //   // passwordCurrent: '',
  //   // password: '',
  //   // passwordConfirm: '',
  // });
  // const [photodata, setphotodata] = useState({
  //   photo: '',
  // });
  // const { photo } = photodata;
  // const { name, email } = formdata;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      console.log('loading');
    }
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      console.log('success');

      navigate('/login');
    }
    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch, navigate]);
  const goLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  const goRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const goTourpage = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', document.getElementById('name').value);
    formdata.append('email', document.getElementById('email').value);
    formdata.append('photo', document.getElementById('photo').files[0]);

    console.log(formdata);

    dispatch(update(formdata));
  };

  return (
    <>
      <div className="update_container">
        {' '}
        {user ? (
          <>
            <div className="left_userinfo">
              <ul className="user_datas">
                <li className="image_data">
                  <img className="user_image" src={user.photo} alt="user_img" />
                  <input
                    type="file"
                    placeholder="Update Photo"
                    id="photo"
                    name="photo"
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  <label htmlFor="photo" id="userlabel">
                    Select Photo{' '}
                  </label>{' '}
                </li>{' '}
                <li>
                  <Link to="/updatePassword"> Update Password </Link>{' '}
                </li>{' '}
                <li>
                  <Link to=""> Get Tour </Link>{' '}
                </li>{' '}
                <li>
                  <Link to="/"> Home </Link>{' '}
                </li>
              </ul>{' '}
            </div>{' '}
            <div className="right_userinfo">
              <form onSubmit={onSubmit} className="update_form">
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name}
                />{' '}
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                />{' '}
                <button type="submit" id="update_btn">
                  update setting{' '}
                </button>{' '}
              </form>{' '}
            </div>{' '}
          </>
        ) : (
          <h2> Your Are not Logged in !! </h2>
        )}{' '}
      </div>{' '}
    </>
  );
};

export default Dashboard;
