"use client";
import React, { createContext, useEffect, useReducer } from 'react';
import ToastHot from 'react-hot-toast';
import { LOGIN_LINK, TOKEN_KEY } from '../utils/constants';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import LoadingScreen from '../layout/MainLayout/LoadingScreen';
import { CallWithAuth } from '../actions/apiAction';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'userUpdate': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  Login: () => Promise.resolve(),
  Logout: () => { console.log('Logout') },
  updateUser: () => Promise.resolve(),
  RegisterUser: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const pageFullUrl = usePathname();
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const router = useRouter();
  const Login = async (email, password, type = 'normalLogin') => {
    if (type === 'normalLogin') {
      const body = {
        email,
        password,
      };
      const response = await login(body);
      console.log("login response: ---------", response)
      if (response) {
        if (response.data.status === 200 ) {
          // ToastHot.success("Welcome to Zealous");
        

          dispatch({ type: 'LOGIN', payload: response.data.data })
          if (response.data.data && !response.data.data.isPasswordModified) {
            // console.log("Hi5", response.data.user_data.user_step)
            history.push('/reset-pass')
          }

        } else {
          return response;
        }
      } else {
        ToastHot.error("Something went wrong");

      }
    } else {
      const body = {
        email,
        token: password,
        type
      };
      const response = await loginForGoogle(body);
      console.log("login response: ---------", response)
      if (response) {
        if (response.data.status === 200 && response.data.data.roles && response.data.data.roles.length > 0 && (response.data.data.roles[0].id === 2 || response.data.data.roles[0].id === 3)) {
          // ToastHot.success("Welcome to Zealous");
          if(!Cookie.getCookie('_ShowTable')) {
            Cookie.setCookie('_ShowTable', true, 1);
            Cookie.setCookie('_ShowGrid', false, 1);
          }
          
          Cookie.setCookie('_tokenZealous', response.data.token, 1);

          Cookie.setHourCookie('_CookieCalledMailBackground', '', 1);

          Cookie.setCookie('_CookieTimerMin', '', 1);
          Cookie.setCookie('_CookieTimerSec', '', 1);

          dispatch({ type: 'LOGIN', payload: response.data.data })

          if (response.data.data.roles[0].id === 3) {
            localStorage.setItem('clientId', response.data.data.admin?.office365ClientId)
            localStorage.setItem('authority', response.data.data.admin?.office365TenantId)
          } else {
            localStorage.setItem('clientId', response.data.data?.office365ClientId)
            localStorage.setItem('authority', response.data.data?.office365TenantId)
          }

          //Remove Login Time error checking key
          Cookie.deleteCookie('checkLoginError')

          getCheckBalance(response.data.data.id)

          if (response.data.data && !response.data.data.isPasswordModified) {
            // console.log("Hi5", response.data.user_data.user_step)
            history.push('/reset-pass')
          }

        } else {
          return response;
        }
      } else {
        ToastHot.error("Something went wrong");

      }
    }
    // return body;
  };

  const Logout = async () => {
    
    deleteCookie(TOKEN_KEY)
    dispatch({ type: 'LOGOUT' });
    router.push(LOGIN_LINK);

  };

  const updateUser = (user) => {
    dispatch({ type: 'userUpdate', payload: user })

  }

  const RegisterUser = async (payload, type = 'normalRegister') => {
    // if (type === 'normalRegister') {
    //   const response = await register(payload);
    //   console.log("Register response: ---------", response)
    //   if (response) {
    //     if (response.data.status === 200) {
    //       // ToastHot.success("Successfully registered with us");

    //       // Cookie.setCookie('_tokenZealous', response.data.token, 1);
    //       // dispatch({type: 'REGISTER', payload: response.data.user_data})
    //       console.log(`Successfully registered with us`)
    //       return response;
    //     } else {
    //       return response;
    //     }
    //   } else {
    //     ToastHot.error("Something went wrong");

    //   }
    // } else {
    //   const response = await GoogleRegister(payload);
    //   console.log("Register response: ---------", response)
    //   if (response) {
    //     if (response.data.status === 200) {
    //       ToastHot.success("Successfully registered with us");
    //       Cookie.setCookie('_tokenZealous', response.data.user_data.token_data.access_tokenZealous, 1);
    //       dispatch({ type: 'REGISTER', payload: response.data.user_data.user })
    //       return response;
    //     } else {
    //       return response;
    //     }
    //   } else {
    //     ToastHot.error("Something went wrong");

    //   }
    // }

  };


  useEffect(() => {
    // alert("hi")
    const initialise = async () => {
      // try {
        const accessToken = getCookie(TOKEN_KEY);
        const publicPaths = ['/home','/login', '/register', '/reset-password', '/forgot-password', '/otp-verify', "/password-change"];
        if (accessToken) {
          // Cookie.setCookie('_tokenZealous', accessToken, 1);
          setCookie(TOKEN_KEY, accessToken);
          // call user details api
          let response = await CallWithAuth("GET", "/me");
          // const response = await ME();
          console.log("response", response)
          if (response.data.status === 200) {
            dispatch({
              type: 'INITIALISE',
              payload: {
                isAuthenticated: true,
                user: response.data.data
              }
            });

            // if (response.data.data && !response.data.data.isPasswordModified) {
            //   // console.log("Hi5", response.data.user_data.user_step)
            //   history.push('/reset-pass')
            // }
          } else {
            Logout()
            window.location.href = "/home";
            ToastHot.error("Something went wrong, Server error");
          }
        } else {
          
          // 
          if(!publicPaths.includes(pageFullUrl)){
            router.push(LOGIN_LINK);
          }
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null,
            }
          });
        }
      // } catch (err) {
      //   ToastHot.error("Something went wrong, Server error");
      //   dispatch({
      //     type: 'INITIALISE',
      //     payload: {
      //       isAuthenticated: false,
      //       user: null
      //     }
      //   });
      // }


    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <LoadingScreen />;
  }
  // function StatusBar() {
  //   const isOnline = useOnlineStatus();
  //   return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
  // }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Login,
        Logout,
        updateUser,
        // RegisterUser,
        // setGlobalSocketConnection,
        // setChatMessageCount,
        // setZLSAiConsent
      }}
    >
      {/* <StatusBar /> */}
      {/* <NetworkDetector /> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
