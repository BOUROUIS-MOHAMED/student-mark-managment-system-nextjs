import { getServerSession } from "next-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default async function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account settings
        </p>
      </div>
      <Separator />
      {true && (
        <div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="text-muted-foreground">
                This is your personal profile settings
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm">Profile Picture</p>
                {true && (
                  <>
                    <Image
                      src=""
                      alt="Logo"
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </>
                )}
              </div>
              <div>
                <p className="mb-2 text-sm">Name</p>
                <Input
                  type="text"
                  id="name"
                  className="w-[400px]"
                  defaultValue="mohamed"
                  disabled
                />
              </div>
              <div>
                <p className="mb-2 text-sm">Email</p>
                <Input
                  type="text"
                  id="name"
                  className="w-[400px]"
                  defaultValue="example@example.com"
                  disabled
                />
              </div>
              <Button className="w-fit">Save changes</Button>
            </div>
          </div>
        </div>
      )}
      {!true && (
        <div>
          <p>Not logged in</p>
        </div>
      )}
    </div>
  );
}
