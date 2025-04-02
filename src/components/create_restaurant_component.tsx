import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
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

import { createRestaurant} from "@/utils/requests";
import { RestaurantData } from "@/constants/restaurants";

export function DialogCreateRestaurant({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  // State to hold form data
  const [name, setName] = useState("");

  // Handle form submission
  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh on form submit
    setLoading(true)
    const data: RestaurantData = {
      id: "",
      name: name,
      branches: []
    };
    
    try {
      const res:  RestaurantData | undefined | { mensaje: string; } | null = await createRestaurant(data);
      if (res?.mensaje === "ok") {
        setOpen(false); 
        onClose();
      }
    } catch (err) {
      console.log("Error al crear usuario", err);
    }

    setLoading(false)
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Agregar Restaurante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Restaurante</DialogTitle>
          <DialogDescription>
            Ingresa los datos para crear un nuevo restaurante.
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
