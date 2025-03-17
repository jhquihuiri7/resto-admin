"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"; 
import app from '../firebase/client';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Usuario autenticado
      const user = userCredential.user;
      console.log("Usuario autenticado:", user.email);

      // Obtener el token de autenticación
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);
      localStorage.setItem("trackerToken", idToken);

      // Puedes usar el token para enviarlo a tu backend o almacenarlo
      setError(null); // Limpiar errores si el inicio de sesión es exitoso

      router.push("/dashboard")
    } catch (error: unknown) {
      console.error("Error al iniciar sesión:", error);
      setError("Email o contraseña incorrectas"); // Mostrar el mensaje de error al usuario
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido a MenuTrack</h1>
                <p className="text-muted-foreground text-balance">
                  Ingresa para registrar tus pedidos
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@correo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="text-sm text-red-500">{error}</div>
              )}
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login_bg.jpeg"
              alt="Image"
              fill
              className="object-cover object-right dark:brightness-[0.2] dark:grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        © 2025 <a href="#">Logiciel Applab</a>. Todos los derechos reservados.
      </div>
    </div>
  )
}
