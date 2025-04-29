declare module './Login.jsx' {
  import * as React from 'react';

  interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
  }

  const Login: React.FC<LoginProps>;
  export default Login;
}
