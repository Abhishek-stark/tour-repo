/*eslint-disable*/

const login = async(items = { email, password }) => {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(items),
    });
    if (response.status === 200) {
        console.log(items);
        console.log(response.data);

        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    }
};

// };

const loginform = document.querySelector('.login_form');

if (loginform) {
    loginform.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let data = { email, password };
        login(data);
        //     const formdata = new FormData(loginform);
        //     const data = Object.fromEntries(formdata);
        //     fetch('http://localhost:3000/api/v1/users/login', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(data),
        //         })
        //         .then((res) => {
        //             console.log(res);
        //         })
        //         .then((data) => console.log(data));
    });
}