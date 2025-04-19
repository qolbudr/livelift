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
import { DialogAddLive } from "@/components/dialog/dialog_add_live";
import { LiveRepository } from "@/core/repository/live_repository";
import { Live } from "@/core/types/live";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const LivePage = (): JSX.Element => {
  const [live, setLive] = useState<Live[]>([])
  const [id, setId] = useState<number>(0)
  const [isConfirm, setConfirm] = useState<boolean>()
  const [isLoading, setLoading] = useState<boolean>()

  const getLive = async () => {
    try {
      const response = await LiveRepository.getLive();
      setLive(response!.data);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, live: Live) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const streamKey = formData.get('stream_key') as string;
      const rtmpUrl = formData.get('rtmp_url') as string;
      await startLive(live, streamKey, rtmpUrl);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
  }

  const startLive = async (live: Live, streamKey: string, rtmpUrl: string) => {
    try {
      const response = await LiveRepository.startLive({ id: live.id, title: live.title, videoId: live.videoId, streamKey: streamKey, rtmpUrl: rtmpUrl });
      toast.success(response!.message);
      getLive();
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const openConfirm = (id: number) => {
    setId(id);
    setConfirm(true);
  }

  const deleteLive = async (id: number) => {
    try {
      const response = await LiveRepository.deleteLive(id);
      toast.success(response!.message);
      getLive();
      setConfirm(false);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  const stopLive = async (live: Live) => {
    try {
      const response = await LiveRepository.stopLive(live);
      toast.success(response!.message);
      getLive();
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  useEffect(() => { getLive() }, [])

  return <>
    <DialogConfirmation open={isConfirm} onClose={() => setConfirm(false)} onConfirm={() => deleteLive(id)} />
    {live.length == 0 &&
      <Card>
        <CardContent>
          <div className="w-full h-[300px] my-10 flex items-center justify-center">
            <div className="no-media text-center">
              <div className="flex justify-center w-full">
                <Icon.CameraVideo className="size-[50px] " />
              </div>
              <Label className="block mb-3 mt-5 text-xl">Belum Ada Live</Label>
              <DialogAddLive onAdd={getLive} />
            </div>
          </div>
        </CardContent>
      </Card>
    }

    {live.length > 0 &&
      <>
        <DialogAddLive onAdd={getLive} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 items-stretch">
          {live.map((item, index) => (
            <form onSubmit={(e) => handleSubmit(e, item)} key={index}>
              <Card key={index} className="w-full flex flex-col justify-between">
                <CardContent>
                  <div className="flex flex-col gap-3 justify-center h-full">
                    <video className="w-full h-full object-cover rounded-md" controls>
                      <source src={getTenantUrl() + '/' + item.video.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <Label className="mt-4 text-lg">{item.title}</Label>
                    <div className="grid gap-3">
                      <Label htmlFor="key">Stream Key</Label>
                      <Input type="text" id="key" name="stream_key" value={item.streamKey} placeholder="Stream Key" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="rtmp">RTMP URL</Label>
                      <Input type="url" id="rtmp" name="rtmp_url" value={item.rtmpUrl} placeholder="RTMP URL" required />
                    </div>
                    <div className="grid gap-3 my-3">
                      <div className="flex items-center gap-x-2">
                        <Checkbox id="loop" />
                        <Label htmlFor="loop">Loop?</Label>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="schedule">Schedule At?</Label>
                      <Input type="datetime-local" id="schedule" name="schedule_at" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-x-3">
                  {!item.live && <Button type="submit">Start Live</Button>}
                  {item.live && <Button type="button" onClick={() => stopLive(item)}>Stop Live</Button>}
                  <Button type="button" onClick={() => openConfirm(item.id)} className="w-full" variant={"neutral"}>Hapus Live</Button>
                </CardFooter>
              </Card>
            </form>
          ))}
        </div>
      </>
    }
  </>
}

export default LivePage;