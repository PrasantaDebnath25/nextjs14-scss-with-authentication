import { LOGIN_LINK, TOKEN_KEY } from "../utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
// import env from "../env.json";
// import { Router, Link } from "../routes";

export function CallWithOutAuth(method, apiUrl, body) {
    let url;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    } else if (process.env.NODE_ENV === "development") {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    } else {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    }
    return new Promise((resolve, reject) => {
        try {
            if (method === "POST") {
                axios
                    .post(url, body)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            <Link href={`${env.PRODUCTION_URL}`}>
                                <a target="_blank"></a>
                            </Link>;
                        } else if (response.status === 404) {
                            resolve(response);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        // resolve(false)
                        resolve(err.response);
                    });
            }
            if (method === "PUT") {
                axios
                    .put(url, body)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            // Router.push("/");
                        } else if (response.status === 404) {
                            resolve(response);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
            if (method === "PATCH") {
                axios
                    .patch(url, body)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 404) {
                            resolve(response);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
            if (method === "GET") {
                axios
                    .get(url, body)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 404) {
                            resolve(response);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(err.response);
                    });
            }
        } catch (err) {
            console.log("Catch block error in CallWithOutAuth method");
            console.log(err);
            reject(err);
        }
    });
}

export function CallWithAuth(method, apiUrl, body = {}) {
    // const router = useRouter();
    const header = {
        headers: { Authorization: `Bearer ${getCookie(TOKEN_KEY)}` },
    };
    let url;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    } else if (process.env.NODE_ENV === "development") {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    } else {
        url = process.env.NEXT_PUBLIC_API_URL + "" + apiUrl;
    }
    //   alert(method, url)
    console.log("gh", header, method, apiUrl, url)
    return new Promise((resolve, reject) => {
        try {
            if (method === "POST") {
                axios
                    .post(url, body, header)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            <Link href={`${process.env.PRODUCTION_URL}`}>
                                <a target="_blank"></a>
                            </Link>;
                        } else if (response.status === 404) {
                            // resolve(response)
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        console.log("Inner catch---", err.response.status);
                        resolve(err.response);
                    });
            }
            if (method === "PUT") {
                axios
                    .put(url, body, header)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            // Router.push("/");
                        } else if (response.status === 404) {
                            // Router.push("/");
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
            if (method === "PATCH") {
                axios
                    .patch(url, body, header)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            router.push(LOGIN_LINK);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
            if (method === "GET") {
                console.log("inside get")
                axios
                    .get(url, header)
                    .then((response) => {
                        console.log("response", response)
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            // router.push(LOGIN_LINK);
                        } else if (response.status === 404) {
                            resolve(response);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            // router.push(LOGIN_LINK);
                            resolve(err.response);
                        } else {
                            resolve(err.response);
                        }
                    });
            }
            if (method === "DELETE") {
                axios
                    .delete(url, header)
                    .then((response) => {
                        if (response.status === 200) {
                            resolve(response);
                        } else if (response.status === 401) {
                            // Router.push("/");
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
        } catch (err) {
            console.log("Catch block error in CallWithAuth method");
            console.log(err);
            reject(err);
        }
    });
}

// export function CallWithAuthentication(method, apiUrl, body = {}) {
//   const header = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
//   };
//   let url;
//   if (process.env.NODE_ENV === "production") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else if (process.env.NODE_ENV === "development") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   }
//   return new Promise((resolve, reject) => {
//     try {
//       if (method === "POST") {
//         axios
//           .post(url, body, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               <Link href={`${env.PRODUCTION_URL}`}>
//                 <a target="_blank"></a>
//               </Link>;
//             } else {
//               resolve(false);
//             }
//           })
//           .catch((err) => {
//             resolve(false);
//           });
//       }
//       if (method === "PUT") {
//         axios
//           .put(url, body, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               Router.push("/");
//             } else {
//               resolve(false);
//             }
//           })
//           .catch((err) => {
//             resolve(false);
//           });
//       }
//       if (method === "PATCH") {
//         axios
//           .patch(url, body, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               Router.push("/");
//             } else {
//               resolve(false);
//             }
//           })
//           .catch((err) => {
//             resolve(false);
//           });
//       }
//       if (method === "GET") {
//         axios
//           .get(url, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               Router.push("/");
//             } else {
//               resolve(false);
//             }
//           })
//           .catch((err) => {
//             if (err.response.status === 401) {
//               localStorage.removeItem("accessToken");
//               Router.push("/");
//             } else {
//               resolve(err.response);
//             }
//           });
//       }
//       if (method === "DELETE") {
//         axios
//           .delete(url, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               Router.push("/");
//             } else {
//               resolve(false);
//             }
//           })
//           .catch((err) => {
//             resolve(false);
//           });
//       }
//     } catch (err) {
//       console.log("Catch block error in CallWithAuth method");
//       console.log(err);
//       reject(err);
//     }
//   });
// }

// export function CallWithAuthPayment(method, apiUrl, body = {}) {
//   const header = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
//   };
//   let url;
//   if (process.env.NODE_ENV === "production") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else if (process.env.NODE_ENV === "development") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   }
//   return new Promise((resolve, reject) => {
//     try {
//       if (method === "GET") {
//         axios
//           .get(url, header)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               <Link href={`${env.PRODUCTION_URL}`}>
//                 <a target="_blank"></a>
//               </Link>;
//             } else if (response.status === 400) {
//               resolve(response);
//             } else {
//               resolve(response);
//             }
//           })
//           .catch((err) => {
//             console.log(err.response);
//             resolve(err.response);
//           });
//       }
//       if (method === "POST") {
//         axios
//           .post(url, body, header)
//           .then((response) => {
//             console.log(response);
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               <Link href={`${env.PRODUCTION_URL}`}>
//                 <a target="_blank"></a>
//               </Link>;
//             } else if (response.status === 400) {
//               resolve(response);
//             } else {
//               resolve(response);
//             }
//           })
//           .catch((err) => {
//             console.log(err.response);
//             resolve(err.response);
//           });
//       }
//     } catch (err) {
//       console.log("Catch block error in CallWithAuth method");
//       console.log(err);
//       reject(err);
//     }
//   });
// }

// export function CallWithUnAuthPayment(method, apiUrl, body = {}) {
//   let url;
//   if (process.env.NODE_ENV === "production") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else if (process.env.NODE_ENV === "development") {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   } else {
//     url = env.REACT_APP_API_URL + "" + apiUrl;
//   }
//   return new Promise((resolve, reject) => {
//     try {
//       if (method === "GET") {
//         axios
//           .get(url)
//           .then((response) => {
//             console.log(response);
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               <Link href={`${env.PRODUCTION_URL}`}>
//                 <a target="_blank"></a>
//               </Link>;
//             } else if (response.status === 400) {
//               resolve(response);
//             } else {
//               resolve(response);
//             }
//           })
//           .catch((err) => {
//             console.log(err.response);
//             resolve(err.response);
//           });
//       }
//       if (method === "POST") {
//         axios
//           .post(url, body)
//           .then((response) => {
//             console.log(response);
//             if (response.status === 200) {
//               resolve(response);
//             } else if (response.status === 401) {
//               <Link href={`${env.PRODUCTION_URL}`}>
//                 <a target="_blank"></a>
//               </Link>;
//             } else if (response.status === 400) {
//               resolve(response);
//             } else {
//               resolve(response);
//             }
//           })
//           .catch((err) => {
//             console.log(err.response);
//             resolve(err.response);
//           });
//       }
//     } catch (err) {
//       console.log("Catch block error in CallWithUnAuth method");
//       console.log(err);
//       reject(err);
//     }
//   });
// }
