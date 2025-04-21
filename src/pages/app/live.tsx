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
import { FormLive } from "@/components/form/form_live";

const LivePage = (): JSX.Element => {
  const [live, setLive] = useState<Live[]>([])

  const getLive = async () => {
    try {
      const response = await LiveRepository.getLive();
      setLive(response!.data);
    } catch (e) {
      toast.error(handleError(e));
    }
  }

  useEffect(() => { getLive() }, [])

  return <>
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
            <FormLive key={index} item={item} getLive={getLive}/>
          ))}
        </div>
      </>
    }
  </>
}

export default LivePage;