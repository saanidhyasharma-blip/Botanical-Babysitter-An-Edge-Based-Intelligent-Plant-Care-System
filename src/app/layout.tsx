import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { DevicePoller } from "@/components/device-poller";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Botanical Babysitter",
  description: "Smart plant monitoring and autonomous irrigation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <QueryProvider>
          <AuthGuard>
            <DevicePoller />
            <DashboardShell>
              {children}
            </DashboardShell>
          </AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
