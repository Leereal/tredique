"use client";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, ReactNode } from "react";

const AdminPermission = ({
  children,
  skipPermission,
}: {
  children: ReactNode;
  skipPermission?: boolean;
}) => {
  const clerkId = useAuth().userId;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByClerkId(clerkId);
        setIsAdmin(user?.role === "Admin");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [clerkId]);

  if (skipPermission || isAdmin) {
    return children;
  }

  return null;
};

export default AdminPermission;
