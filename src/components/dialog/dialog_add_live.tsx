import { JSX, useEffect, useState } from "react";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video } from "@/core/types/video";
import { LiveRepository } from "@/core/repository/live_repository";

export const DialogAddLive = ({ onAdd }: { onAdd: () => void }): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>();
  const [isLoading, setLoading] = useState(false);
  const [video, setVideo] = useState<Video[]>([])
  const [videoId, setVideoId] = useState<string>();


  const getMedia = async () => {
    try {
      const response = await MediaRepository.getMedia();
      setVideo(response!.data);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const title = formData.get('title') as string;
      const response = await LiveRepository.addLive({ title, videoId: videoId! });
      setLoading(false);
      setOpen(false);
      onAdd();
      toast.success(response.message);
    } catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
  }

  useEffect(() => { getMedia() }, [])

  return (

    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Live</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Tambah Live</DialogTitle>
            <DialogDescription>
              Tambahkan live streaming
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="video">Video</Label>
              <Select onValueChange={(value) => setVideoId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Video" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      video.map((item, index) => (
                        <SelectItem key={index} value={item.id.toString()}>{item.title}</SelectItem>
                      ))
                    }
                    {
                      video.length == 0 &&
                      <SelectLabel>Tidak ada media</SelectLabel>
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" name="title" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="neutral">Batal</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">{isLoading ? 'Loading...' : 'Tambah Live'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}