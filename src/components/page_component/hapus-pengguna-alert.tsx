import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

import { ToastContainer, toast } from "react-toastify";
import { api } from "~/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

export function HapusPenggunaAlert({ id, nama }: { id: string; nama: string }) {
  const penggunaMutation = api.pengguna.deletePengguna.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function handleHapus() {
    setIsLoading(true);
    const response = await penggunaMutation.mutateAsync({ id });

    if (response.success) {
      router.reload();
      toast.success(response.message);
      setIsLoading(false);
      toggleOpen();
    }
  }

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash /> Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin menghapus pengguna {nama}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus akun Anda
            secara permanen dan menghapus data dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isLoading} onClick={handleHapus}>
            {isLoading ? <ClipLoader size={20} color="#000" /> : "Konfirmasi"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
