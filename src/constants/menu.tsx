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
  private number: number;
  private navMenu: Menu[];
  private validNumbersMap: Record<string, number[]>;

  constructor(number: number) {
    this.number = number;
    this.navMenu = [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "Panel Principal", url: "#" },
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
    this.validNumbersMap = {
      "Panel Principal": [0, 2, 5],
      "Usuarios": [0,1, 3, 4],
      "Equipo": [2, 5, 6],
      "Administrar Menu": [0, 3, 6],
      "Mesas": [1, 4, 5],
      "Pedidos": [0, 2, 4]
    };
    this.updateShowStatus();
  }

  private updateShowStatus(): void {
    this.navMenu.forEach(menu => {
      if (menu.items) {
        menu.items.forEach(item => {
          item.show = this.validNumbersMap[item.title]?.includes(this.number) || false;
        });
      }
    });
  }

  getNavMenu(): Menu[] {
    return this.navMenu;
  }
}
