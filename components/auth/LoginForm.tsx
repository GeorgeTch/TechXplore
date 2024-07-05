"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthCard from "./AuthCard";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.success) {
        setSuccess("Login successful. Redirecting...");
        setTimeout(() => {
          window.location.href = data.redirectTo;
        }, 1000);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <AuthCard
      cardTitle="Welcome back!"
      backBtnHref="/auth/register"
      backBtnLabel="Create a new account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Username"
                        type="text"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormDescription />
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
                        {...field}
                        placeholder="********"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormSuccess message={success} />
              <FormError message={error} />
              <Button className="px-0" size={"sm"} variant={"link"} asChild>
                <Link href={"/auth/reset"}>Forgot your password</Link>
              </Button>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full my-2",
                form.formState.isSubmitting ? "animate-pulse" : ""
              )}
            >
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
