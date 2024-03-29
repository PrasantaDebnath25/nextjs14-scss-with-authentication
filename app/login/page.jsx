"use client";
import React, { useEffect, useReducer } from "react";
import BgImg from '../../public/images/login_bg.jpg'
import LoginLogo from '../../public/images/login_logo.svg'
import { useRouter } from "next/navigation";
import EmailIcon from '../../public/images/email_icon_red.svg'
import Image from 'next/image';
import Link from "next/link";
import { EMAIL_FOR_VERIFY_KEY, FORGET_PASSWORD_LINK, HOME_LINK, PRODUCT_LINK, PROFILE_LINK, REGISTER_LINK, TOKEN_KEY, VERIFY_OTP_LINK } from "../../utils/constants";
import Reducer from "../../utils/Reducer";
import Validator from "../../utils/Validation";
import { CallWithOutAuth } from "../../actions/apiAction";
import { LOGIN_API_URL, REGISTER_API_URL } from "../../utils/apiUrl";
import ToastHot from 'react-hot-toast';
import { setCookie } from "cookies-next";
import useAuth from "../../hooks/useAuth";
import SiteLayout from "../SiteLayout";
import HomeIcon from '@mui/icons-material/Home';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockIcon from '@mui/icons-material/Lock';

const initState = {
  stepper: "email",
  email: '',
  password: '',
  agree: '',
  loading: false,
  validate: false
};

const loginErrState = {
  accountnotExist: false,
  emailErrBlank: false,
  IsValidEmail: false,
  IsExistEmail: false,
  IsExpiredAccount: false,
  IsBlockedEmail: false,
  IsYourLoginCredential: false
};

export default function Login() {
  const { updateUser, user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(Reducer, initState);
  const [stateForErr, dispatchForErr] = useReducer(Reducer, loginErrState);
  const router = useRouter();

  const getValidation = () => {
    return new Promise((resolve, reject) => {
      if (Validator.text(state.email.toLowerCase())
        &&
        Validator.email(state.email)
        // Validator.text(state.password)
        // &&
        // Validator.passwordCheck(state.password) &&
        // state.agree
        // && (((Cookie.getCookie('checkLoginError') && parseInt(Cookie.getCookie('checkLoginError')) >= 3) || stateForErr.showErrorCaptcha) ? varifyCaptcha : true)
      ) {
        resolve(true)
      } else {

        if (!Validator.text(state.email)) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
          console.log('email')
        } else if (!Validator.email(state.email.toLowerCase())) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
        }
        // if (!Validator.text(state.password)) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: true } });
        //   console.log('password')
        // }
        // else if (!Validator.passwordCheck(state.password)) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: true } });
        //   console.log('password2')
        // }

        // if (!state.agree) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'agreeErrBlank', value: true } });
        //   console.log('Agree')
        // }
        resolve(false)
      }
    });
  };

  const getUserValidation = () => {
    return new Promise((resolve, reject) => {
      if (Validator.text(state.email.toLowerCase())
        &&
        Validator.email(state.email) &&
        Validator.text(state.password)
        &&
        Validator.passwordCheck(state.password)
        // state.agree
        // && (((Cookie.getCookie('checkLoginError') && parseInt(Cookie.getCookie('checkLoginError')) >= 3) || stateForErr.showErrorCaptcha) ? varifyCaptcha : true)
      ) {
        resolve(true)
      } else {

        if (!Validator.text(state.email)) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
          console.log('email')
        } else if (!Validator.email(state.email.toLowerCase())) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
        }
        if (!Validator.text(state.password)) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: true } });
          console.log('password')
        }
        else if (!Validator.passwordCheck(state.password)) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: true } });
          console.log('password2')
        }

        // if (!state.agree) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'agreeErrBlank', value: true } });
        //   console.log('Agree')
        // }
        resolve(false)
      }
    });
  };
  const getData = (e) => {
    if (e.target.name === "email") {

      if (!Validator.text(e.target.value)) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: true } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
        console.log('email')
      } else if (!Validator.email(e.target.value.toLowerCase())) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: true } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
      } else {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });
      }
    }

    if (e.target.name === "password") {

      if (!Validator.text(e.target.value)) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: true } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        console.log('password')
        // } else if (!Validator.passwordCheck(e.target.value)) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: true } });
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: false } });
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        //   console.log('password2')
      } else {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
      }
    }

    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'accountnotExist', value: false } });
    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredential', value: false } });
    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: false } });

    if (e.target.name === "agree") {
      dispatch({ type: "ONCHANGE_CHECKBOX", payload: e })
    } else {
      dispatch({ type: "ONCHANGE", payload: e })
    }
  }

  const onKeyDown = (e) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (state.stepper === "email") {
        onEmailSubmit(e);
      } else {
        onUserSubmit(e);
      }

    }
  }

  // Login Function
  const onEmailSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: 'VALIDATE', payload: true });

    let validationStatus = await getValidation();
    if (validationStatus) {
      dispatch({ type: 'LOAD', payload: true });

      let payload = {
        email: state.email.toLowerCase(),
        // password: state.password
      }
      let responce = await CallWithOutAuth("POST", LOGIN_API_URL, payload);
      dispatch({ type: 'LOAD', payload: false });
      if (responce.data.status === 200) {
        dispatch({ type: 'SETDATA', payload: { name: 'stepper', value: "password" } });
        ToastHot.success(`Please enter password for login`);
      }
      if (responce && responce.data.status === 400) {

        if (responce && responce.data.message === 'Please verify your account') {
          setCookie(EMAIL_FOR_VERIFY_KEY, state.email ? state.email.toLowerCase() : "");
          router.push(VERIFY_OTP_LINK);
        } else if (responce && responce.data.message === 'Email not exists') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: true } });
        } else if (responce && responce.data.message === 'Email or password is not matching') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'accountnotExist', value: true } });
        } else if (responce && responce.data.message === 'User not found') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: true } });
        } else if (responce && responce.data.message === 'Your account has expired, please contact your org admin') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: true } });
        }

      }
    }
  };

  const onUserSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: 'VALIDATE', payload: true });

    let validationStatus = await getUserValidation();
    if (validationStatus) {
      dispatch({ type: 'LOAD', payload: true });

      let payload = {
        email: state.email.toLowerCase(),
        password: state.password
      }
      let responce = await CallWithOutAuth("POST", LOGIN_API_URL, payload);
      dispatch({ type: 'LOAD', payload: false });
      if (responce.data.status === 200) {
        ToastHot.success(`Account successfully loggedin. `);
        setCookie(TOKEN_KEY, responce?.data?.data?.token);
        updateUser(responce?.data?.data?.userDetails);
        router.push(PRODUCT_LINK);

      }
      if (responce && responce.data.status === 400) {

        if (responce && responce.data.message === 'Please verify your account') {
          setCookie(EMAIL_FOR_VERIFY_KEY, state.email ? state.email.toLowerCase() : "");
          router.push(VERIFY_OTP_LINK);
        } else if (responce && responce.data.message === 'Email not exists') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: true } });
        } else if (responce && responce.data.message === 'Email or password is not matching') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'accountnotExist', value: true } });
        } else if (responce && responce.data.message === 'User not found') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: true } });
        } else if (responce && responce.data.message === 'Your account has expired, please contact your org admin') {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExpiredAccount', value: true } });
        }

      }
    }
  };
  return (
    <SiteLayout>
      {!isAuthenticated &&
        <div className="login_block">
          <div className="text_block">
            <div className="inner">
              {/* <Image src="/images/favicon/favicon-196x196.png" alt="" onClick={()=> router.push(HOME_LINK)} className="cursor-pointer" /> */}
              <a>
              <HomeIcon onClick={()=> router.push(HOME_LINK)} className="cursor-pointer"/>
              </a>
              <div className="inner_block">
                <h3>Login</h3>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliquaa. </p> */}
                <div className="form_block">
                  <label htmlFor="">Email</label>
                  <div className="input_group">
                    <Image src={EmailIcon} alt="" />
                    <input type="text" id="email"
                      value={state.email}
                      onChange={getData}
                      name="email"
                      onKeyDown={onKeyDown}
                      disabled={state.stepper === "email" ? false : true}
                      className={(stateForErr.emailErrBlank || stateForErr.IsValidEmail || stateForErr.accountnotExist) ? "red-border" : ""} />
                    {stateForErr.emailErrBlank &&
                      <p className="error-msg">Email is required.</p>
                    }
                    {stateForErr.IsValidEmail &&
                      <p className="error-msg">Enter valid email.</p>
                    }

                    {stateForErr.IsExistEmail &&
                      <p className="error-msg">This Email not yet registered with us.</p>
                    }
                    {stateForErr.IsBlockedEmail &&
                      <p className="error-msg">Login failed, Please contact your admin.</p>
                    }
                    {stateForErr.IsYourLoginCredential &&
                      <p className="error-msg">You don't have to access it. Contact Super Admin.</p>
                    }
                    {stateForErr.IsExpiredAccount &&
                      <p className="error-msg">Your account has expired, please contact your org admin.</p>
                    }
                  </div>
                  {state.stepper !== "email" &&
                    <>
                      <label htmlFor="">Password</label>
                      <div className="input_group">
                        <LockIcon className="field_icon" />
                        <input type="password" id="password"
                          // value={state.password}
                          onChange={getData}
                          name="password"
                          onKeyDown={onKeyDown}
                          className={(stateForErr.passErrBlank || stateForErr.IsValidPass) ? "red-border" : ""} />
                        {/* <button className="passShowHideBtn"><RemoveRedEyeOutlinedIcon /> <VisibilityOffOutlinedIcon /></button> */}
                        {stateForErr.passErrBlank &&
                          <p className="error-msg">Password is required.</p>
                        }
                        {stateForErr.IsValidPass &&
                          <p className="error-msg">Please enter valid password minimum 8 characters with at least a number,
                            special character and capital letter and small letter.</p>
                        }
                        {stateForErr.accountnotExist &&
                          <p className="error-msg">Wrong Password provided.</p>
                        }
                      </div>
                    </>
                  }

                  <button className="submit_btn" onClick={(e) => state.stepper === "email" ? onEmailSubmit(e) : onUserSubmit(e)}>{state.stepper === "email" ? "next" : "Login"} </ button>

                  <div className="forgot_password">
                    <Link href={FORGET_PASSWORD_LINK}>Forgot Password?</Link>
                  </div>
                </div>
              </div>

              <p>Don’t Have an Account? <Link href={REGISTER_LINK}>Register</Link></p>
            </div>

          </div>
        </div>}
    </SiteLayout>
  );


}