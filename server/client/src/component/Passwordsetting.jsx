import { useState, React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { reset, updatePassword } from '../reducers/authSlice';
const Passwordsetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prevstate, setstate] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const { passwordCurrent, password, passwordConfirm } = prevstate;
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      navigate('/loading');
    }
    if (isSuccess && user) {
      navigate('/dashboard');
    }
    if (isError) {
      navigate('/error');
    }
    dispatch(reset());
  }, [navigate, isError, user, isLoading, isSuccess, message, dispatch]);

  const onchange = (e) => {
    e.preventDefault();
    setstate((previousstate) => ({
      ...previousstate,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const passwordData = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    dispatch(updatePassword(passwordData));
  };
  return (
    <div>
      <h1>Hello to password Update</h1>
      <form onSubmit={onSubmit} className="password_update">
        <div className="password_update_input">
          <input
            type="password"
            id="passwordCurrent"
            name="passwordCurrent"
            value={passwordCurrent}
            onChange={onchange}
            placeholder="Enter Current password"
          />
        </div>
        <div className="password_update_input">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onchange}
            placeholder="Enter new password"
          />
        </div>
        <div className="password_update_input">
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onchange}
            placeholder="Confirm new password"
          />
        </div>
        <div className="password_update_button  password_update_input">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Passwordsetting;
