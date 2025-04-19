"use client";

import { Badge } from "@radix-ui/themes";
import {
  BookCheck,
  CheckCircle,
  History,
  Home,
  LibraryBig,
  Presentation,
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

];

export default function SidebarNavlinks() {
  const pathname = usePathname();
  const userJson = Cookies.get("account");

  // Initialize all roles as false
  let isAdmin = false;
  let isTeacher = false;
  let isStudent = false;

  if (userJson) {
    try {
      const parsed = JSON.parse(userJson);
      const user = User.fromJson(parsed);

      // Update roles based on actual user permissions
      isAdmin = user.hasRole('ROLE_ADMIN');
      isTeacher = user.hasRole('ROLE_MODERATOR');
      isStudent = user.hasRole('ROLE_USER');
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const filteredLinks = links.filter(link => {
    // No access if not logged in
    if (!userJson) return false;

    // Admin sees all
    if (isAdmin) return true;

    // Teacher access
    if (isTeacher) {
      return ![
        'Teachers', 'Classes', 'Semesters',
        'Logs', 'Settings', 'Course Students'
      ].includes(link.name);
    }

    // Student access
    if (isStudent) {
      return ![
        'Students', 'Teachers', 'Classes',
        'Semesters', 'Logs', 'Settings',
        'Teachers classroom', 'Teachers courses'
      ].includes(link.name);
    }

    // Default: no access for unrecognized roles
    return false;
  });

  // Don't render anything if no filtered links
  if (filteredLinks.length === 0) return null;

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