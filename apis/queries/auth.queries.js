// import { useMutation } from "@tanstack/react-query";
// import {
//   forgotPassword,
//   login,
//   register,
//   resendOtp,
//   resetPassword,
//   verifyOtp,
// } from "../requests/auth.requests";
// import { APIResponseError } from "@/utils/types/common.types";
// import {
//   IForgotPassword,
//   IForgotPasswordRequest,
//   ILogin,
//   ILoginRequest,
//   IRegister,
//   IRegisterRequest,
//   IResendOtp,
//   IResendOtpRequest,
//   IResetPassword,
//   IResetPasswordRequest,
//   IVerifyOtp,
//   IVerifyOtpRequest,
// } from "@/utils/types/auth.types";

// export const useRegister = (payload) =>
//   useMutation<IRegister, APIResponseError, IRegisterRequest>({
//     mutationFn: async (payload) => {
//       const res = await register(payload);
//       return res.data;
//     },
//     onSuccess: () => {},
//     onError: (err: APIResponseError) => {
//       console.log(err);
//     },
//   });
