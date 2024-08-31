"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
interface FooterProfileProps {
  comments: { name: string; content: string }[];
  requests: { name: string; content: string }[];
  authUser: boolean;
}
const FooterProfile: React.FC<FooterProfileProps> = ({
  comments,
  requests,
  authUser,
}) => {
  const [activeTab, setActiveTab] = useState("comentarios");
  const [dataActiveTab, setDataActiveTab] = useState(requests);
  useEffect(() => {
    if (activeTab === "solicitudes") {
      setDataActiveTab(requests);
    } else {
      setDataActiveTab(comments);
    }
  }, [activeTab]);

  return (
    <div className="mt-8">
      <div className="flex border-b">
        {authUser && (
          <Button
            variant="ghost"
            className={`hover:bg-[#F7C036] font-bold flex-1 rounded-none ${
              activeTab === "solicitudes" ? "bg-[#F7C036]" : "bg-[#D2D2D2]"
            }`}
            onClick={() => setActiveTab("solicitudes")}
          >
            SOLICITUDES
          </Button>
        )}
        <Button
          variant="ghost"
          className={`hover:bg-[#F7C036] font-bold flex-1 rounded-none ${
            activeTab === "comentarios" ? "bg-[#F7C036]" : "bg-[#D2D2D2]"
          }`}
          onClick={() => setActiveTab("comentarios")}
        >
          COMENTARIOS
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {dataActiveTab.map((user, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm">{user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs">{user.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FooterProfile;
