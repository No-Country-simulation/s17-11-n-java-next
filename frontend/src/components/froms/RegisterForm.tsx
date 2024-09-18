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
import { Fetchregister } from "@/services/RegisterFetch";
import { useRouter } from "next/navigation";
import { DialogRegistroExitoso } from "@/components/dialog/DialogRegistroExitoso";
import { DialogErrorRegistro } from "@/components/dialog/DialogeErrorRegistro";
//

// Definición del esquema de validación
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres")
      .regex(
        /^[a-zA-Z\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    last_name: z
      .string()
      .min(4, "El apellido debe tener al menos 4 caracteres")
      .max(100, "El apellido debe tener menos de 100 caracteres")
      .regex(
        /^[a-zA-Z\s]+$/,
        "El apellido solo puede contener letras y espacios"
      ),
    email: z
      .string()
      .email("Introduzca un email válido")
      .min(10, "El email debe tener al menos 10 caracteres")
      .regex(
        /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/,
        "El email debe ser válido"
      ),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .max(50, {
        message: "La contraseña debe tener menos de 50 caracteres",
      })
      .regex(
        /(?=.*[a-z])/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(
        /(?=.*[A-Z])/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(/(?=.*\d)/, "La contraseña debe contener al menos un número")
      .regex(
        /(?=.*[@#$%^&+=!])/,
        "La contraseña debe contener al menos un carácter especial (@, #, $, %, ^, &, +, =, !)"
      ),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña debe tener al menos 8 caracteres")
      .max(
        50,
        "La confirmación de contraseña debe tener menos de 50 caracteres"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });


const RegisterForm = () => {
  //
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogErrorOpen, setDialogErrorOpen] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await Fetchregister(values); // Función que debes implementar para el registro
      if (resp.success) {
        console.log("Registro exitoso");
        setDialogOpen(true);
        // router.push('/login')
      } else {
        setErrorMessage("Error en el registro. Vuelva a intentarlo.");
        setDialogErrorOpen(true);
      }
    } catch (error) {
      setErrorMessage("Error en el registro. Vuelva a intentarlo.");
      setDialogErrorOpen(true);
    }
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
              <FormLabel className="text-white">Nombre</FormLabel>
              <FormControl>
                <Input
                  {...form.register("name")}
                  className="py-5 px-4 placeholder-gray-400"
                  placeholder="Nombre"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel className="text-white">Apellido</FormLabel>
              <FormControl>
                <Input
                  {...form.register("last_name")}
                  className="py-5 px-4 placeholder-gray-400"
                  placeholder="Apellido"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.last_name?.message}
              </FormMessage>
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
                    showPassword.password
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
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
                    showPassword.confirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
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
      {/* Importar y mostrar el diálogo */}
      <DialogRegistroExitoso open={dialogOpen} onOpenChange={setDialogOpen} />
      <DialogErrorRegistro open={dialogErrorOpen} onOpenChange={setDialogErrorOpen} errorMessage={errorMessage} />
    </div>
  );
};

export default RegisterForm;
