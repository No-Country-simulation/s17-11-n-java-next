import React from "react";
import LoginForm from "@/components/froms/LoginForm";
import TopbarGeneral from "@/components/containers/topbar-general";

const LoginPage = () => {
  return (
    <>
      <TopbarGeneral />
      <section className="flex items-center justify-center min-h-screen bg-[url('/img/bg_lr.png')] bg-cover bg-center">
        <LoginForm title="!BIENVENIDO DE NUEVO"/>
      </section></>
  );
};

export default LoginPage;
