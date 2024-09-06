"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
const formSchema = z
  .object({
    name: z.string().min(2, "El nombre es obligatorio").max(50),
    email: z.string().email("Introduzca un email válido").min(5).max(50),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .max(50, {
        message: "La contraseña debe tener menos de 50 caracteres",
      })
      .regex(/(?=.*[a-z])/, "La contraseña debe contener al menos una letra minúscula")
      .regex(/(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
      .regex(/(?=.*\d)/, "La contraseña debe contener al menos un número")
      .regex(/(?=.*[@#$%^&+=])/,"La contraseña debe contener al menos un carácter especial (@, #, $, etc.)"),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña debe tener al menos 8 caracteres")
      .max(50, "La confirmación de contraseña debe tener menos de 50 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex flex-col items-center drop-shadow-lg shadow-accent-foreground my-14">
      <Form {...form}>
        <h1 className="text-display-small-bold font-bold text-center bg-white p-2 mb-5 rounded-md drop-shadow-lg">
          ¡BIENVENIDOS A NUESTRA COMUNIDAD!
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#74ACDF] px-28 py-16 rounded-md flex flex-col gap-10 w-[600px] max-w-full"
        >
          <div className="flex flex-col gap-6">
            <FormItem>
              <FormLabel className="text-white">Nombre y apellido</FormLabel>
              <FormControl>
                <Input
                  {...form.register("name")}
                  className="py-5 px-4 placeholder-gray-400"
                  placeholder="Nombre y apellido"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
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
                    type={showPassword.password ? "text" : "password"}
                    {...form.register("password")}
                    className="py-5 px-4 placeholder-gray-400"
                    placeholder="********"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 mr-5"
                  onClick={() => togglePasswordVisibility("password")}
                  aria-label={
                    showPassword.password ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword.password ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
              <p className="text-[12.4px] text-white mt-1 mr-10">
                Utiliza al menos 8 caracteres, combinando letras mayúsculas y
                minúsculas, números y caracteres especiales (como @, #, $).
              </p>
            </FormItem>
            <FormItem>
              <FormLabel className="text-white">Repetir contraseña</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    {...form.register("confirmPassword")}
                    className="py-5 px-4 placeholder-gray-400"
                    placeholder="********"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 mr-5"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  aria-label={
                    showPassword.confirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword.confirmPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              <FormMessage>
                {form.formState.errors.confirmPassword?.message}
              </FormMessage>
            </FormItem>
          </div>
          <div className="flex flex-col gap-8 items-center">
            <Button
              type="submit"
              className="bg-[#F6B40E] hover:bg-[#F7C036] drop-shadow-xl shadow-sm font-bold px-8 py-6"
            >
              Registrarse
            </Button>
            <Button
              type="button"
              className="bg-[#FAFAFA] hover:bg-white drop-shadow-xl text-[14px] shadow-sm font-bold py-6 px-6"
            >
              REGISTRARSE CON GOOGLE
              <FcGoogle size={24} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
