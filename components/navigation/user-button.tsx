"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut, Moon, Sun, Settings, BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

export default function UserBtn({ user, onSignOut }) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  function setSwithstate() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }
  useEffect(() => {
    setSwithstate();
  }, []);

  const handleSignOut = () => {
    onSignOut();
    router.push("/");
  };

  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="p-2">
          <Avatar className="w-8 h-8 p-2 bg-primary">
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary">
                <div className="font-bold bg-primary">
                  {user.email?.charAt(0).toLocaleUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={36}
                height={36}
              />
            )}
            <p className="font-bold text-xs">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push("/dashboard/investments")}
            className="group py-2 font-medium cursor-pointer "
          >
            <BriefcaseBusiness
              size={18}
              className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
            My Investments
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="group py-2 font-medium cursor-pointer  ease-in-out "
          >
            <Settings
              size={18}
              className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />
            Settings
          </DropdownMenuItem>

          {theme && (
            <DropdownMenuItem className="py-2 font-medium cursor-pointer  ease-in-out">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center group "
              >
                <div className="relative flex mr-3">
                  <Sun
                    className="group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out"
                    size={18}
                  />
                  <Moon
                    className="group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750"
                    size={18}
                  />
                </div>
                <p className="dark:text-blue-400 mr-3 text-secondary-foreground/75   text-yellow-600">
                  {theme[0].toUpperCase() + theme.slice(1)}
                </p>
                <Switch
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    if (e) setTheme("dark");
                    if (!e) setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={handleSignOut}
            className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer "
          >
            <LogOut
              size={18}
              className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
