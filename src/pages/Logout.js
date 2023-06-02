import { useEffect } from "react";

export const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    redirect();
  }, []);

  const redirect = () => {
    window.location.replace("/");
  };

  return <></>;
};
