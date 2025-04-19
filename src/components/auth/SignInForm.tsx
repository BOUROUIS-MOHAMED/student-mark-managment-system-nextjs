"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import {login} from "@/app/dashboard/services/UserService";
import {User} from "@/app/dashboard/Models/User";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await login(username, password);

    if (response.status && response.data?.accessToken) {
      // Save token in cookies for 7 days
      if (isChecked) {
        // Persist cookie for 7 days
        Cookies.set("token", response.data.accessToken, { expires: 7 });





      } else {
        // Session cookie: no `expires` means it's cleared when the browser is closed
        Cookies.set("token", response.data.accessToken);
      }



      const user = User.fromJson(response.data); // Create a real User instance
      Cookies.set("account", JSON.stringify(user.toJson()), { expires: 7 });



      // Redirect to dashboard
      router.push("/dashboard");

    } else {
      setError(response.errorMsg || "Login failed. Please try again.");
    }
  };

  return (
      <div className="flex flex-col flex-1">
        <div className="w-full max-w-md pt-10 mx-auto">Dashboard</div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your username and password to sign in!
              </p>
            </div>
            {error && (
                <p className="mb-4 text-sm text-red-500 dark:text-red-400">
                  {error}
                </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>
                  </Label>
                  <Input
                      defaultValue={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="myName"
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                    {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                  </div>
                  <Link
                      href="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" >
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
