import { createContext, useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";

interface SocketContextProps {
  socket: any;
  onlineUsers: any;
  user: any | null;
  showMessage: any; // Add showMessage to the context props
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
  user: null,
  showMessage: () => {}, // Default no-op function
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [user, setUser] = useState<any | null>(null);
  const toastRef = useRef<Toast>(null);

  const { userId: clerkId } = useAuth();
  const router = useRouter();

  const showMessage = (
    severity: "error" | "success" | "info" | "warn",
    summary: string,
    detail: string
  ) => {
    toastRef.current?.show({ severity, summary, detail, life: 5000 });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserByClerkId(clerkId);
        if (fetchedUser) {
          setUser(fetchedUser);
          const socketIO = io("http://localhost:5000", {
            query: {
              userId: fetchedUser?._id,
            },
          });
          setSocket(socketIO);

          socketIO.on("getOnlineUsers", (users: any) => {
            setOnlineUsers(users);
          });

          return () => {
            socketIO.close();
          };
        } else {
          router.push("/sign-up");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/sign-up");
      }
    };
    fetchUser();
  }, [clerkId, router]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers, user, showMessage }}>
      <Toast ref={toastRef} position="top-center" />
      {children}
    </SocketContext.Provider>
  );
};
