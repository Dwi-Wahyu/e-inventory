import { inputPenggunaSchema } from "~/schema/InputPenggunaSchema";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Label } from "../ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";
import { ClipLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";

type TInputPenggunaSchema = z.infer<typeof inputPenggunaSchema>;

export function InputPenggunaForm() {
  const penggunaMutation = api.pengguna.postPengguna.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<TInputPenggunaSchema>({
    resolver: zodResolver(inputPenggunaSchema),
  });

  const router = useRouter();

  async function onSubmit(data: TInputPenggunaSchema) {
    const response = await penggunaMutation.mutateAsync(data);

    if (response.success) {
      router.reload();
      toast.success(response.message);
    } else {
      setError("root", { message: response.message });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus2 />
          Input Pengguna
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Pengguna</DialogTitle>
          <DialogDescription>
            Masukkan nama username dan password
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="nama">Nama</Label>
              <Input
                {...register("nama")}
                id="nama"
                name="nama"
                placeholder="Ketik nama"
                className="col-span-3"
              />
              {errors.nama && (
                <span className="col-span-3 col-start-2 mt-2 text-xs text-red-500">
                  {errors.nama.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                id="username"
                name="username"
                placeholder="Ketik username"
                className="col-span-3"
              />
              {errors.username && (
                <span className="col-span-3 col-start-2 mt-2 text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                name="password"
                placeholder="Ketik password"
                className="col-span-3"
              />
              {errors.password && (
                <span className="col-span-3 col-start-2 mt-2 text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex w-full justify-end">
              <Button
                disabled={isSubmitting}
                className="w-full font-semibold sm:w-fit"
                type="submit"
              >
                {isSubmitting ? (
                  <ClipLoader size={20} color="#000" />
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
