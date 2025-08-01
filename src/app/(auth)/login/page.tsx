"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginForm } from "src/components/auth/login-form";
import { LocalStorage } from "src/lib/local-storage";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animation/loading-page.json";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(LocalStorage.token);

    if (token) {
      router.push("/");
    } else {
      setIsLoading(false); // không có token => cho hiện login form
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          loop
          // className="mnd:h-32 md:w-32 h-24 w-24"
          size={100}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
