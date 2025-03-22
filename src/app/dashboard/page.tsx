"use client"
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/data_table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { fetchUserData } from "@/utils/requests";
import { UserData } from "@/constants/user";

const defaultUserData: UserData = {
  company: '',
  suscription_expire_datetime: { seconds: 0, nanoseconds: 0 },
  last_name: '',
  created_datetime: { seconds: 0, nanoseconds: 0 },
  last_login_datetime: { seconds: 0, nanoseconds: 0 },
  suscription: 0,
  first_name: '',
  role: 0,
};

export default function Page() {
  const [data, setData] = useState<UserData | null>(null);
const [selectedItem, setSelectedItem] = useState<string>("Panel Principal");

useEffect(() => {
  const fetchData = async () => {
    const userData: UserData | undefined = await fetchUserData();
    
    // Asegúrate de que userData no sea undefined
    if (userData) {
      setData(userData); // Solo guarda si userData no es undefined
    } else {
      setData(null); // O puedes manejarlo de otra forma, si lo prefieres
    }
  };

  fetchData();
}, []);

  // Añade un useEffect para observar cuando `data` cambie
  useEffect(() => {
    console.log("Data has been updated:", data);
  }, [data]);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar data={data || defaultUserData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <h1>{selectedItem}</h1>
              <DataTable />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
