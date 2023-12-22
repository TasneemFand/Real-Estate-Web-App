import { LayoutGrid, Building2 } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    Icon: <LayoutGrid className="h-6 w-6" />,
    path: "/",
  },
  {
    title: "Property",
    Icon: <Building2 className="h-6 w-6" />,
    path: "/property",
  },
  // {
  //   title: "Agent",
  //   Icon: <Users className="h-6 w-6" />,
  //   path: "/agent",
  // },
  // {
  //   title: "Review",
  //   Icon: <Star className="h-6 w-6" />,
  //   path: "/review",
  // },
  // {
  //   title: "Message",
  //   Icon: <MessageSquare className="h-6 w-6" />,
  //   path: "/message",
  // },
  // {
  //   title: "myProfile",
  //   Icon: <CircleUserRound className="h-6 w-6" />,
  //   path: "/myProfile",
  // },
];
