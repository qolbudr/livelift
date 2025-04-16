import { AdminLayout } from "@/components/layout/admin_layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/app")) {
    return <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>;
  }
  return <Component {...pageProps} />;
}
