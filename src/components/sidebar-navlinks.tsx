"use client";

import { Badge } from "@radix-ui/themes";
import {
  BookCheck,
  CheckCircle,
  History,
  // History,
  Home,
  LibraryBig,
  Presentation,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <Home size={18} />,
    wipStatus: false,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    icon: <Users size={18} />,
    wipStatus: false,
    newStatus: true,
  },
  {
    name: "Classes",
    href: "/dashboard/schoolClass",
    icon: <History size={18} />,
    wipStatus: false,
    newStatus: false,
  },
  {
    name: "Courses",
    href: "/dashboard/subject",
    icon: <Presentation size={18} />,
    wipStatus: false,
    newStatus: false,
  },
  {
    name: "Course Students",
    href: "/dashboard/course-student",
    icon: <Presentation size={18} />,
    wipStatus: false,
    newStatus: false,
  },
  {
    name: "Teachers",
    href: "/dashboard/professors",
    icon: <CheckCircle size={18} />,
    wipStatus: true,
    newStatus: false,
  },
  {
    name: "Teachers classroom",
    href: "/dashboard/teacher-classroom",
    icon: <CheckCircle size={18} />,
    wipStatus: true,
    newStatus: false,
  },
  {
    name: "Teachers courses",
    href: "/dashboard/teacher-course",
    icon: <CheckCircle size={18} />,
    wipStatus: true,
    newStatus: false,
  },


  {
    name: "PFE",
    href: "/dashboard/project",
    icon: <Presentation size={18} />,
    wipStatus: false,
    newStatus: false,
  },
  {
    name: "Semesters",
    href: "/dashboard/pfe-teacher",
    icon: <BookCheck size={18} />,
    wipStatus: false,
  },


  {
    name: "Note",
    href: "/dashboard/result",
    icon: <LibraryBig size={18} />,
    wipStatus: false,
    newStatus: false,
  },

  /*{
    name: "Manage",
    href: "/dashboard/manage",
    icon: <UserCog size={18} />,
    wipStatus: false,
  },*/
  {
    name: "Logs",
    href: "/dashboard/logs",

    wipStatus: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
    wipStatus: false,
  },
];

export default function SidebarNavlins() {
  const pathname = usePathname(); // used to highlight the current page in the sidebar

  return (
      <>

        <div className="overflow-y-auto h-full max-h-screen pr-2">

          <div className="mt-8 flex flex-col gap-2">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "flex justify-start gap-2 text-base font-normal",
                        pathname === link.href
                            ? "bg-neutral-50 dark:bg-neutral-700"
                            : "bg-transparent"
                    )}
                >
                  {link.icon}
                  {link.name}
                  {link.wipStatus && (
                      <Badge color="grass" className="ml-auto text-xs">
                        🛠️ WIP
                      </Badge>
                  )}
                  {link.newStatus && (
                      <Badge className="ml-auto text-xs">✨ NEW</Badge>
                  )}
                </Link>
            ))}
          </div>
        </div>
      </>
  );
}