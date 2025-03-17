"use client"; // Necesario si usas Next.js en modo App Router

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/client';

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
  // Crea una variable de estado para los datos de usuario
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "users"); // Cambié "cities" por "users"
        const q = query(usersRef, where("first_name", "==", "Vianka"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setData(doc.data() as UserData); // Actualiza el estado con los datos obtenidos
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar data={data || defaultUserData} /> {/* Pasa la data como propiedad */}
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
