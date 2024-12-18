import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

type User = {
  id: string;
  username: string;
};

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
    if (
      (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) ||
      (await AsyncStorage.getItem(`user:${username}`)) === password
    ) {
      const newUser = { id: "1", username };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      router.replace("/(tabs)");
      return true;
    }
    return false;
  };

  const signUp = async (username: string, password: string) => {
    if (await AsyncStorage.getItem(`user:${username}`)) {
      return false;
    }
    await AsyncStorage.setItem(`user:${username}`, password);
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
