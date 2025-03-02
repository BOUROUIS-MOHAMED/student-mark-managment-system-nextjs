"use client";

import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SidebarUserButton() {
  return (
    <>
      {/* Account Dropdown - to logout (and manage profile later) */}
      {1 == 1 && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto">
              <Avatar className="ml-auto h-9 w-9">
                <AvatarImage src={""} />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <p className="text-foreground truncate text-base">Mohamed</p>
                  <p className="text-muted-foreground truncate font-normal">
                    example@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard/settings" className="flex">
                  <User size={18} className="mr-2" />
                  View profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/settings" className="flex">
                  <Settings size={18} className="mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive w-full cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut size={18} className="mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
