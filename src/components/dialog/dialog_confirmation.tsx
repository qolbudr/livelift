import { JSX } from "react";
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

export const DialogConfirmation = ({open, onClose, onConfirm}: {open?: boolean, onClose: () => void, onConfirm: () => void}): JSX.Element => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>
            Apakah anda yakin melakukan tindakan tersebut?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose} variant="neutral">Tidak</Button>
          </DialogClose>
          <Button onClick={onConfirm} type="submit">Ya</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}