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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function DialogCreateUser() {
  // State to hold form data
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [role, setRole] = useState<string>("0");
  const [suscription, setSuscription] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh on form submit

    // Create an object with all the form data
    const userData = {
      name,
      apellido,
      role,
      suscription,
      mail,
      password,
    };

    // Log the user data to the console
    console.log("User Data:", userData);

    // Reset form fields after submission (optional)
    setName("");
    setApellido("");
    setRole("0");
    setSuscription("");
    setMail("");
    setPassword("");
  };

  return (
    <Dialog>
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
              onChange={(e) => setName(e.target.value)} // Bind value and onChange to state
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
              onChange={(e) => setApellido(e.target.value)} // Bind value and onChange to state
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rol
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value)} // Bind Select value to state
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="0">Propietario</SelectItem>
                  <SelectItem value="1">Admin</SelectItem>
                  <SelectItem value="2">Caja</SelectItem>
                  <SelectItem value="3">Cocina</SelectItem>
                  <SelectItem value="4">Bar</SelectItem>
                  <SelectItem value="5">Mesero</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="suscription" className="text-right">
              Suscripción
            </Label>
            <Input
              id="suscription"
              className="col-span-3"
              value={suscription}
              onChange={(e) => setSuscription(e.target.value)} // Bind value and onChange to state
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mail" className="text-right">
              Correo
            </Label>
            <Input
              id="mail"
              className="col-span-3"
              value={mail}
              onChange={(e) => setMail(e.target.value)} // Bind value and onChange to state
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input
              id="password"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind value and onChange to state
            />
          </div>
          <DialogFooter>
            <Button type="submit">Crear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
