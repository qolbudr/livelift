import { FormEvent, JSX, useEffect, useState } from "react";
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
import tz from '@/core/utils/timezone';
import moment from "moment-timezone";
import { useUser } from "@/core/hook/use_user";

export const FormLive = ({ item, getLive }: { item: Live, getLive: () => void }): JSX.Element => {
  const [isLoop, setLoop] = useState<boolean>(item.loop ? true : false);
  const [isSchedule, setSchedule] = useState<boolean>(item.scheduleAt ? true : false);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0)
  const [isConfirm, setConfirm] = useState<boolean>()

  const user = useUser();

  useEffect(() => {
    if (user && user!.package.scheduling) {
      setSchedule(item.scheduleAt ? true : false);
    } else {
      setSchedule(false);
    }

    if(user && user!.package.video_looping) {
      setLoop(item.loop ? true : false);
    } else {
      setLoop(false)
    }
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, live: Live) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const streamKey = formData.get('stream_key') as string;
      const rtmpUrl = formData.get('rtmp_url') as string;
      const scheduleAt = formData.get('schedule_at') as string | null;
      await startLive(live, streamKey, rtmpUrl, isLoop, scheduleAt ? tz.fromTime(scheduleAt).utc().toDate() : null);
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
            <img src={getTenantUrl() + '/thumbnail/' + item.video.thumbnail} alt={item.title} className="w-full h-[180px] object-cover rounded-md" />
            <Label className="mt-4 text-lg">{item.title}</Label>
            <div className="grid gap-3">
              <Label htmlFor="key">Stream Key</Label>
              <Input type="text" id="key" name="stream_key" defaultValue={item.streamKey} placeholder="Stream Key" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="rtmp">RTMP URL</Label>
              <Input type="url" id="rtmp" name="rtmp_url" defaultValue={item.rtmpUrl} placeholder="RTMP URL" required />
            </div>
            {user && (user!.package.video_looping || user!.package.scheduling) && <div className="grid gap-3 my-3">
              <div className="flex items-center gap-x-4">
                {user && user!.package.video_looping && <div className="flex gap-x-2">
                  <Checkbox onClick={() => setLoop(!isLoop)} id="loop" checked={isLoop ? true : false} />
                  <Label htmlFor="loop">Loop?</Label>
                </div>}
                {user && user!.package.scheduling && <div className="flex gap-x-2">
                  <Checkbox onClick={() => setSchedule(!isSchedule)} id="schedule" checked={isSchedule ? true : false} />
                  <Label htmlFor="schedule">Schedule?</Label>
                </div>}
              </div>
            </div>}
            {
              user && user!.package.scheduling && isSchedule &&
              <div className="grid gap-3">
                <Label htmlFor="schedule">Schedule At?</Label>
                <Input type="datetime-local" id="schedule" defaultValue={item.scheduleAt ? moment(item.scheduleAt).utc().local().format('YYYY-MM-DDTHH:mm') : tz.timezone.format('YYYY-MM-DDTHH:mm')} name="schedule_at" />
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