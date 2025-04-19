"use client";

import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {User} from "@/app/dashboard/Models/User";

interface TokenPayload {
  username: string;
  email: string;
  // ...any other fields your backend includes
}

export default function SidebarUserButton() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const userJson = Cookies.get("account");


    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        const user = User.fromJson(parsed);
        setUser({
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar className="ml-auto h-9 w-9">
            {/* No <AvatarImage> here */}
            <AvatarFallback className="flex items-center justify-center p-1">
              <UserIcon size={20} />
              {user?.username?.[0].toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="start"
            className="w-48 bg-background !opacity-100 border border-border shadow-lg rounded-md"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col w-48 bg-background">
              <p className="text-foreground truncate text-base">
                {user?.username || "Guest"}
              </p>
              <p className="text-muted-foreground truncate font-normal">
                {user?.email || "Not signed in"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/settings" className="flex items-center">
              <UserIcon size={18} className="mr-2" />
              View profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings" className="flex items-center">
              <Settings size={18} className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
              className="text-destructive w-full cursor-pointer"
              onClick={() => {
                Cookies.remove("token");
                router.push("/signin");
              }}
          >
            <LogOut size={18} className="mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
