'use client'
import React, { useEffect } from 'react'
import HeaderProfile from './components/HeaderProfile'
import FooterProfile from './components/FooterProfile'
import TopbarGeneral from '@/components/containers/topbar-general'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import useProfile from '@/hooks/useProfile'
import useServicesByIdUser from '@/hooks/useServicesByIdUser';


const DataUser = {
    name: 'John Doe',
    avatar: 'https://placehold.co/64x64/png',
    rating: 4,
    description:
        'Perfil sin actualizar'
}

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
const receivedRequests = [
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
const sentRequests = [
    {
        name: 'Luis Mario',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Luis Mario',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Luis Mario',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
]
const UserProfile = ({ }) => {
    const { token, role, id } = useAuthStore();
    const router = useRouter()
    const authUser = true
    const {data:user, isLoading:isLoadingUser, error:errorUser} = useProfile()
    //
    const {
        data: servicesData,
        isLoading: isLoadingServices,
        isError: isErrorServices,
        error: servicesError
    } = useServicesByIdUser(id)
    //
    const products = servicesData?.data.map((service) => ({
        id: service.id as number,
        description: service.description as string,
        imag: service.imgUrl as string,
    })) ?? []; 
    //
    useEffect(() => {
        if (!token) {
            // Si no hay token, redirige al login
            router.push('/auth/login');
        }
    }, [token, router]);

    // Mientras se verifica el token, muestra un loading o nada
    if (!token) {
        return <>
            <TopbarGeneral />
            <div className='w-full h-screen flex justify-center items-center'>
                Cargando ...</div></>;
    }


    return (
        <>
            <TopbarGeneral />
            <section className="user-profile w-full max-w-[1232px] mx-auto m-10 p-10">
                <HeaderProfile
                    user={{
                        name: user?.name || DataUser.name,
                        profileImagUrl: user?.profileImageUrl || DataUser.avatar,
                        rating:  DataUser.rating,
                        ubicacion: user?.provincia && user?.departamento 
                            ? `${user.provincia} , ${user.departamento}` 
                            : "Ubicación Sin Actualizar",
                    }}
                    products={products}
                    authUser={authUser}
                />
                <FooterProfile
                    comments={comments}
                    authUser={authUser}
                    receivedRequests={receivedRequests}
                    sentRequests={sentRequests}
                />
            </section>
        </>
    )
}

export default UserProfile
