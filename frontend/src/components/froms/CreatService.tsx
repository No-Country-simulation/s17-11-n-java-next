'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import { CreateServices } from '@/services/CreateService';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import useProvincias from "@/hooks/useProvincias";
import useCategorys from '@/hooks/useCategorys';
import useDepartaments from '@/hooks/useDepartaments';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {SuccessDialog} from '@/components/dialog/Success-dialog'

const serviceSchema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    rules: z.string().min(10, 'Las reglas deben tener al menos 10 caracteres'),
    selectedFile: z.instanceof(File).refine(
        (file) => file.size <= 2 * 1024 * 1024, // Máx. 2MB
        { message: 'La imagen debe ser menor a 2MB' }
    ).refine(
        (file) => ['image/jpeg', 'image/png'].includes(file.type),
        { message: 'El formato de la imagen debe ser JPEG o PNG' }
    ),
    selectedCategoryId: z.number().min(1, 'Debes seleccionar una categoría'),
});

const daysOfWeek = [
    { name: 'D', number: 0 },
    { name: 'L', number: 1 },
    { name: 'M', number: 2 },
    { name: 'M', number: 3 },
    { name: 'J', number: 4 },
    { name: 'V', number: 5 },
    { name: 'S', number: 6 }
];

const timeOfDay = [
    { name: 'Mañana', number: 1 },
    { name: 'Tarde', number: 2 },
    { name: 'Noche', number: 3 }
];

export default function CreateService() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [days, setDays] = useState<number[]>([]);
    const [shiftTime, setShiftTime] = useState<number[]>([]);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState('');
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const { data: provincias, isLoading: isLoadingProvincias } = useProvincias();
    const { data: categories, isLoading: isLoadingCategories } = useCategorys();
    const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(selectedProvinciaId ?? 0);

    const handleDaySelection = (dayNumber: number) => {
        setDays((prev) =>
            prev.includes(dayNumber) ? prev.filter((d) => d !== dayNumber) : [...prev, dayNumber]
        );
    };

    const handleTimeSelection = (timeNumber: number) => {
        setShiftTime((prev) =>
            prev.includes(timeNumber) ? prev.filter((t) => t !== timeNumber) : [...prev, timeNumber]
        );
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validar datos usando Zod
        const formData = {
            title,
            description,
            rules,
            selectedFile,
            selectedCategoryId: selectedCategoryId || 0,
        };

        const result = serviceSchema.safeParse(formData);

        if (!result.success) {
            // Muestra errores de validación
            setValidationErrors(result.error.errors.map((err) => err.message));
            return;
        }
        setValidationErrors([]);
        try {
            const response = await CreateServices(
                title,
                description,
                rules,
                selectedFile!,
                selectedCategoryId?.toString() ?? '',
                days.map((day) => day.toString()),
                shiftTime.map((time) => time.toString())
            );
            if (response.success == true) {
                setIsDialogOpen(true);
            }
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8 mt-5 mb-20 w-full max-w-[1232px] mx-auto px-4">
                {/* Contenido del formulario */}
                <h2 className="font-bold text-[36px] mx-auto max-w-3xl">Publica tu anuncio</h2>
                <Card className="w-full max-w-3xl mx-auto rounded-3xl p-8 flex justify-center bg-[#F7C036] border-none">
                    {/* Botón para seleccionar imagen */}
                    <div className="w-fit bg-[#F7C036] flex flex-col items-center px-6 py-2 rounded-lg font-semibold">
                        <Card className="w-full max-w-3xl mx-auto rounded-3xl p-8 flex justify-center bg-[#F7C036] border-none">
                            {/* Botón para seleccionar imagen */}
                            <div className="w-fit bg-white flex flex-col items-center px-6 py-2 rounded-lg font-semibold">
                                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                                    <Camera className="w-16 h-16 mx-auto" />
                                    <h3>Añadir foto</h3>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setSelectedFile(e.target.files[0]);
                                        }
                                    }}
                                    className="hidden"
                                />
                                {/* {selectedFile && (
                                    <div className="mt-2 bg-[#F7C036]">
                                        <Image
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Selected file"
                                            width={96}
                                            height={96}
                                            className="object-cover rounded-lg bg-[#F7C036]"
                                        />
                                    </div>
                                )} */}

                            </div>
                        </Card>
                        {selectedFile && (
                            <div className="mt-2 bg-[#F7C036]">
                                <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected file"
                                    width={96}
                                    height={96}
                                    className="object-cover rounded-lg bg-[#F7C036]"
                                />
                            </div>
                        )}
                    </div>
                </Card>
                <Card className="w-full max-w-3xl mx-auto rounded-3xl bg-[#74ACDF] px-4 lg:px-24 py-2 lg:py-14">
                    <div className="space-y-4">
                        {/* Input para Título */}
                        <div>
                            <Label htmlFor="title" className="block text-lg font-semibold">Título</Label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título del anuncio"
                                className="w-full p-2 mt-1 border rounded"
                            />
                        </div>

                        {/* Input para Descripción */}
                        <div>
                            <Label htmlFor="description" className="block text-lg font-semibold">Descripción</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Explica en qué consiste tu servicio o el estado del producto"
                                className="w-full p-2 mt-1 border rounded h-32"
                            />
                        </div>

                        {/* Input para Reglas */}
                        <div>
                            <Label htmlFor="rules" className="block text-lg font-semibold">Intereses de intercambio</Label>
                            <textarea
                                id="rules"
                                value={rules}
                                onChange={(e) => setRules(e.target.value)}
                                placeholder="Explica qué pides a cambio por tu servicio o producto"
                                className="w-full p-2 mt-1 border rounded h-32"
                            />
                        </div>

                        {/* Select para Categorías */}
                        <div>
                            <Label htmlFor="category" className="block text-lg font-semibold">Categoría</Label>
                            <select
                                id="category"
                                value={selectedCategoryId?.toString() ?? ''}
                                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                                className="w-full p-2 mt-1 border rounded"
                            >
                                <option value="">Selecciona una categoría</option>
                                {isLoadingCategories ? (
                                    <option value="" disabled>
                                        Cargando categorías...
                                    </option>
                                ) : (
                                    categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Select para Provincias */}
                        <div>
                            <Label htmlFor="provincia" className="block text-lg font-semibold">Provincia</Label>
                            <select
                                id="provincia"
                                value={selectedProvinciaId?.toString() ?? ''}
                                onChange={(e) => setSelectedProvinciaId(Number(e.target.value))}
                                className="w-full p-2 mt-1 border rounded"
                            >
                                <option value="">Selecciona una provincia</option>
                                {isLoadingProvincias ? (
                                    <option value="" disabled>
                                        Cargando provincias...
                                    </option>
                                ) : (
                                    provincias?.map((provincia) => (
                                        <option key={provincia.id} value={provincia.id}>
                                            {provincia.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Select para Departamentos */}
                        <div>
                            <Label htmlFor="departamento" className="block text-lg font-semibold">Departamento</Label>
                            <select
                                id="departamento"
                                value={selectedDepartamentoId?.toString() ?? ''}
                                onChange={(e) => setSelectedDepartamentoId(Number(e.target.value))}
                                className="w-full p-2 mt-1 border rounded"
                            >
                                <option value="">Selecciona un departamento</option>
                                {isLoadingDepartamentos ? (
                                    <option value="" disabled>
                                        Cargando departamentos...
                                    </option>
                                ) : (
                                    departamentos?.map((departamento) => (
                                        <option key={departamento.id} value={departamento.id}>
                                            {departamento.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Checkbox para Días de la Semana */}
                        <div>
                            <Label className="text-white font-semibold text-[1.2rem] my-4">Días de la semana</Label>
                            <p className="text-sm text-white mb-2">
                                Marca los días y horarios que tenés
                                disponible para realizar el trueque
                            </p>
                            <div className="flex justify-between mb-2">
                                {daysOfWeek.map((day) => (
                                    <div
                                        key={day.number}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <Label
                                            htmlFor={`day-${day.number}`}
                                            className="ml-1 bg-[#F7C036] text-center font-bold aspect-square p-4 rounded-full"
                                        >
                                            {day.name}
                                        </Label>
                                        <Checkbox
                                            id={`day-${day.number}`}
                                            checked={days.includes(day.number)}
                                            onCheckedChange={() => handleDaySelection(day.number)}
                                            className="border-black border-2"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checkbox para Horarios */}
                        <div>
                            <Label className="text-white font-semibold text-[1.2rem] my-4">Horarios de trabajo</Label>
                            <div className="flex justify-center space-x-4 mt-6">
                                {timeOfDay.map((time) => (
                                    <label key={time.number} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={shiftTime.includes(time.number)}
                                            onCheckedChange={() => handleTimeSelection(time.number)}
                                            className="border-black border-2"
                                        />
                                        <span>{time.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <div className="flex justify-center gap-x-6">
                            <Button
                                variant="outline"
                                className="border-white border-2 bg-transparent font-bold px-14 py-6 drop-shadow-md"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#F7C036] hover:bg-[#F7C036] text-black font-bold px-14 py-6 drop-shadow-md"
                            >
                                Publicar
                            </Button>
                        </div>
                    </div>
                </Card>
            </form>
            {validationErrors.length > 0 && (
                <div className="text-red-500">
                    {validationErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <SuccessDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
}
