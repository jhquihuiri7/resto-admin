"use client"
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTableRestaurants } from "@/components/data_table_restaurants";
import { DataTableUsers } from "@/components/data_table_users";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { fetchUserData } from "@/utils/requests";
import { UserData } from "@/constants/user";
import { Dashboard } from "@/components/dashboard";
import { useRouter } from "next/navigation";


type VariableType = "opcion1" | "opcion2" | "opcion3" | "opcion4";

const Componente1 = () => <Dashboard/>;
const Componente2 = () => <DataTableRestaurants/>;
const Componente3 = () => <DataTableUsers/>;
const Componente4 = () => <DataTableUsers/>;



const componenteMapa: Record<VariableType, React.FC> = {
  opcion1: Componente1,
  opcion2: Componente2,
  opcion3: Componente3,
  opcion4: Componente4
};

const MapaComponentes = ({ variable }: { variable: VariableType }) => {
  const ComponenteSeleccionado = componenteMapa[variable] || Componente1;
  return <ComponenteSeleccionado />;
};


const defaultUserData: UserData = {
  id:'',
  restaurant_id: '',
  last_name: '',
  first_name: '',
  role: "",
  email: '',
  password: ''
};


export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("Panel Principal");

  
useEffect(() => {

  const fetchData = async () => {
    const userData: UserData | undefined | null = await fetchUserData();
    
    // Asegúrate de que userData no sea undefined
    if (userData) {
      setData(userData); // Solo guarda si userData no es undefined
    } else {
      setData(null); // O puedes manejarlo de otra forma, si lo prefieres
      router.push("/")
    }
  };

  fetchData();
}, [router]);

  // Añade un useEffect para observar cuando `data` cambie
  useEffect(() => {
    console.log("Data has been updated:", data);
  }, [data]);
  
  const opcionesValidas: Record<string, VariableType> = {
    "Panel Principal": "opcion1",
    "Restaurantes": "opcion2",
    "Usuarios": "opcion3",
    "Equipo": "opcion4",
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar data={data || defaultUserData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <h1>{selectedItem}</h1>
              <MapaComponentes variable={opcionesValidas[selectedItem]}/>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
