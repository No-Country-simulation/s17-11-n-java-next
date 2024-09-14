"use client";
import { useEffect, useState } from "react";
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
} from "@/components/ui/form";
import CardServicios from '@/components/cards/Cardcategory';
import useProvincias from "@/hooks/useProvincias";
import useCategorys from '@/hooks/useCategorys';
import useDepartaments from '@/hooks/useDepartaments';
import { z } from 'zod';

type FormData = z.infer<typeof FormSchemaFilters>;

type FiltersProps = {
    className?: string;
    provincia: string;
    departamento: string;
    category: string;
};

type ResultData = {
    id: string;
    imag: string;
    titulo: string;
    descripcion: string;
    ubicacion: string;
};

export default function Filters({
    className,
    provincia,
    departamento,
    category
}: FiltersProps) {
    const router = useRouter();
    const [resultados, setResultados] = useState<ResultData[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { data: provincias, isLoading: isLoadingProvincias } = useProvincias();
    const { data: categories, isLoading: isLoadingCategories } = useCategorys();
    const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(selectedProvinciaId || 0);

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchemaFilters),
        defaultValues: {
            provincia: provincia || '',
            category: category || '',
            departamento: departamento || ''
        }
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };



    return (
        <div className="justify-center mb-20 px-4 sm:px-6 lg:px-8">
            <div className={`rounded-[8px] flex flex-wrap w-full max-w-[1022px] h-auto bg-[#F7C036] justify-center items-center ${className}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap justify-center gap-4 p-4">
                        <FormField
                            name="provincia"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-[200px] shadow-gray-600 rounded-lg">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedProvinciaId(Number(value));
                                            }}
                                            value={field.value || ""}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Provincia" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.isArray(provincias) ? (
                                                    provincias.map((provincia) => (
                                                        <SelectItem key={provincia.id} value={provincia.id.toString()}>
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
                                <FormItem className="w-full sm:w-[200px] shadow-gray-600 rounded-lg">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedDepartamentoId(Number(value));
                                            }}
                                            value={field.value || ""}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Ciudad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.isArray(departamentos) ? (
                                                    departamentos.map((departamento) => (
                                                        <SelectItem key={departamento.id} value={departamento.id.toString()}>
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
                            name="category"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-[200px] shadow-gray-600 rounded-lg">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedCategoryId(Number(value));
                                            }}
                                            value={field.value || ""}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.isArray(categories) ? (
                                                    categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
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

                        <Button type="submit" variant="default" className='text-black text-base font-bold leading-normal tracking-tight h-[50px] shadow-md w-full sm:w-[149px] py-[13px] px-[18px] bg-[#74acdf]'>
                            Buscar
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='justify-center items-center'>
                {categories ? (
                    <CardServicios 
                        dataResultados={resultados}
                        servicio={category}
                    />
                ) : (
                    <p>Cargando categorías...</p>
                )}
            </div>
        </div>
    );
}
