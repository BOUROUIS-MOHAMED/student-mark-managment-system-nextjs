"use client";

import { Badge } from "@radix-ui/themes";
import {
  BookCheck,
  CheckCircle,
  History,
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
import Cookies from "js-cookie";
import {User} from "@/app/dashboard/Models/User";
// Update import path

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

export default function SidebarNavlinks() {
  const pathname = usePathname();
  const userJson = Cookies.get("account");
  let  isAdmin = true;
  let  isTeacher = false;
  let isStudent =false;
  if (userJson) {
    console.log(userJson);
    const parsed = JSON.parse(userJson);
    const user = User.fromJson(parsed);  // Now it's a real User instance again!
    console.log("Welcome back,", user.username);
    const roles = user?.roles || [];

    console.log("The roles are: ", roles);

    isAdmin = user.hasRole('ROLE_ADMIN');
    isTeacher = user.hasRole('ROLE_MODERATOR');
    isStudent = user.hasRole('ROLE_USER');

  }




  const filteredLinks = links.filter(link => {
    // Admins see everything
    if (isAdmin) return true;

    // Teacher-specific restrictions
    if (isTeacher) {
      return ![
        'Teachers',
        'Classes',
        'Semesters',
        'Logs',
        'Courses',
        'Settings',
          'Course Students',

        'Classes'
      ].includes(link.name);
    }

    // Student-specific restrictions
    if (isStudent) {
      return ![
        'Students',
        'Teachers',
        'Classes',
        'Semesters',
        'Logs',
          'Courses',
         'Settings',

        'Teachers classroom',
        'Teachers courses',
        'Classes'
      ].includes(link.name);
    }

    // Default visibility for unauthenticated/non-role users
    return ![].includes(link.name);
  });

  return (
      <div className="overflow-y-auto h-full max-h-screen pr-2">
        <div className="mt-8 flex flex-col gap-2">
          {filteredLinks.map((link) => (
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
  );
}