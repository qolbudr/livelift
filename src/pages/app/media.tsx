import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { JSX } from "react";
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
import { DialogAddMedia } from "@/components/dialog/dialog_add_media";

const Media = (): JSX.Element => {
  return <>
    <Card>
      <CardContent>
        <div className="w-full h-[300px] my-10 flex items-center justify-center">
          <div className="no-media text-center">
            <div className="flex justify-center w-full">
              <Icon.JournalAlbum className="size-[50px] " />
            </div>
            <Label className="block mb-3 mt-5 text-xl">Belum Ada Media</Label>
            <DialogAddMedia/>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
}

export default Media;