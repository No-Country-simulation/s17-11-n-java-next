'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import TopbarGeneral from '@/components/containers/topbar-general';
import useProfile from '@/hooks/useProfile';
import { UpdateProfileFetch } from '@/services/UpdateProfileFetch';
import useProvincias from "@/hooks/useProvincias";
import useDepartaments from '@/hooks/useDepartaments';
import { useAuthStore } from '@/store/auth';
import type { DataUpdateProfile } from '@/lib/request'

const ProfileUpdateForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null); // Estado para la imagen de perfil
    const { data: user, isLoading: isLoadingUser } = useProfile();
    const dniFrontInputRef = useRef<HTMLInputElement | null>(null);
    const dniBackInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(0);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number | null>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: provincias, isLoading: isLoadingProvincias } = useProvincias();
    const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(selectedProvinciaId || 0);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DataUpdateProfile>({
        defaultValues: {
            name: user?.name,
            lastname: user?.lastname,
        },
    });

    const onSubmit = async (data: DataUpdateProfile) => {
        const formData = new FormData();

        if (data.name) formData.append("name", data.name);
        if (data.lastname) formData.append("lastname", data.lastname);
        //if (data.email) formData.append("email", data.email);
        if (data.phone) formData.append("phone", data.phone);
        if (data.departamento_id) formData.append("departament_id", data.departamento_id.toString());
        //if (data.password) formData.append("password", data.password);

        if (data.profileImage) formData.append("profileImage", data.profileImage);
        if (data.dniFrontImage) formData.append("dniFrontImage", data.dniFrontImage);
        if (data.dniBackImage) formData.append("dniBackImage", data.dniBackImage);

        try {
            const res = await UpdateProfileFetch(formData);
            if (res.success) {
                console.log('Actualizado con éxito');
            }
        } catch (error) {
            setErrorMessage('Error al actualizar el perfil. Inténtalo nuevamente.');
            console.log(error);
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //setValue('province', Number(e.target.value));
        setSelectedProvinciaId(Number(e.target.value));
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('departamento_id', Number(e.target.value));
        setSelectedDepartamentoId(Number(e.target.value));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'dniFrontImage' | 'dniBackImage') => {
        if (e.target.files?.[0]) {
            setValue(type, e.target.files[0]);
        }
    };

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleFrontImageClick = () => {
        dniFrontInputRef.current?.click();
    };

    const handleBackImageClick = () => {
        dniBackInputRef.current?.click();
    };

    return (
        <>
            <TopbarGeneral />
            <div className="space-y-8 mt-5 mb-28 w-full max-w-[1020px] mx-auto px-4 p-2 m-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="font-bold text-[36px] mx-auto">Mis datos personales</h2>
                <p className="text-[24px]">
                    Desde esta pantalla puedes cambiar tus datos de usuario en Retrueque.
                </p>
                
                <Card className="w-full max-w-[1020px] mx-auto rounded-3xl lg:rounded-3xl p-8 gap-x-8 gap-y-6 flex justify-center flex-col md:flex-row bg-[#74ACDF] border-none">
                    <div className="relative">
                        <Image
                            src={profileImage ? URL.createObjectURL(profileImage) : user?.profileImageUrl || 'https://placehold.co/290x290/png'}
                            alt={user?.name || 'Usuario'}
                            className="rounded-full mx-auto w-36 h-36 lg:w-72 lg:h-72"
                            width={290}
                            height={290}
                            priority
                        />

                    </div>
                    <div className="flex justify-center items-center flex-col md:flex-row gap-6">
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImageChange}
                        />
                        <Button
                            type="button"
                            onClick={() => document.getElementById('profileImage')?.click()}
                            className=" bottom-0 right-0 bg-[#F7C036] hover:bg-[#F7C036] text-black font-bold p-4 m-2"
                        >
                            <Camera className="mr-2" /> Agregar foto de perfil
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white border-2 bg-transparent font-bold px-10 py-6 drop-shadow-md"
                        >
                            Borrar foto de perfil
                        </Button>
                    </div>
                </Card>

                <Card className="mt-10 w-full max-w-[1020px] mx-auto rounded-3xl bg-[#74ACDF] px-4 lg:px-24 py-2 lg:py-14">
                    <CardHeader>
                        <CardTitle className="text-[24px] font-bold text-white">Actualizar perfil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nameUser" className="text-white font-semibold text-[1.2rem]">
                                        Nombre
                                    </Label>
                                    <Input id="nameUser" placeholder={user?.name} {...register('name')} />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="lastnameUser" className="text-white font-semibold text-[1.2rem]">
                                        Apellido
                                    </Label>
                                    <Input id="lastnameUser" placeholder={user?.lastname} {...register('lastname')} />
                                    {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="emailUser" className="text-white font-semibold text-[1.2rem]">
                                        Email
                                    </Label>
                                    <Input id="emailUser" placeholder={user?.email} {...register('email')} />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phoneUser" className="text-white font-semibold text-[1.2rem]">
                                        Teléfono
                                    </Label>
                                    <Input id="phoneUser" placeholder="Escribe tu teléfono" {...register('phone')} />
                                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="provinceUser" className="text-white font-semibold text-[1.2rem] my-4">
                                        Provincia
                                    </Label>
                                    <select
                                        id="provinceUser"
                                        className="flex justify-center items-center flex-col md:flex-row gap-6 w-full p-2 rounded-lg"
                                        value={selectedProvinciaId ?? ''}
                                        onChange={handleProvinceChange}
                                    >
                                        <option value="">Seleccione una provincia</option>
                                        {provincias?.map((provincia) => (
                                            <option key={provincia.id} value={provincia.id}>
                                                {provincia.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="departmentUser" className="text-white font-semibold text-[1.2rem] my-4">
                                        Departamento
                                    </Label>
                                    <select
                                        id="departmentUser"
                                        className="flex justify-center items-center flex-col md:flex-row gap-6 w-full p-2 rounded-lg"
                                        value={selectedDepartamentoId ?? ''}
                                        onChange={handleDepartmentChange}
                                        disabled={!selectedProvinciaId}
                                        
                                    >
                                        <option value="">Seleccione un departamento</option>
                                        {departamentos?.map((departamento) => (
                                            <option key={departamento.id} value={departamento.id}>
                                                {departamento.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.departamento_id && <p className="text-red-500">{errors.departamento_id.message}</p>}
                                </div>
                                <h3 className="text-white font-semibold text-[1.2rem] my-4">
                                    Validar identidad
                                </h3>
                                <p className="text-white text-[18px]">
                                    Para garantizar la seguridad de nuestra
                                    comunidad, es importante validar tu identidad
                                    adjuntando fotos de tu DNI. Es necesario para
                                    que las transacciones sean seguras para vos y
                                    para todos.
                                </p>
                                <p className="m-2 justify-center text-white font-semibold text-[1.2rem]">
                                    Imagen del DNI (Frontal)
                                </p>
                                <div className="mx-auto  bg-white flex flex-col w-full items-center px-6 py-5 rounded-lg font-semibold">
                                    <Label className="text-white font-semibold text-[1.2rem]" htmlFor="dniFrontImage">
                                        Imagen del DNI (Frontal)
                                    </Label>
                                    <Camera className="w-16 h-[71px] mx-auto" />
                                    <Button
                                        type="button"
                                        onClick={handleFrontImageClick}
                                        className=" text-black font-bold"
                                    >
                                        <Camera className="mr-2" /> Subir imagen frontal
                                    </Button>
                                    <input
                                        type="file"
                                        id="dniFrontImage"
                                        ref={dniFrontInputRef}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'dniFrontImage')}
                                    />
                                </div>
                                <p className="m-2 justify-center text-white font-semibold text-[1.2rem]" >
                                    Imagen del DNI (Reverso)
                                </p>
                                <div className=" mx-auto  bg-white flex flex-col w-full items-center px-6 py-5 rounded-lg font-semibold">
                                    <Label className="text-white font-semibold text-[1.2rem]" htmlFor="dniBackImage">
                                        Imagen del DNI (Reverso)
                                    </Label>
                                    <Camera className="w-16 h-[71px] mx-auto" />
                                    <Button
                                        type="button"
                                        onClick={handleBackImageClick}
                                        className=" text-black font-bold"
                                    >
                                        <Camera className="mr-2" /> Subir imagen reversa
                                    </Button>
                                    <input
                                        type="file"
                                        id="dniBackImage"
                                        ref={dniBackInputRef}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'dniBackImage')}
                                    />
                                </div>
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F7C036] hover:bg-[#F7C036]'} font-bold`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Actualizando...' : 'Actualizar'}
                                    </Button>
                                </div>
                            </div>
                        
                    </CardContent>
                </Card>
                </form>
            </div>
        </>
    );
};

export default ProfileUpdateForm;
