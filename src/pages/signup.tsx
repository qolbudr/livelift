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
      const name = formData.get('name') as string;
      const phone = formData.get('phone') as string;
      const password = formData.get('password') as string;
      const response = await AuthRepository.register(name, email, phone, password);
      setLoading(false);
      toast.success(response.message);
      router.push('/login');
    }
    catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
  };

  return (
    <GuestCtxProvider>
      <Head>
        <title>Livelift - Signup</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="px-3 md:px-0 max-w-[400px] w-full">
          <form onSubmit={handleSubmit}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  Daftar ke Akun Anda
                </CardTitle>
                <CardDescription>
                  Masukkan detail Anda di bawah ini untuk membuat akun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Label className="w-[50px] h-[38px] border-2 flex items-center justify-center bg-main rounded" htmlFor="phone">+62</Label>
                      <Input
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="8123456789"
                        required
                      />
                    </div>
                  </div>
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
                        Lupa password?
                      </a>
                    </div>
                    <Input id="password" type="password" name="password" placeholder="******" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? 'Loading...' : 'Signup'}
                </Button>
                {/* <Button type="button" onClick={() => { }} variant="neutral" className="w-full">
                  Login with Google
                </Button> */}
                <div className="mt-4 text-center text-sm">
                  Sudah punya akun?{" "}
                  <Link href="" onClick={() => router.replace('/login')} className="underline underline-offset-4">
                    Masuk
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