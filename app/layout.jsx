// "use client";
import "../app/ui/global.scss";
import { inter, poppins } from "../app/ui/fonts";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import LoadingScreen from "../layout/MainLayout/LoadingScreen";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "../contexts/JWTAuthContext";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// // owl carousel
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// // jquery
// import jQuery from 'jquery';


export const metadata = {
  title: "Nextjs-Auth",

  // description: "Welcome to Next.js",
};

export default function RootLayout({
  children,
}
) {
  // const { isAuthenticated } = useAuth();
  return (
    <html lang="en">
      <body className={`${poppins.className}`} fallback={<LoadingScreen />}>
        <AuthProvider>
          <GlobalStoreProvider>
            <ReactQueryProvider>
              <main className="overflow-x-hidden">
                {/* <Sidebar />
                <Header /> */}
                <>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                  <link
                    rel="stylesheet"
                    type="text/css"
                    charset="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
                  />
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
                  />
                </>
                {children}
                {/* <Suspense >{children}</Suspense> */}
                {/* <Toaster /> */}
                <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                  toastOptions={{
                    // Define default options
                    className: 'hot-toast-opening-class',
                    duration: 3000,
                    // style: {
                    //   background: '#363636',
                    //   color: '#fff',
                    // },
                    // Default options for specific types
                    success: {
                      duration: 3000,
                      // theme: {
                      //   primary: 'green',
                      //   secondary: 'black',
                      // },
                    },
                  }}
                />
              </main>
            </ReactQueryProvider>
          </GlobalStoreProvider>
        </AuthProvider>
      </body>

    </html>
  );
}
