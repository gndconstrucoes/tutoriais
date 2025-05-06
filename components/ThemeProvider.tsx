"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme="light" 
      enableSystem={false}
      forcedTheme="light"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
} 