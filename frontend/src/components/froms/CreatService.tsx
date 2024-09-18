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

const daysOfWeek = [
    { name: 'Domingo', number: 0 },
    { name: 'Lunes', number: 1 },
    { name: 'Martes', number: 2 },
    { name: 'Miércoles', number: 3 },
    { name: 'Jueves', number: 4 },
    { name: 'Viernes', number: 5 },
    { name: 'Sábado', number: 6 }
];

const timeOfDay = [
    { name: 'Mañana', number: 1 },
    { name: 'Tarde', number: 2 },
    { name: 'Noche', number: 3 }
];

export default function CreateService() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [days, setDays] = useState<number[]>([]);
    const [shiftTime, setShiftTime] = useState<number[]>([]);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState('');

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
    
        // Validación de longitud
        if (description.length < 10) {
            alert('La descripción debe tener al menos 10 caracteres');
            return;
        }
    
        if (rules.length < 10) {
            alert('Las reglas deben tener al menos 10 caracteres');
            return;
        }
    
        if (!selectedFile) {
            alert('Por favor selecciona una imagen');
            return;
        }
    
        try {
            const response = await CreateServices(
                title,
                description, // Ya validado con al menos 10 caracteres
                rules, // Ya validado con al menos 10 caracteres
                selectedFile,
                selectedCategoryId !== null ? selectedCategoryId.toString() : '', 
                days.map((day) => day.toString()), 
                shiftTime.map((time) => time.toString()) 
            );
            console.log('Respuesta del servidor:', response);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };
    

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8 mt-5 mb-20 w-full max-w-[1232px] mx-auto px-4">
                <h2 className="font-bold text-[36px] mx-auto max-w-3xl">
                    Publica tu anuncio
                </h2>
                <Card className="w-full max-w-3xl mx-auto rounded-3xl p-8 flex justify-center bg-[#F7C036] border-none">
                    <div className="w-fit bg-white flex flex-col items-center px-6 py-2 rounded-lg font-semibold">
                        <div
                            className="relative cursor-pointer"
                            onClick={() => {
                                const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
                                if (fileInput) {
                                    fileInput.click();
                                }
                            }}
                        >
                            <Camera className="w-16 h-16 mx-auto" />
                            <h3>Añadir fotos</h3>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        {selectedFile && (
                            <div className="mt-2">
                                <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected file"
                                    width={96}
                                    height={96}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <p>0/6</p>
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
                            <Label className="block text-lg font-semibold">Días de la semana</Label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {daysOfWeek.map((day) => (
                                    <label key={day.number} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={days.includes(day.number)}
                                            onCheckedChange={() => handleDaySelection(day.number)}
                                        />
                                        <span>{day.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Checkbox para Horarios */}
                        <div>
                            <Label className="block text-lg font-semibold">Horarios de trabajo</Label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {timeOfDay.map((time) => (
                                    <label key={time.number} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={shiftTime.includes(time.number)}
                                            onCheckedChange={() => handleTimeSelection(time.number)}
                                        />
                                        <span>{time.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <Button type="submit" className="w-full mt-4">Publicar</Button>
                    </div>
                </Card>
            </form>
        </>
    );
}
