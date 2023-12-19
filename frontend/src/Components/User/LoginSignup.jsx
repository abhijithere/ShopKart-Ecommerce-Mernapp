import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Layout/Loader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useLocation } from 'react-router-dom';
import './Style.css'
import { clearErrors, login ,register } from '../../actions/userAction.js';
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom';


function LoginSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location =useLocation();

  const alert = useAlert();

  const {error, loading , isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] :`/profile`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {  loading ?<Loader/> : (
          <>
          <div className="LoginSignUpContainer  w-[100%] h-[100%] flex  justify-center items-center
  bg-[#e7e7e7] fixed top-0 ">
          <div className="LoginSignUpBox bg-white overflow-hidden box-border w-[27vw] h-[70vh] mt-14 shadow-lg rounded-sm">
            <div className=''>
              <div className="login_signUp_toggle flex h-12 ">
                <p onClick={(e) => switchTabs(e, "login")} className='text-[#000000ad]   hover:text-teal-500 transition-all duration-100 cursor-pointer grid place-items-center w-full  shadow-inner shadow-green-50 pt-5' >LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")} className='text-[#000000ad]  hover:text-teal-500  transition-all duration-100 cursor-pointer grid place-items-center w-full pt-5'>REGISTER</p>
              </div>
              <button ref={switcherTab} className='bg-teal-500 h-[2px] w-[50%] border-none transition-all'></button>
            </div>
            <form className="loginForm  flex flex-col items-center m-auto p-8 justify-evenly h-[70%] transition-all duration-700
   " ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail  ">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className=' caret-gray-400'
                />
              </div>
              <div className="loginPassword  ">
                <LockOpenIcon className='' />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className='caret-gray-400'
                />
              </div>
              <Link to="/password/forgot" className=' '>Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn " />
            </form>
            <form
              className="signUpForm flex flex-col gap-5 mt-8 items-center m-auto p-8 justify-evenly h-[70%] transition-all duration-700 "
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}

            >
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  className='caret-gray-400'
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  className='caret-gray-400'

                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  className='caret-gray-400'

                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" className='mr-2' />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </>
            
        )
    }
    </>
  );
}

export default LoginSignup
