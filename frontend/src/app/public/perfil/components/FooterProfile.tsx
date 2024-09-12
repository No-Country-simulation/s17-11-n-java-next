'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ListUserCards from './ListUserCards'
interface FooterProfileProps {
    comments: { name: string; content: string }[]
    requests: { name: string; content: string }[]
    authUser: boolean
}
const FooterProfile: React.FC<FooterProfileProps> = ({
    comments,
    requests,
    authUser
}) => {
    const [activeTab, setActiveTab] = useState('comentarios')
    const [dataActiveTab, setDataActiveTab] = useState(requests)
    useEffect(() => {
        if (activeTab === 'solicitudes') {
            setDataActiveTab(requests)
        } else {
            setDataActiveTab(comments)
        }
    }, [activeTab, comments, requests])

    return (
        <div className="mt-8">
            <div className="flex border-b">
                {authUser && (
                    <>
                        <Button
                            variant="ghost"
                            className={`hover:bg-[#F7C036] font-bold flex-1 rounded-none ${
                                activeTab === 'solicitudes'
                                    ? 'bg-[#F7C036]'
                                    : 'bg-[#D2D2D2]'
                            }`}
                            onClick={() => setActiveTab('solicitudes')}
                        >
                            SOLICITUDES ENVIADAS
                        </Button>
                        <Button
                            variant="ghost"
                            className={`hover:bg-[#F7C036] font-bold flex-1 rounded-none ${
                                activeTab === 'solicitudes'
                                    ? 'bg-[#F7C036]'
                                    : 'bg-[#D2D2D2]'
                            }`}
                            onClick={() => setActiveTab('solicitudes')}
                        >
                            SOLICITUDES RECIBIDAS
                        </Button>
                    </>
                )}
                <Button
                    variant="ghost"
                    className={`hover:bg-[#F7C036] font-bold flex-1 rounded-none ${
                        activeTab === 'comentarios'
                            ? 'bg-[#F7C036]'
                            : 'bg-[#D2D2D2]'
                    }`}
                    onClick={() => setActiveTab('comentarios')}
                >
                    COMENTARIOS
                </Button>
            </div>
            <ListUserCards dataActiveTab={dataActiveTab} />
        </div>
    )
}

export default FooterProfile
