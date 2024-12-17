// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter, useSegments } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";
// import ReportProvider from "./(tabs)/explore/report/ReportContext";
// import FeedbackProvider from "./(tabs)/explore/feedback/FeedbackContext";
// import ResourceProvider from "./(tabs)/explore/resource/ResourceContext";
// import BudgetProvider from "./(tabs)/explore/budget/BudgetContext";
// import AuthProvider, { useAuth } from "@/hooks/useAuth";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <ReportProvider>
//         <ResourceProvider>
//           <FeedbackProvider>
//             <BudgetProvider>
//               <Stack>
//                 <Stack.Screen
//                   name="login"
//                   options={{
//                     headerShown: false,
//                   }}
//                 />
//                 <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                 <Stack.Screen name="+not-found" />
//               </Stack>
//             </BudgetProvider>
//           </FeedbackProvider>
//         </ResourceProvider>
//       </ReportProvider>

//       {/* </AuthProvider> */}
//       {/* {isLoggedIn ? (
//         <Stack>
//           <Stack.Screen
//             name="(auth)"
//             options={{ headerShown: false, headerTitle: "Auth" }}
//           />
//         </Stack>
//       ) : (
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//         )} */}

//       {/* <Stack>
//         {isLoggedIn ? (
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         ) : (
//           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         )}
//       </Stack> */}

//       {/* <Stack>
//         <Stack.Screen
//           name="(tabs)"
//           options={{ headerShown: false, headerTitle: "Dashboard" }}
//         />
//         <Stack.Screen
//           name="(auth)"
//           options={{ headerShown: false, headerTitle: "Explore" }}
//         /> */}
//       {/* {isLoggedIn ? (
//         ) : (
//         )} */}
//       {/* </Stack> */}
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import ReportProvider from "./(tabs)/explore/report/ReportContext";
import FeedbackProvider from "./(tabs)/explore/feedback/FeedbackContext";
import ResourceProvider from "./(tabs)/explore/resource/ResourceContext";
import BudgetProvider from "./(tabs)/explore/budget/BudgetContext";
import AuthProvider from "@/hooks/useAuth";
import CampaignProvider from "./(tabs)/explore/crowdfund/CampaignContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ReportProvider>
          <ResourceProvider>
            <FeedbackProvider>
              <BudgetProvider>
                <CampaignProvider>
                  <Stack>
                    <Stack.Screen
                      name="login"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="signup"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="+not-found"
                      options={{ title: "Oops!" }}
                    />
                  </Stack>
                </CampaignProvider>
              </BudgetProvider>
            </FeedbackProvider>
          </ResourceProvider>
        </ReportProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
