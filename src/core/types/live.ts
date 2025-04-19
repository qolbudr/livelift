import { Video } from "@/core/types/video";

export type Live = {
  id: number;
  title: string;
  videoId: number;
  streamKey?: string;
  rtmpUrl?: string;
  loop: Boolean;
  scheduleAt?: string;
  live: Boolean;
  video: Video;
  createdAt: string;
  updatedAt: string;
}