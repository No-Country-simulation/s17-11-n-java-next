import React from "react";
import { Star, Edit, Trash2, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeaderProfile from "./HeaderProfile";
import FooterProfile from "./FooterProfile";
const user = {
  name: "John Doe",
  avatar: "https://placehold.co/64x64/png",
  rating: 4,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactus fueris, quocumque loco fueris, quocumque tempore fueris, debes esse in officio.",
};
const comments = [
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const products = [
  {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const requests = [
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const UserProfile = ({}) => {
  const authUser = true;
  return (
    <section className="user-profile w-full max-w-[1232px] mx-auto my-10">
      <HeaderProfile user={user} products={products} authUser={authUser} />
      <FooterProfile
        comments={comments}
        requests={requests}
        authUser={authUser}
      />
    </section>
  );
};

export default UserProfile;
