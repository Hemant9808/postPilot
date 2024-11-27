// import React, { useEffect } from 'react';

// const FacebookLogin = () => {
//   useEffect(() => {
//     // Load Facebook SDK
//     (function (d, s, id) {
//       let js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s);
//       js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     })(document, 'script', 'facebook-jssdk');

//     // Initialize Facebook SDK
//     window.fbAsyncInit = function () {
//       window.FB.init({
//         appId: '{your-app-id}', // Replace with your App ID
//         cookie: true,
//         xfbml: true,
//         version: '{api-version}' // e.g., 'v17.0'
//       });
//     };
//   }, []);

//   const checkLoginState = () => {
//     window.FB.getLoginStatus((response) => {
//       statusChangeCallback(response);
//     });
//   };

//   const statusChangeCallback = (response) => {
//     console.log('Login status: ', response);
//     if (response.status === 'connected') {
//       console.log('User is logged in and authenticated:', response.authResponse);
//     } else if (response.status === 'not_authorized') {
//       console.log('User is logged into Facebook but not the app.');
//     } else {
//       console.log('User is not logged into Facebook.');
//     }
//   };

//   const handleLogin = () => {
//     window.FB.login((response) => {
//       checkLoginState();
//     }, { scope: 'public_profile,email' });
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Login with Facebook</button>
//     </div>
//   );
// };

// export default FacebookLogin;



import React, { useEffect } from 'react';

const FacebookLogin: React.FC = () => {
  useEffect(() => {
    // Dynamically load the Facebook SDK
    (function (d: Document, s: string, id: string) {
      let js: HTMLScriptElement | null = d.getElementById(id) as HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (js) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '{your-app-id}', // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: 'v17.0', // Specify your API version
      });
    };
  }, []);

  const checkLoginState = (): void => {
    window.FB.getLoginStatus((response: fb.StatusResponse) => {
      statusChangeCallback(response);
    });
  };

  const statusChangeCallback = (response: fb.StatusResponse): void => {
    console.log('Login status:', response);
    if (response.status === 'connected') {
      console.log('User is logged in and authenticated:', response.authResponse);
    } else if (response.status === 'not_authorized') {
      console.log('User is logged into Facebook but not the app.');
    } else {
      console.log('User is not logged into Facebook.');
    }
  };
  

  const handleLogin = (): void => {
    window.FB.login(
      (response: fb.StatusResponse) => {
        if (response.status === 'connected') {
          // Fetch user details after login
          window.FB.api('/me', { fields: 'id,name,email' }, (userInfo: fb.UserInfoResponse) => {
            console.log('User Info:', userInfo);
          });
        } else {
          console.log('User login failed or was not authorized.');
        }
      },
      { scope: 'public_profile,email' } // Request permissions
    );
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;

// Extend global Window object to include FB
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: typeof FB;
  }
}

// Declare Facebook SDK types
declare namespace fb {
  interface StatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: {
      accessToken: string;
      expiresIn: string;
      signedRequest: string;
      userID: string;
    };
  }

  interface UserInfoResponse {
    id: string;
    name: string;
    email?: string;
  }

  interface FB {
    init(params: {
      appId: string;
      cookie: boolean;
      xfbml: boolean;
      version: string;
    }): void;

    login(callback: (response: StatusResponse) => void, options?: { scope: string }): void;

    getLoginStatus(callback: (response: StatusResponse) => void): void;

    api(
      path: string,
      params: Record<string, string>,
      callback: (response: UserInfoResponse) => void
    ): void;
  }
}
