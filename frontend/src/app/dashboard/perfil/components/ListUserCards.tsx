import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface ListUserCardsProps {
  dataActiveTab: { name: string; content: string }[];
}

const ListUserCards: React.FC<ListUserCardsProps> = ({ dataActiveTab }) => {
  console.log("ListUserCards");
  return (
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
  );
};

export default ListUserCards;
