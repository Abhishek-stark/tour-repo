import React from 'react';

const Useraccount = () => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);

  // console.log(document.cookie);

  return (
    <div>
      <div> {user ? <p> {user.user.name} </p> : <span>no user</span>} </div>{' '}
    </div>
  );
};

export default Useraccount;
