"use client";
import React, { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "@/lib/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSocket } from "@/context/SocketContext";
import { AvatarGroup } from "primereact/avatargroup";
import { Avatar as PAvatar } from "primereact/avatar";

const SettingsPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, socket, onlineUsers } = useSocket();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getAllUsers({});
        setUsers(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const updatedUser = await updateUser(userId, {
        role: newRole,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-3xl font-bold">Settings</h2>
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Manage User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.photo || "/default-avatar.png"} />
                    <AvatarFallback>{user.firstName}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          onlineUsers.includes(user._id)
                            ? "bg-green-500"
                            : "bg-gray-400"
                        } mr-2`}
                      ></span>
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Select
                  defaultValue={user.role || "User"}
                  onValueChange={
                    (value) => handleRoleChange(user._id, value) // Ensure you're using the correct identifier here, previously `user.clerkId`
                  }
                >
                  <SelectTrigger className="ml-auto w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardContent className="p-6">
          <div className="flex">
            <div className="flex items-center">
              <h3 className="text-lg font-bold">Online Users : </h3>
              <div className="text-green-600">
                <AvatarGroup>
                  {onlineUsers.length > 0 ? (
                    <>
                      {onlineUsers
                        .filter((onlineUser: string) =>
                          users.some((user) => user._id === onlineUser)
                        )
                        .slice(0, 5)
                        .map((userId: string, index: number) => {
                          const user = users.find(
                            (user) => user._id === userId
                          );
                          return (
                            <PAvatar
                              key={index}
                              image={user?.photo || "/default-avatar.png"}
                              size="large"
                              shape="circle"
                              label={
                                user?.firstName.charAt(0) +
                                user?.lastName.charAt(0)
                              }
                            />
                          );
                        })}
                      {/* Additional Avatar showing the total count */}
                      {onlineUsers.length > 5 && (
                        <PAvatar
                          label={`+${onlineUsers.length}`}
                          shape="circle"
                          size="large"
                        />
                      )}
                    </>
                  ) : (
                    <PAvatar label="0" shape="circle" size="large" />
                  )}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
