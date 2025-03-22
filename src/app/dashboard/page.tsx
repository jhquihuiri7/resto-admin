"use client"
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/data_table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


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

const defaultUserData: UserData = {
  company: '',
  suscription_expire_datetime: { seconds: 0, nanoseconds: 0 },
  last_name: '',
  created_datetime: { seconds: 0, nanoseconds: 0 },
  last_login_datetime: { seconds: 0, nanoseconds: 0 },
  suscription: 0,
  first_name: '',
  rol: 0,
};

export default function Page() {
  const [data, setData] = useState<UserData | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("Panel Principal"); // Nuevo estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = localStorage.getItem("trackerEmail") ?? "";
        const storedToken = localStorage.getItem("trackerToken") ?? "";
        console.log(storedToken);
        fetch(`https://resto-admin-backend.uc.r.appspot.com/auth/getUser?id=${storedEmail}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          }
        })
          .then((res) => res.json())
          .then((json) => {
            const convertToSubscriptionDatetime = (dateStr: string): SubscriptionDatetime => {
              const date = new Date(dateStr);
              return {
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: (date.getMilliseconds() * 1000000),
              };
            };

            const userData: UserData = {
              company: json.company,
              suscription_expire_datetime: convertToSubscriptionDatetime(json.suscription_expire_datetime),
              last_name: json.last_name,
              created_datetime: convertToSubscriptionDatetime(json.created_datetime),
              last_login_datetime: convertToSubscriptionDatetime(json.last_login_datetime),
              suscription: json.suscription,
              first_name: json.first_name,
              rol: json.rol,
            };

            console.log('userData before setting:', userData); // Verifica los datos antes de llamar a setData
            setData(userData);
          })
          .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error("Error fetching document:", error);
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
