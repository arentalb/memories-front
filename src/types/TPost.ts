export interface PostCore {
  title: string;
  message: string;
  creator: string;
}

export interface PostBase extends PostCore {
  tags: string[];
  selectedFile?: string | null;
}

export interface TPost extends PostBase {
  _id: string;
  likeCount: number;
  createdAt: string;
}
