import { getServerSession } from "next-auth";
import { Suspense } from "react";
import QuickStatsCards from "@/components/quick-stats-cards";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirstName } from "@/lib/utils";

export default async function Dashboard() {
  return (
    <div>
      <div>
        <h1 className="text-foreground text-2xl font-bold">
          👋 Welcome, Mohamed
        </h1>
        <p className="text-muted-foreground mt-1">
          This is your dashboard. You can get an overview of all University data
          here.
        </p>
        <Separator className="my-6" />
      </div>
      <p className="text-2xl font-semibold">Quick Stats</p>
      <Suspense fallback={<CardsSkeleton />}>
        <QuickStatsCards />
      </Suspense>
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="mt-4 h-28 w-full">
      <div className="flex h-full gap-4">
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full flex-1" />
      </div>
    </div>
  );
}
