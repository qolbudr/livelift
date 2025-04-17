import { AdminLayout } from "@/components/layout/admin_layout";
import { Toaster } from "@/components/ui/sonner";
import { AuthCtxProvider } from "@/core/provider/auth_context_provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/app")) {
    return (
      <AuthCtxProvider>
        <AdminLayout>
          <Component {...pageProps} />
          <Toaster />
        </AdminLayout>
      </AuthCtxProvider>
    );
  }
  return <><Component {...pageProps} /><Toaster /></>;
}
