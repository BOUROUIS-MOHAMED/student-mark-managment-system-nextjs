"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "@/app/dashboard/Models/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Settings() {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors] = useState<string[]>([]);

    useEffect(() => {
        const userJson = Cookies.get("account");
        if (userJson) {
            try {
                const parsed = JSON.parse(userJson);
                const user = User.fromJson(parsed);
                setUser(user);
                setUsername(user.username);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleUsernameSave = () => {
        if (!user) return;

        const updatedUser = new User({
            ...user,
            username: username,
        });

        Cookies.set("account", JSON.stringify(updatedUser.toJson()));
        setUser(updatedUser);
    };



    if (!user) {
        return (
            <div className="flex flex-col gap-4">
                <p>Please log in to view settings</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-foreground text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your account settings
                </p>
            </div>
            <Separator />

            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-semibold">Profile</h2>
                    <p className="text-muted-foreground">
                        This is your personal profile settings
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="mb-2">Username</Label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-[400px]"
                            />
                            <Button onClick={handleUsernameSave}>Save</Button>
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Email</Label>
                        <Input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-[400px]"
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Roles</Label>
                        <Input
                            type="text"
                            value={user.roles.map(role => role.name).join(", ")}
                            disabled
                            className="w-[400px]"
                        />
                    </div>

                    <Dialog>

                        <DialogContent>


                            <div className="flex flex-col gap-4">
                                {errors.length > 0 && (
                                    <div className="text-destructive">
                                        {errors.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <Label>Old Password</Label>
                                    <Input
                                        type="password"
                                        value={passwordData.oldPassword}
                                        onChange={(e) => setPasswordData(prev => ({
                                            ...prev,
                                            oldPassword: e.target.value
                                        }))}
                                    />
                                </div>

                                <div>
                                    <Label>New Password</Label>
                                    <Input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData(prev => ({
                                            ...prev,
                                            newPassword: e.target.value
                                        }))}
                                    />
                                </div>

                                <div>
                                    <Label>Confirm Password</Label>
                                    <Input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData(prev => ({
                                            ...prev,
                                            confirmPassword: e.target.value
                                        }))}
                                    />
                                </div>


                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}