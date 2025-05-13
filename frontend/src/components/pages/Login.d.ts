declare module './Login' {
  import React from 'react';
  interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
  }
  const Login: React.FC<LoginProps>;
  export default Login;
}
