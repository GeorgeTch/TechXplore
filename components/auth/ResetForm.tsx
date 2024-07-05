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
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import { ResetSchema } from "@/types/reset-schema";
import FormError from "./FormError";

export default function ResetForm() {
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthCard
      cardTitle="Forgot your password?"
      backBtnHref="/auth/login"
      backBtnLabel="Back to login"
      showSocials
    >
      <div>
        <Form {...form}>
          <form>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Email"
                        type="email"
                        autoComplete="email"
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"sm"} variant={"link"} asChild>
                <Link href={"/auth/reset"}>Forgot your password</Link>
              </Button>
            </div>

            <Button
              disabled
              type="submit"
              className={cn(
                "w-full my-2",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
