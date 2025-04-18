import Image from "next/image";
import { Suspense } from "react";

import SidebarNavlinks from "@/components/sidebar-navlinks";
import SidebarUserButton from "@/components/sidebar-userbutton";
import { ModeToggle } from "@/components/theme-toggle";

import * as React from "react";

export default function Sidebar() {
    return (
        <aside className="border-border bg-background hidden h-screen border-r-[1px] px-3 py-4 md:flex md:flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 px-2 mb-4">
                <Image src="/logo.png" width={26} height={26} alt="EXAMPLE" />

                <Suspense>
                    <SidebarUserButton />
                </Suspense>
            </div>

            {/* Scrollable nav */}
            <div className="flex-1 overflow-y-auto pr-1">
                <Suspense>
                    <SidebarNavlinks />
                </Suspense>
            </div>



            {/* Footer (Theme toggle) */}
            <div className="flex items-center justify-center gap-4 rounded-lg p-2 text-sm">
                <Suspense>
                    <ModeToggle />
                </Suspense>
            </div>
        </aside>
    );
}
