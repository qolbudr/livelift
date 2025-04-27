import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { GuestCtxProvider } from "@/core/provider/guest_context_provider";
import { AuthRepository } from "@/core/repository/auth_repository";
import { handleError } from "@/core/utils/handle_error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const response = await AuthRepository.login(email, password);
      setLoading(false);
      router.push('/app/dashboard');
    }
    catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
  };

  return (
    <GuestCtxProvider>
      <Head>
        <title>Livelift - Login</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="px-3 md:px-0 max-w-[400px] w-full">
          <form onSubmit={handleSubmit}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Masuk ke Akun Anda</CardTitle>
                <CardDescription>
                  Masukkan email Anda di bawah ini untuk masuk ke akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Lupa Password?
                      </a>
                    </div>
                    <Input id="password" type="password" name="password" placeholder="******" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
                {/* <Button type="button" onClick={() => { }} variant="neutral" className="w-full">
                  Login with Google
                </Button> */}
                <div className="mt-4 text-center text-sm">
                  Belum punya akun?{" "}
                  <Link href="" onClick={() => router.replace('/signup')} className="underline underline-offset-4">
                    Daftar
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </GuestCtxProvider>
  );
}

export default Login;