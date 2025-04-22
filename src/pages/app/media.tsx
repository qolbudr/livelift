import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { JSX, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { DialogAddMedia } from "@/components/dialog/dialog_add_media";
import { Video } from "@/core/types/video";
import { MediaRepository } from "@/core/repository/media_repository";
import { toast } from "sonner";
import { handleError } from "@/core/utils/handle_error";
import { getTenantUrl } from "@/core/utils/tenant_url";
import { DialogConfirmation } from "@/components/dialog/dialog_confirmation";
import Head from "next/head";

const Media = (): JSX.Element => {
  const [video, setVideo] = useState<Video[]>([])
  const [id, setId] = useState<number>(0)
  const [isConfirm, setConfirm] = useState<boolean>()

  const getMedia = async () => {
    try {
      const response = await MediaRepository.getMedia();
      setVideo(response!.data);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const openConfirm = (id: number) => {
    setId(id);
    setConfirm(true);
  }

  const deleteMedia = async (id: number) => {
    try {
      const response = await MediaRepository.deleteMedia(id);
      toast.success(response!.message);
      getMedia();
      setConfirm(false);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  useEffect(() => { getMedia() }, [])

  return <>
    <Head>
      <title>Livelift - Media</title>
    </Head>
    <DialogConfirmation open={isConfirm} onClose={() => setConfirm(false)} onConfirm={() => deleteMedia(id)} />
    {video.length == 0 &&
      <Card>
        <CardContent>
          <div className="w-full h-[300px] my-10 flex items-center justify-center">
            <div className="no-media text-center">
              <div className="flex justify-center w-full">
                <Icon.JournalAlbum className="size-[50px] " />
              </div>
              <Label className="block mb-3 mt-5 text-xl">Belum Ada Media</Label>
              <DialogAddMedia onAdd={getMedia} />
            </div>
          </div>
        </CardContent>
      </Card>
    }

    {video.length > 0 &&
      <>
        <DialogAddMedia onAdd={getMedia} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 items-stretch">
          {video.map((item, index) => (
            <Card key={index} className="w-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col justify-center h-full">
                  <img src={getTenantUrl() + '/thumbnail/' + item.thumbnail} alt={item.title} className="w-full h-[180px] object-cover rounded-md" />
                  <Label className="mt-4 text-lg">{item.title}</Label>
                  <Label className="mt font-normal">{item.description}</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => openConfirm(item.id)} className="w-full" variant={"neutral"}>Hapus Video</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    }
  </>
}

export default Media;