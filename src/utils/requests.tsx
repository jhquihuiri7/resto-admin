import { RestaurantData } from "@/constants/restaurants";
import { UserData} from "@/constants/user";

const url_base = "http://localhost:8080"

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
        return null
      }
  
      const json = await response.json();
  
      const userData: UserData = {
        id:json.id,
        company: json.company,
        last_name: json.last_name,
        suscription: json.suscription,
        first_name: json.first_name,
        role: json.role,
        email: json.id,
        password: ""
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
          return null
        }
        
        const json : UserData[] = await response.json();

        json.map((item) => {
            console.log('Item:', item);
            const userData: UserData = {
                id:item.id,
                email:item.email,
                company: item.company,
                last_name: item.last_name,
                suscription: item.suscription,
                first_name: item.first_name,
                role: item.role,
                password: item.password
              };
            users.push(userData)

          });
   
        console.log("userData before setting:", users);
        return users;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }


  }
  
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

  export const createUser = async (user:UserData) => {
    try {
      const storedToken = localStorage.getItem("trackerToken") ?? "";
      
      const res = await fetch(`http://localhost:8080/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify(user),
      });
  
      if (res.ok) {
        console.log('Usuario creado');
        return {"mensaje":"ok"}
      } else {
        console.log('Error al crear usuario:', res.text);
        return {"mensaje":"error"}
      }
    } catch (error) {
      console.error('Error al hacer la solicitud CREATE:', error);
      return {"mensaje":"error"}
    }
  };

  export const fetchRestaurants = async () => {
    try {
        const restaurants: RestaurantData[] = [];
        const storedToken = localStorage.getItem("trackerToken") ?? "";

        const response = await fetch(`${url_base}/restaurant/getRestaurants`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          return null
        }
        
        const json : RestaurantData[] = await response.json();

        json.map((item) => {
            console.log('Item:', item);
            const data: RestaurantData = {
                id:item.id,
                name:item.name,
                branches: item.branches,
                
              };
            restaurants.push(data)

          });
   
        console.log("userData before setting:", restaurants);
        return restaurants;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  }
  export const createRestaurant = async (data : RestaurantData) => {
    try {
        const storedToken = localStorage.getItem("trackerToken") ?? "";

        const res = await fetch(`${url_base}/restaurant/createRestaurant`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data)
        });
    
        if (res.ok) {
          console.log('Restaurante creado');
          return {"mensaje":"ok"}
        } else {
          console.log('Error al crear restaurante:', res.text);
          return {"mensaje":"error"}
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }


  }
  export const deleteRestaurant = async (id : string) => {
    try {
        const storedToken = localStorage.getItem("trackerToken") ?? "";

        const res = await fetch(`${url_base}/restaurant/deleteRestaurant?id=${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
    
        return res
      } catch (error) {
        console.error("Error fetching user data:", error);
      }


  }

  