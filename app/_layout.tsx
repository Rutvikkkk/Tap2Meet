import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import './global.css'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (user && !inAuthGroup) {
      // User is signed in but not in protected routes, redirect to tabs
      router.replace('/(tabs)');
    } else if (!user && inAuthGroup) {
      // User is not signed in but trying to access protected routes, redirect to auth
      router.replace('/auth');
    } else if (!user && segments.length === 0) {
      // User is not signed in and on root, redirect to auth
      router.replace('/auth');
    }
  }, [user, loading, segments]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}