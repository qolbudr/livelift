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
import { toast } from "sonner";
import { handleError } from "@/core/utils/handle_error";
import { MediaRepository } from "@/core/repository/media_repository";

export const DialogAddMedia = ({onAdd}: {onAdd: () => void}): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const file = formData.get('video') as File;
      const response = await MediaRepository.addMedia({ title, description, video: file });
      setLoading(false);
      setOpen(false);
      onAdd();
      toast.success(response.message);
    } catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
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
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Judul</Label>
              <Input type="file" id="title" name="video" accept="video/*" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="neutral">Batal</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">{ isLoading ? 'Loading...' : 'Tambah Media' }</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}