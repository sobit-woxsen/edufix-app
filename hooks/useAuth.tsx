import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

type User = {
  id: string;
  username: string;
};

const DUMMY_USERS = [
  { username: "woxsenuniversity", password: "12345", role: "DEFAULT" },
  { username: "admin", password: "123", role: "ADMINSTRATOR" },
  { username: "school", password: "123", role: "SCHOOL" },
  { username: "corporate", password: "123", role: "CORPORATE" },
  { username: "parent", password: "123", role: "PARENT" },
];

type AuthContextType = {
  user: User | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USERNAME = "demo";
const DEFAULT_PASSWORD = "123";

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (segments[0] === "signup") {
      return;
    }

    if (!user) {
      router.replace("/login");
    } else if (segments[0] !== "(tabs)") {
      router.replace("/(tabs)");
    }
  }, [user, segments]);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useProtectedRoute(user);

  useEffect(() => {
    AsyncStorage.getItem("user").then((userString) => {
      if (userString) {
        setUser(JSON.parse(userString));
      }
    });
  }, []);

  const signIn = async (username: string, password: string) => {
    // Check if the username and password match any dummy user
    const matchedUser = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      const newUser = {
        id: matchedUser.username,
        username,
        role: matchedUser.role,
      };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      router.replace("/(tabs)");
      return true;
    }

    // Check for custom registered users
    const storedPassword = await AsyncStorage.getItem(`user:${username}`);
    const storedRole = await AsyncStorage.getItem(`role:${username}`);
    if (storedPassword === password) {
      const newUser = { id: username, username, role: storedRole || "custom" };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      router.replace("/(tabs)");
      return true;
    }

    return false;
  };

  const signUp = async (username: string, password: string, role: string) => {
    if (await AsyncStorage.getItem(`user:${username}`)) {
      return false;
    }
    await AsyncStorage.setItem(`user:${username}`, password);
    await AsyncStorage.setItem(`role:${username}`, role);
    return true;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
