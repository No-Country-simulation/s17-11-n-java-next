'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ListUserCards from './ListUserCards'
interface FooterProfileProps {
    comments: { name: string; content: string }[]
    authUser: boolean
    receivedRequests: { name: string; content: string }[]
    sentRequests: { name: string; content: string }[]
}
const FooterProfile: React.FC<FooterProfileProps> = ({
    comments,
    authUser,
    receivedRequests,
    sentRequests
}) => {
    const [activeTab, setActiveTab] = useState('comentarios')
    const [dataActiveTab, setDataActiveTab] = useState(comments)
    useEffect(() => {
        if (activeTab === 'comentarios') {
            setDataActiveTab(comments)
        } else if (activeTab === 'sendSolicitudes') {
            setDataActiveTab(sentRequests)
        } else if (activeTab === 'receivedSolicitudes') {
            setDataActiveTab(receivedRequests)
        }
    }, [activeTab, comments, receivedRequests, sentRequests])

    return (
        <div className="mt-8">
            <div className="flex border-b">
                {authUser && (
                    <>
                        <Button
                            variant="ghost"
                            className={`hover:bg-[#F7C036] border border-black font-bold flex-1 rounded-none ${
                                activeTab === 'sendSolicitudes'
                                    ? 'bg-[#F7C036]'
                                    : 'bg-[#D2D2D2]'
                            }`}
                            onClick={() => setActiveTab('sendSolicitudes')}
                        >
                            SOLICITUDES ENVIADAS
                        </Button>
                        <Button
                            variant="ghost"
                            className={`hover:bg-[#F7C036] border border-black font-bold flex-1 rounded-none ${
                                activeTab === 'receivedSolicitudes'
                                    ? 'bg-[#F7C036]'
                                    : 'bg-[#D2D2D2]'
                            }`}
                            onClick={() => setActiveTab('receivedSolicitudes')}
                        >
                            SOLICITUDES RECIBIDAS
                        </Button>
                    </>
                )}
                <Button
                    variant="ghost"
                    className={`hover:bg-[#F7C036] border border-black font-bold flex-1 rounded-none ${
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
