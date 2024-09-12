"use client";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormSchemaFilters } from '@/lib/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
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
import CardServicio from '@/components/cards/CardServicio'
import useProvincias from "@/hooks/useProvincias"; // Hook de useProvincias tanstackQuery
import useCategorys from '@/hooks/useCategorys'; // Hook de tanstackQuery
import useDepartaments from '@/hooks/useDepartaments'; // Hook de tanstackQuery
import { z } from 'zod';

type FormData = z.infer<typeof FormSchemaFilters>;

// Componente de esqueleto
const SkeletonCard = () => (
    <div className="w-[300px] h-[150px] bg-gray-300 animate-pulse rounded-md" />
);



type FiltersProps = {
    className?: string;
};

type ResultData = {
    id: string;
    imag: string;
    titulo: string;
    descripcion: string;
    ubicacion: string;
};

export default function Filters({ className }: FiltersProps) {
    const router = useRouter()
    const [resultados, setResultados] = useState<ResultData[]>([]);
    const [selectedServicio, setSelectedServicio] = useState<string>("");
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    //
    const { data: provincias, isLoading: isLoadingProvincias, error: errorProvincias } = useProvincias();
    const { data: servicios, isLoading: isLoadingServicios, error: errorServicios } = useCategorys();
    const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(selectedProvinciaId || 0);

    //

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchemaFilters),
        defaultValues: {
            provincia: '',
            servicio: '',
            departamento: '',
        }
    });

    const fetchResultados = (data: FormData) => {
        setLoading(true);
        console.log("Data:", data);
    };

    const onSubmit = (data: FormData) => {
        fetchResultados(data);
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
        <div className="justify-center mb-20 px-4 sm:px-6 lg:px-8">
            <div className={`rounded-[8px] flex flex-wrap w-full max-w-[1022px] h-auto bg-[#F7C036] justify-center items-center ${className}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap justify-center gap-4 p-4">
                        <FormField
                            name="provincia"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-[200px]">
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

                        <FormField
                            name="departamento"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-[200px]">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Ciudad" />
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

                        <FormField
                            name="servicio"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-[200px]">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.isArray(servicios) ? (
                                                    servicios.map((servicio) => (
                                                        <SelectItem key={servicio.id} value={servicio.name}>
                                                            {servicio.name}
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

                        <Button type="submit" variant="default" className='text-black text-base font-bold leading-normal tracking-tight h-[50px] shadow-md w-full sm:w-[149px] py-[13px] px-[18px] bg-[#74acdf]'>
                            Buscar
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='justify-center items-center'>
                <CardServicio dataResultados={resultados} servicio={selectedServicio} />
            </div>
        </div>
    );
}