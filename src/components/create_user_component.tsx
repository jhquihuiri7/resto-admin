import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/utils/requests";
import { UserData } from "@/constants/user";

export function DialogCreateUser({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  // State to hold form data
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [role, setRole] = useState<string>("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurant, setRestaurant] = useState("");

  // Handle form submission
  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh on form submit
    setLoading(true)
    const userData: UserData = {
      id: mail,
      last_name: apellido,
      first_name: name,
      restaurant_id: restaurant,
      role: role,
      email: mail,
      password: password,
    };
    
    try {
      const res:  UserData | undefined | { mensaje: string; } | null = await createUser(userData);
      if (res?.mensaje === "ok") {
        setOpen(false); // Cerrar el diálogo al completar la creación
        onClose();
      }
    } catch (err) {
      console.log("Error al crear usuario", err);
    }

    // Reset form fields
    setName("");
    setApellido("");
    setRole("");
    setRestaurant("");
    setMail("");
    setPassword("");

    setLoading(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogDescription>
            Ingresa los datos para crear un nuevo usuario.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              className="col-span-3"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rol
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="owner">Propietario</SelectItem>
                  <SelectItem value="owner2">Admin</SelectItem>
                  <SelectItem value="owner3">Caja</SelectItem>
                  <SelectItem value="owner4">Cocina</SelectItem>
                  <SelectItem value="owner5">Bar</SelectItem>
                  <SelectItem value="owner6">Mesero</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="restaurant_id" className="text-right">
              Restaurante
            </Label>
            <Select
              value={restaurant}
              onValueChange={(value) => setRestaurant(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un restaurante" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Restaurantes</SelectLabel>
                  <SelectItem value="owner7">Propietario</SelectItem>
                  <SelectItem value="owner8">Admin</SelectItem>
                  <SelectItem value="owner9">Caja</SelectItem>
                  <SelectItem value="owner10">Cocina</SelectItem>
                  <SelectItem value="owner11">Bar</SelectItem>
                  <SelectItem value="owner12">Mesero</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mail" className="text-right">
              Correo
            </Label>
            <Input
              id="mail"
              className="col-span-3"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input
              id="password"
              className="col-span-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Porfavor espere" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
