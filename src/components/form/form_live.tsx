import { FormEvent, JSX, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getTenantUrl } from "@/core/utils/tenant_url";
import { Live } from "@/core/types/live";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleError } from "@/core/utils/handle_error";
import { LiveRepository } from "@/core/repository/live_repository";
import { DialogConfirmation } from "@/components/dialog/dialog_confirmation";

export const FormLive = ({ item, getLive }: { item: Live, getLive: () => void }): JSX.Element => {
  const [isLoop, setLoop] = useState<boolean>(item.loop ? true : false);
  const [isSchedule, setSchedule] = useState<boolean>(item.scheduleAt ? true : false);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0)
  const [isConfirm, setConfirm] = useState<boolean>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, live: Live) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const streamKey = formData.get('stream_key') as string;
      const rtmpUrl = formData.get('rtmp_url') as string;
      const scheduleAt = formData.get('schedule_at') as string | null;
      alert(scheduleAt);
      await startLive(live, streamKey, rtmpUrl, isLoop, scheduleAt ? new Date(scheduleAt) : null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(handleError(e))
    }
  }

  const startLive = async (live: Live, streamKey: string, rtmpUrl: string, loop: boolean, scheduleAt: Date | null) => {
    try {
      const response = await LiveRepository.startLive({ id: live.id, title: live.title, videoId: live.videoId, streamKey: streamKey, rtmpUrl: rtmpUrl, loop: loop, scheduleAt: scheduleAt });
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

  return <>
    <DialogConfirmation open={isConfirm} onClose={() => setConfirm(false)} onConfirm={() => deleteLive(id)} />
    <form onSubmit={(e) => handleSubmit(e, item)}>
      <Card className="w-full flex flex-col justify-between">
        <CardContent>
          <div className="flex flex-col gap-3 justify-center h-full">
            <video className="w-full h-full object-cover rounded-md" controls>
              <source src={getTenantUrl() + '/' + item.video.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Label className="mt-4 text-lg">{item.title}</Label>
            <div className="grid gap-3">
              <Label htmlFor="key">Stream Key</Label>
              <Input type="text" id="key" name="stream_key" defaultValue={item.streamKey} placeholder="Stream Key" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="rtmp">RTMP URL</Label>
              <Input type="url" id="rtmp" name="rtmp_url" defaultValue={item.rtmpUrl} placeholder="RTMP URL" required />
            </div>
            <div className="grid gap-3 my-3">
              <div className="flex items-center gap-x-4">
                <div className="flex gap-x-2">
                  <Checkbox onClick={() => setLoop(!isLoop)} id="loop" checked={isLoop ? true : false} />
                  <Label htmlFor="loop">Loop?</Label>
                </div>
                <div className="flex gap-x-2">
                  <Checkbox onClick={() => setSchedule(!isSchedule)} id="schedule" checked={isSchedule ? true : false} />
                  <Label htmlFor="schedule">Schedule?</Label>
                </div>
              </div>
            </div>
            {
            isSchedule &&
              <div className="grid gap-3">
                <Label htmlFor="schedule">Schedule At?</Label>
                <Input type="datetime-local" id="schedule" defaultValue={item.scheduleAt ? new Date(item.scheduleAt).toISOString().slice(0,16) : new Date().toISOString().slice(0,16)} name="schedule_at" />
              </div>
            }
          </div>
        </CardContent>
        <CardFooter className="flex gap-x-3">
          {!item.live && <Button type="submit">{isSchedule ? 'Simpan' : 'Start Live'}</Button>}
          {item.live && <Button type="button" onClick={() => stopLive(item)}>Stop Live</Button>}
          <Button type="button" onClick={() => openConfirm(item.id)} className="w-full" variant={"neutral"}>Hapus Live</Button>
        </CardFooter>
      </Card>
    </form>
  </>
}