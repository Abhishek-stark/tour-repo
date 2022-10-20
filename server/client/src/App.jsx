import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Header from './components/Header';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Register from './component/Register';
import Useraccount from './component/Useraccount';
import Homepage from './component/Homepage';
import Tourpage from './component/Tourpage';
import axios from 'axios';
import Tourdetailpage from './component/Tourdetailpage';
import Passwordsetting from './component/Passwordsetting';
import Loading from './component/Loading';
import Error from './component/Error';
import ProtectedRouted from './component/ProtectedRouted';
import Nopage from './component/Nopage';
import AdminPage from './component/AdminPage';
import Unauthorized from './component/Unauthorized';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router forceRefresh={true}>
        <Homepage />
        <div className="container">
          <Routes>
            <Route
              path="/dashboard"
              exact
              element={<ProtectedRouted Component={Dashboard} />}
              //  element={<Dashboard />}
            />
            <Route
              path="/updatePassword"
              exact
              element={<ProtectedRouted Component={Passwordsetting} />}
              // element={<Passwordsetting />}
            />{' '}
            <Route
              path="/login"
              exact
              element={<ProtectedRouted Component={Login} />}
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/error" element={<Error />} />
            <Route path="/loading" element={<Loading />} />
            <Route
              path="/admin"
              exact
              element={<ProtectedRouted Component={AdminPage} />}
            />
            <Route path="/" exact element={<Tourpage />} />
            <Route
              path="/useraccount"
              exact
              element={<ProtectedRouted Component={Useraccount} />}
              // element={<Useraccount />}
            />
            <Route
              path="/register"
              exact
              element={<ProtectedRouted Component={Register} />}
              //  element={<Register />}
            />
            <Route
              path="/tourdetail"
              exact
              element={<ProtectedRouted Component={Tourdetailpage} />}
              // element={<Tourdetailpage />}
            />
            <Route path="/*" element={<Nopage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
