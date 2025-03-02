import { DataTable } from "~/components/ui/data-table";
import AdminLayout from "../AdminLayout";
import { ColumnDef } from "@tanstack/react-table";
import { api } from "~/utils/api";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { InputPenggunaForm } from "~/components/page_component/input-pengguna-form";
import { EditPenggunaForm } from "~/components/page_component/edit-pengguna-form";
import { HapusPenggunaAlert } from "~/components/page_component/hapus-pengguna-alert";
import { ToastContainer } from "react-toastify";

type Pengguna = {
  id: string;
  nama: string;
  username: string;
};

const columns: ColumnDef<Pengguna>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nama",
    header: "Nama Pengguna",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pengguna = row.original;

      return (
        <div className="flex gap-2">
          <EditPenggunaForm
            id={pengguna.id}
            nama={pengguna.nama}
            username={pengguna.username}
          />
          <HapusPenggunaAlert id={pengguna.id} nama={pengguna.nama} />
        </div>
      );
    },
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("nama");

  const penggunaData = api.pengguna.penggunaData.useQuery({ search, filter });

  useEffect(() => {
    console.log(search);
    console.log(filter);
  }, [search, filter]);

  return (
    <AdminLayout>
      <div className="flex w-full justify-center">
        <ToastContainer position="bottom-right" theme="dark" />

        <div className="w-full flex-col items-center sm:w-[70vw] md:w-[60vw]">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Filter berdasarkan ${filter}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nama">Nama</SelectItem>
                <SelectItem value="username">Username</SelectItem>
              </SelectContent>
            </Select>
            <InputPenggunaForm />
            <Input
              type="email"
              className="text-sm"
              value={search}
              placeholder="Cari Berdasarkan Nama"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="mt-4">
            <DataTable
              columns={columns}
              data={penggunaData.data || []}
              isLoading={penggunaData.isLoading}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
