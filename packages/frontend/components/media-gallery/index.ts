import type { Media as IMedia } from "~/utils/types/modals";

export enum MediaWindow {
  MEDIA_LIST = "MEDIA_LIST",
  ADD_MEDIA = "ADD_MEDIA",
  UPDATE_NEDIA = "UPDATE_NEDIA",
  CONFIRM_DELETE = "CONFIRM_DELETE",
}

export enum MediaType {
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  document = "document",
}

export interface Media extends IMedia {}

export interface MediaCategory {
  id: number;
  name: string;
}
