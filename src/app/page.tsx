import Image from "next/image";
import app from '../firebase/client';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginForm } from "@/components/login-form"

const HomePage = () => {


  const auth = getAuth(app);
    signInWithEmailAndPassword(auth, "admin@admin.com", "admin123")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email)
    // ...
  })
  .catch((error) => {
    console.log(error.message)
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default HomePage;