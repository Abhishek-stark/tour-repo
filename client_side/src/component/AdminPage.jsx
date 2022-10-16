import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies, useCookies, withCookies } from 'react-cookie';
// import { reset, getAllusers } from '../reducers/authSlice';
import './dashboard.css';
import Error from './Error';
const AdminPage = () => {
  const name = [];
  const email = [];
  const photo = [];
  const [cookies, setcookie] = useCookies();
  const user = JSON.parse(localStorage.getItem('user'));
  let token = user.token;
  const userdetail = JSON.parse(localStorage.getItem('userdetail'));
  useEffect(() => {
    getallUsers();
  }, []);

  const getallUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });

      if (response.data) {
        const { data } = response.data.data;
        localStorage.setItem('userdetail', JSON.stringify(data));
        // console.log(data);
      }

      return response.data;
    } catch (error) {
      // console.log(error);
      <Error />;
    }
  };
  return (
    <div className="allUsers_card">
      {userdetail.map((datas, i) => {
        const { name, photo, email } = datas;
        return (
          <div className="users_card" key={i}>
            <div className="users_img_cover">
              <img src={photo} alt="user_img" className="users_user_img" />
            </div>
            <h3>UserName: {name}</h3>
            <p>UserEmail: {email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPage;
