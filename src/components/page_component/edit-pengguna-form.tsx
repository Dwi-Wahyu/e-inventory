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
import { Edit, UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import { editPenggunaSchema } from "~/schema/EditPenggunaSchema";

type TEditPenggunaSchema = z.infer<typeof editPenggunaSchema>;

type PageProps = {
  id: string;
  nama: string;
  username: string;
};

export function EditPenggunaForm({ id, username, nama }: PageProps) {
  const penggunaMutation = api.pengguna.editPengguna.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<TEditPenggunaSchema>({
    resolver: zodResolver(editPenggunaSchema),
  });

  setValue("id", id);
  setValue("nama", nama);
  setValue("username", username);

  const router = useRouter();

  async function onSubmit(data: TEditPenggunaSchema) {
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
        <Button size="sm">
          <Edit /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
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
