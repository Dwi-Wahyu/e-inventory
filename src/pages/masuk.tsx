import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AuthLayout from "./AuthLayout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { loginSchema } from "~/schema/LoginSchema";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type TLoginSchema = z.infer<typeof loginSchema>;

export default function Masuk() {
  const loginMutation = api.auth.login.useMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: TLoginSchema) {
    const response = await loginMutation.mutateAsync(data);

    if (response.success) {
      router.push("/admin/dashboard");
    } else {
      setError("root", { message: response.message });
    }
  }

  return (
    <AuthLayout>
      <Card className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Selamat Datang</CardTitle>
            <CardDescription>
              Halaman Login Aplikasi E-Inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <Label>Username</Label>
              <Input
                {...register("username")}
                className="mt-1"
                placeholder="Username"
              />
              {errors.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input
                {...register("password")}
                className="mt-1"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full disabled:bg-slate-800"
              >
                {isSubmitting ? <ClipLoader size={20} color="#000" /> : "Login"}
              </Button>
              {errors.root && (
                <span className="mt-2 text-center text-xs text-red-500">
                  {errors.root.message}
                </span>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
}
