import { SquareTerminal, Bot, BookOpen } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  show?: boolean;
}

export interface Menu {
  title: string;
  url: string;
  icon: React.ComponentType;
  isActive?: boolean;
  items?: MenuItem[];
}

export class NavMenuManager {
  private role: string;
  private navMenu: Menu[];
  private validRolesMap: Record<string, string[]>;

  constructor(role: string) {
    this.role = role;
    this.navMenu = [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "Panel Principal", url: "#" },
          { title: "Restaurantes", url: "/restaurantes" },
          { title: "Usuarios", url: "#" },
          { title: "Equipo", url: "#" }
        ],
      },
      {
        title: "Menu",
        url: "#",
        icon: Bot,
        items: [
          { title: "Administrar Menu", url: "#" }
        ],
      },
      {
        title: "Ordenes",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Mesas", url: "#" },
          { title: "Pedidos", url: "#" }
        ],
      },
    ];
    this.validRolesMap = {
      "Panel Principal": ["owner"],
      "Restaurantes": ["owner"],
      "Usuarios": ["owner"],
      "Equipo": ["owner"],
      "Administrar Menu": ["owner"],
      "Mesas": ["owner"],
      "Pedidos": ["owner"]
    };
    this.updateShowStatus();
  }

  private updateShowStatus(): void {
    this.navMenu.forEach(menu => {
      if (menu.items) {
        menu.items.forEach(item => {
          item.show = this.validRolesMap[item.title]?.includes(this.role) || false;
        });
      }
    });
  }

  getNavMenu(): Menu[] {
    return this.navMenu;
  }
}
