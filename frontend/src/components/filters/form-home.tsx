'use client'
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { provinciasConDepartamentos } from '@/lib/data/provincias';
import { servicios } from "@/lib/data/servicios";
import { categorias } from "@/lib/data/categorias";
import { Button } from "../ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  provincia: z.string().length(50),
  departamento: z.string().length(50),
  categoria: z.string().length(50),
})

function FormHome() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      provincia: '',
      departamento: '',
      categoria: '',
    }
  })
  return (
    <div className="relative flex flex-row items-center justify-center p-8 bg-secondary rounded-lg container w-[65%] gap-4">
      <Form {...form}>
        <FormField
          name="provincia"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-[200px] shadow-md shadow-gray-600 rounded-lg">
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinciasConDepartamentos.map((prov) => (
                      <SelectItem
                        key={prov.provincia}
                        value={prov.provincia}
                      >
                        {prov.provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="departamento"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-[200px] shadow-md shadow-gray-600 rounded-lg">
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Dpto" />
                  </SelectTrigger>
                  <SelectContent>
                    {form.watch("provincia") &&
                      provinciasConDepartamentos
                        .find(
                          (prov) =>
                            prov.provincia === form.watch("provincia")
                        )
                        ?.departamentos.map((depto) => (
                          <SelectItem key={depto} value={depto}>
                            {depto}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoria"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-[200px] shadow-md shadow-gray-600 rounded-lg">
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          className="text-black text-base font-bold leading-normal tracking-tight bg-primary shadow-md shadow-gray-600 rounded-lg"
        >
          Buscar
        </Button>
      </Form>
    </div>
  );
}

export default FormHome;
