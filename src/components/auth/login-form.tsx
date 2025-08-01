"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginRequestSchema } from "src/types/request/LoginRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Login, LoginResponse } from "src/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animation/loading-component.json";



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: z.infer<typeof LoginRequestSchema>) => {
    // Handle login logic here
    setIsLoading(true);
    const response: LoginResponse = await Login(values);

    if (response.statusCode === 200) {
      // Redirect or show success message
      router.push("/");
    } else {
      // Handle error
      
    }

  }

  const form = useForm<z.infer<typeof LoginRequestSchema>>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
          <Lottie animationData={loadingAnimation} loop size={12} />
          <p className="text-sm text-primary">Đang đăng nhập...</p>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="user"
                          {...field}
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your account password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
