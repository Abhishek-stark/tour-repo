import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const usertoken = localStorage.getItem('user');
if (usertoken) {
    var token = usertoken.token;
}

const stripePromise = loadStripe(
    'pk_test_51LhXM5SBrxf9grZuKlaBjNwd4LPft9O4c06bUKX8eBsgSBgcxaxMcm2jDFZZtTcRmVitjammnAkHhD19KLepU0ns00ZPAKOmmI'
);

const bookTour = async(tourId) => {
    // 1) Get checkout session from API
    const session = await axios.get(
        `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);
    // var url = session.data.url;
    // navigate(`${url}`);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
    });
};

//

// const API_URL = '/api/v1/users/';

// Register user
const register = async(userData) => {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/users/signup',

        userData
    );

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const update = async(userData) => {
    const response = await axios.patch(
        'http://127.0.0.1:8000/api/v1/users/updateMe',
        userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const updatePassword = async(userData) => {
    const response = await axios.patch(
        'http://127.0.0.1:8000/api/v1/users/updateMyPassword',
        userData
    );

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async(userData) => {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/users/login',
        userData
    );

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
// const logout = () => {
//     localStorage.removeItem('user');
// };
const logout = async() => {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/users/logout');
    if (res.data.status === 'success') {
        // localStorage.removeItem('user');
        // localStorage.removeItem('tours');
        // localStorage.removeItem('tourdetail');
        localStorage.clear();
    }
    return res;
};
// const getTour = async() => {
//     const response = await axios.get('http://localhost:8000');
//     if (response.data) {
//         localStorage.setItem('tours', JSON.stringify(response.data));
//     }
//     return response.data;
// };

const getOneTour = async(slug) => {
    const response = await axios.get('http://127.0.0.1:8000/tour' + slug);
    if (response.data) {
        // console.log(response.data);
        localStorage.setItem('tourdetail', JSON.stringify(response.data));
    }
    return response.data;
};
const WriteReview = async(data, token) => {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/reviews',
        data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    // if (response.data) {
    //     console.log(response.data);
    // }
    return response.data;
};

const getAllusers = async() => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/users');
    // if (response.data) {
    //     console.log(response.data);
    // }
    return response.data;
};

const authService = {
    register,
    logout,
    login,
    update,
    // getTour,
    // bookTour,
    getOneTour,
    updatePassword,
    WriteReview,
    getAllusers,
};

export default authService;