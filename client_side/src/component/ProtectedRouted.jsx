import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRouted = (props) => {
  const { Component } = props;
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRouted;
