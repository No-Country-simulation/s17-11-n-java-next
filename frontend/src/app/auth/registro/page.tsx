import React from "react";
import RegisterForm from "@/components/froms/RegisterForm";
import TopbarGeneral from '@/components/containers/topbar-general'

const RegisterPage = () => {
  return (
    <>
    <TopbarGeneral/>
    <section className="flex items-center justify-center min-h-screen bg-[url('/img/bg_lr.png')] bg-cover bg-center">
      <RegisterForm />
    </section></>
  );
};

export default RegisterPage;
