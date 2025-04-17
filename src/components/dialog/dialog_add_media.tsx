import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as Icon from "react-bootstrap-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

export const DialogAddMedia = (): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert(1);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setOpen(false);
  }

  return (

    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Media</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Tambah Media</DialogTitle>
            <DialogDescription>
              Tambahkan media video yang akan digunakan untuk melakukan live streaming
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Judul</Label>
              <Input type="file" id="title" name="name" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Batal</Button>
            </DialogClose>
            <Button type="submit">Tambah Media</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}