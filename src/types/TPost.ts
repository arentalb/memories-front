export interface PostBase {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string | null;
}

export interface TPost extends PostBase {
  _id: string;
  likeCount: number;
  createdAt: string;
}
