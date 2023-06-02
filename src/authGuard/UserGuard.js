import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAuthStore from "../zustand/UserAuthStore";

const UserGuard = (Component) => {
  const Auth = (props) => {
    const navigate = useNavigate();
    const getMe = UserAuthStore((state) => state.getMe);
    const isTokenExpired = UserAuthStore((state) => state.isTokenExpired);
    const signOutUser = UserAuthStore((state) => state.signOutUser);

    useEffect(() => {
      const fetchData = async () => {
        if (isTokenExpired()) {
          signOutUser();
          navigate("/");

          return null;
        }
        await getMe();
      };
      fetchData();
    }, [isTokenExpired()]);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default UserGuard;
