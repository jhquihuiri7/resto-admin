"use client"

import * as React from "react"
import {
  Command,
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
import { NavMenuManager, Menu } from "@/constants/menu"
import { UserData } from "@/constants/user"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: UserData;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export function AppSidebar({ data, selectedItem, setSelectedItem, ...props }: AppSidebarProps) {
  const [email, setEmail] = React.useState<string | null>(null);
  const [navMain, setNavMain] = React.useState<Menu[]>([]);

  React.useEffect(() => {
    const emailFromStorage = localStorage.getItem("trackerEmail");
    setEmail(emailFromStorage);
    const menuManager = new NavMenuManager(data.role);
    setNavMain(menuManager.getNavMenu())
  }, [data.role]);

  const user = {
    name: data.first_name + " " + data.last_name,
    email: email ? email : "m@example.com",
    avatar: "/vercel.svg",
  };

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
                  <span className="truncate font-medium">{data.restaurant_id}</span>
                  <span className="truncate text-xs">Restaurante</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
