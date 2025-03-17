"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data2 = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Panel Principal",
          url: "#",
        }
      ],
    },
    {
      title: "Menu",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Administrar Menu",
          url: "#",
        }
      ],
    },
    {
      title: "Ordenes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Mesas",
          url: "#",
        },
        {
          title: "Pedidos",
          url: "#",
        }
      ],
    },
  ]
}

type SubscriptionDatetime = {
  seconds: number;
  nanoseconds: number;
};

type UserData = {
  company: string;
  suscription_expire_datetime: SubscriptionDatetime;
  last_name: string;
  created_datetime: SubscriptionDatetime;
  last_login_datetime: SubscriptionDatetime;
  suscription: number;
  first_name: string;
  rol: number;
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: UserData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const [email, setEmail] = React.useState<string | null>(null);

  // Ensure this runs only on the client
  React.useEffect(() => {
    const emailFromStorage = localStorage.getItem("trackerEmail");
    setEmail(emailFromStorage);
  }, []);

  const user = {
    name: data.first_name + " " + data.last_name,
    email: (email) ? email : "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{data.company}</span>
                  <span className="truncate text-xs">Restaurante</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data2.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
