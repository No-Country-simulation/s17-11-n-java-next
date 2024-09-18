'use client'
import React from 'react'
import HeaderProfile from '../components/HeaderProfile'
import FooterProfile from '../components/FooterProfile'
import TopbarGeneral from '@/components/containers/topbar-general'
import useDataUser from '@/hooks/useDataUser'
import { useAuthStore } from '@/store/auth'
import useServicesByIdUser from '@/hooks/useServicesByIdUser'

// const user = {
//     name: 'John Doe',
//     avatar: 'https://placehold.co/64x64/png',
//     rating: 4,
//     description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactus fueris, quocumque loco fueris, quocumque tempore fueris, debes esse in officio.'
// }
const comments = [
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
]
// const products = [
//     {
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//     },
//     {
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//     },
//     {
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//     }
// ]
const requests = [
    {
        name: 'Mario Diaz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Mario Diaz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Mario Diaz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
]
const UserProfile = ({ params }: { params: { id: number } }) => {
    const id = params.id as number
    const { data, isLoading, isError, error } = useDataUser(id)
    const {
        data: servicesData,
        isLoading: isLoadingServices,
        isError: isErrorServices,
        error: servicesError
    } = useServicesByIdUser(id)
    const {token, role } = useAuthStore()

    //
    const user = {
        name: data?.data.name as string,  // Usando el operador de encadenamiento opcional para evitar errores si `data` o `data.data` son `undefined`
        avatar: data?.data.profileImageUrl || 'https://placehold.co/64x64/png',  // Usa una imagen de marcador de posición si `profileImageUrl` no está disponible
        rating: 4,  // Valor fijo para la calificación, puedes cambiarlo según sea necesario
        description: (data?.data.provincia && data?.data.departamento) ? `${data.data.provincia}, ${data.data.departamento}` : ''  // Combina `provincia` y `departamento` si ambos están disponibles, de lo contrario, usa una cadena vacía
    };

    const products = servicesData?.data.map((service) => ({
        id: service.id as number,
        description: service.description as string,
        imag: service.imgUrl as string,
    })) ?? []; 
    return (
        <>
            <TopbarGeneral />
            <section className="user-profile w-full max-w-[1232px] m-10 p-10">
                <HeaderProfile
                    user={user}
                    products={products}
                    authUser={token}
                />
                <FooterProfile
                    comments={comments}
                    requests={requests}
                    authUser={token}
                />
            </section>
        </>
    )
}

export default UserProfile
