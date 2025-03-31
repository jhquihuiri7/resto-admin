import { UserData, SubscriptionDatetime
 } from "@/constants/user";
export const fetchUserData = async () => {
    try {
      const storedEmail = localStorage.getItem("trackerEmail") ?? "";
      const storedToken = localStorage.getItem("trackerToken") ?? "";
  
  
      const response = await fetch(`https://resto-admin-backend.uc.r.appspot.com/auth/getUser?id=${storedEmail}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.statusText}`);
      }
  
      const json = await response.json();
  
      const convertToSubscriptionDatetime = (dateStr: string): SubscriptionDatetime => {
        const date = new Date(dateStr);
        return {
          seconds: Math.floor(date.getTime() / 1000),
          nanoseconds: date.getMilliseconds() * 1000000,
        };
      };
  
      const userData: UserData = {
        id:json.id,
        company: json.company,
        suscription_expire_datetime: convertToSubscriptionDatetime(json.suscription_expire_datetime),
        last_name: json.last_name,
        created_datetime: convertToSubscriptionDatetime(json.created_datetime),
        last_login_datetime: convertToSubscriptionDatetime(json.last_login_datetime),
        suscription: json.suscription,
        first_name: json.first_name,
        role: json.role,
      };
  
      console.log("userData before setting:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  export const fetchUsers = async () => {
    try {
        const users: UserData[] = [];
        const storedToken = localStorage.getItem("trackerToken") ?? "";

        const response = await fetch(`https://resto-admin-backend.uc.r.appspot.com/auth/getUsers`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        
        const json : UserData[] = await response.json();

        json.map((item) => {
            console.log('Item:', item);
            const userData: UserData = {
                id:item.id,
                company: item.company,
                suscription_expire_datetime: item.suscription_expire_datetime,
                last_name: item.last_name,
                created_datetime: item.created_datetime,
                last_login_datetime: item.last_login_datetime,
                suscription: item.suscription,
                first_name: item.first_name,
                role: item.role,
              };
            users.push(userData)

          });
   
        console.log("userData before setting:", users);
        return users;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }


  }

  export const validateToken = async (token: string) => {
    try { 
      const res = await fetch('https://resto-admin-backend.uc.r.appspot.com/api/validateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log('Usuario autenticado:', data);
      } else {
        console.log('Error de autenticación:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  };
  
  export const deleteUser = async (userId:string) => {
    try {
      const storedToken = localStorage.getItem("trackerToken") ?? "";
      
      const res = await fetch(`https://resto-admin-backend.uc.r.appspot.com/auth/deleteUser?id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log('Usuario eliminado:', data);
        return {"mensaje":"ok"}
      } else {
        console.log('Error al eliminar usuario:', data.error);
        return {"mensaje":"error"}
      }
    } catch (error) {
      console.error('Error al hacer la solicitud DELETE:', error);
      return {"mensaje":"error"}
    }
  };

  