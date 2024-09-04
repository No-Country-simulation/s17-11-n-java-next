"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

// Definición del esquema de validación
const formSchema = z.object({
  email: z.string().email("Introduzca un email válido").min(5).max(50),
  password: z.string().min(8).max(50),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Manejar los valores del formulario
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center drop-shadow-lg shadow-accent-foreground my-14">
      <Form {...form}>
        <h1 className="text-display-small-bold font-bold text-center bg-white p-2 mb-5 rounded-md drop-shadow-lg">
          ¡BIENVENIDO DE NUEVO!
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#74ACDF] px-28 py-16 rounded-md flex flex-col gap-10 w-[600px] max-w-full"
        >
          <div className="flex flex-col gap-6">
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  {...form.register("email")}
                  className="py-5 px-4 placeholder-gray-400"
                  placeholder="example@example.com"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel className="text-white">Contraseña</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    className="py-5 px-4 placeholder-gray-400"
                    placeholder="********"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          </div>
          <div className="flex flex-col gap-8 items-center">
            <Button
              type="submit"
              className="bg-[#F6B40E] hover:bg-[#F7C036] drop-shadow-xl shadow-sm font-bold px-8"
            >
              Iniciar sesión
            </Button>
            <Button
              type="button"
              className="bg-[#FAFAFA] hover:bg-white drop-shadow-xl text-[14px] shadow-sm font-bold py-6 px-6"
            >
              INICIAR SESIÓN CON GOOGLE
              <FcGoogle className="ml-2 size-[35px]" />
            </Button>
            <Link href="/forgot-password">
              <h1 className="text-white font-bold text-[14px]">
                ¿Olvidaste tu contraseña?
              </h1>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
