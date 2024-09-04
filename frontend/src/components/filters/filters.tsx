"use client";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { provinciasConDepartamentos } from '@/lib/data/provincias';
import { FormSchemaFilters } from '@/lib/types';
import { servicios } from "@/lib/data/servicios";
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

// Componente de esqueleto
const SkeletonCard = () => (
    <div className="w-[300px] h-[150px] bg-gray-300 animate-pulse rounded-md" />
);

type FormData = {
    provincia?: string;
    departamento?: string;
    servicio?: string;
};

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
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchemaFilters),
    });

    const fetchResultados = (data: FormData) => {
        setLoading(true);
        setTimeout(() => {
            const mockResultados: ResultData[] = [
                { id: "1", titulo: data.servicio || "", descripcion: "Ofrecemos este servicio con la mejor calidad y atención. Disponible de lunes a viernes.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "2", titulo: data.servicio || "", descripcion: "Nuestro equipo de profesionales está listo para ayudarte. Servicio disponible de lunes a viernes.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "3", titulo: data.servicio || "", descripcion: "Servicio confiable y eficiente, disponible de lunes a viernes. Contáctanos para más información.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "4", titulo: data.servicio || "", descripcion: "Brindamos atención personalizada de lunes a viernes. Tu satisfacción es nuestra prioridad.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "5", titulo: data.servicio || "", descripcion: "Nuestro servicio está diseñado para cumplir con tus expectativas. Disponible de lunes a viernes.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "6", titulo: data.servicio || "", descripcion: "Te ofrecemos un servicio de calidad, disponible de lunes a viernes. No dudes en contactarnos.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "7", titulo: data.servicio || "", descripcion: "Servicio eficiente y profesional, disponible de lunes a viernes. Estamos aquí para ayudarte.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "8", titulo: data.servicio || "", descripcion: "Calidad y compromiso en nuestro servicio, disponible de lunes a viernes. Contacta con nosotros para más detalles.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "9", titulo: data.servicio || "", descripcion: "Nuestro servicio se adapta a tus necesidades, disponible de lunes a viernes. Contáctanos para más información.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
                { id: "10", titulo: data.servicio || "", descripcion: "Ofrecemos un servicio confiable y profesional, disponible de lunes a viernes. Tu satisfacción es nuestra meta.", ubicacion: data.provincia + ' ' + data.departamento, imag: '/skelets/servicios.png' },
            ];;
            setResultados(mockResultados);
            setLoading(false);
        }, 2000); // Simula 2 segundos de carga
    };

    // Cargar resultados automáticamente al cambiar el formulario
    useEffect(() => {
        const subscription = form.watch((data) => {
            if (data.provincia && data.departamento && data.servicio) {
                fetchResultados(data);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, form.watch]);

    const onSubmit = (data: FormData) => {
        fetchResultados(data);
    };

    return (
        <div className="justify-center mb-20">
            <div className={`rounded-[8px] flex w-[1022px] h-[130px] bg-[#F7C036] justify-center items-center ${className}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex justify-items-center gap-6 items-center">
                            <FormField
                                name="provincia"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-[200px]">
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Provincia" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {provinciasConDepartamentos.map((prov) => (
                                                        <SelectItem key={prov.provincia} value={prov.provincia}>
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
                                    <FormItem className="w-[200px]">
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Ciudad" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {form.watch("provincia") &&
                                                        provinciasConDepartamentos
                                                            .find(
                                                                (prov) => prov.provincia === form.watch("provincia")
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
                                name="servicio"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-[200px]">
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Categoría" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {servicios.map((servicio) => (
                                                        <SelectItem key={servicio} value={servicio}>
                                                            {servicio}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" variant="default" className='text-black text-base font-bold leading-normal tracking-tight h-[50px] shadow-md w-[149px] py-[13px] px-[18px] bg-[#74acdf]'>
                                Buscar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className='justify-center items-center'>
                <CardServicio dataResultados={resultados} servicio={selectedServicio} />
            </div>
        </div>
    );
}
