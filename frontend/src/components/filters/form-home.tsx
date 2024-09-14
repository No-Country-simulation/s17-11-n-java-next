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
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useProvincias from "@/hooks/useProvincias"; // Hook de provincias
import useCategorys from '@/hooks/useCategorys'; // Hook de categorías
import useDepartaments from '@/hooks/useDepartaments'; // Hook de departamentos
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

const formSchema = z.object({
  provincia: z.string({
    required_error: "La provincia es obligatoria",
  }),
  departamento: z.string({
    required_error: "Seleccione un departamento",
  }),
  category: z.string({
    required_error: "Seleccione una categoría",
  }),
})

function FormHome() {
  const router = useRouter();
  const [selectedServicio, setSelectedServicio] = useState<string>("");
  const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: provincias, isLoading: isLoadingProvincias } = useProvincias();
  const { data: categorys, isLoading: isLoadingCategorys } = useCategorys();
  const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(selectedProvinciaId || 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provincia: '',
      departamento: '',
      category: '',
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const searchParams = new URLSearchParams({
      provincia: data.provincia || '',
      departamento: data.departamento || '',
      category: data.category || ''
    });

    router.push(`/public/searchCategorys?${searchParams.toString()}`);
  };

  useEffect(() => {
    // Verificar si provincias está definido antes de usarlo
    if (provincias) {
        const subscription = form.watch((data) => {
            const selectedProvincia = provincias.find(p => p.name === data.provincia);
            if (selectedProvincia) {
                setSelectedProvinciaId(selectedProvincia.id);
            } else {
                setSelectedProvinciaId(null);
            }
        });

        return () => subscription.unsubscribe();
    }
}, [provincias, form]);

  return (
    <div className="relative flex flex-row items-center justify-center p-10 bg-secondary rounded-lg container w-[65%] gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap justify-center gap-4 p-4">

          {/* Provincia */}
          <FormField
            name="provincia"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[150px] shadow-md shadow-gray-600 rounded-lg">
                <FormControl>
                  <Select onValueChange={(value) => { field.onChange(value); }} value={field.value || ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(provincias) ? (
                        provincias.map((provincia) => (
                          <SelectItem key={provincia.id} value={provincia.name}>
                            {provincia.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="error" disabled>
                          Cargando
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Departamento */}
          <FormField
            name="departamento"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[150px] shadow-md shadow-gray-600 rounded-lg">
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Dpto" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(departamentos) ? (
                        departamentos.map((departamento) => (
                          <SelectItem key={departamento.id} value={departamento.name}>
                            {departamento.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="error" disabled>
                          Cargando
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Categoría */}
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[150px] shadow-md shadow-gray-600 rounded-lg">
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(categorys) ? (
                        categorys.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="error" disabled>
                          Cargando
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Botón de Buscar */}
          <Button
            type="submit"
            variant="default"
            className="text-black text-base font-bold leading-normal tracking-tight bg-primary shadow-md shadow-gray-600 rounded-lg px-14"
          >
            Buscar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormHome;
