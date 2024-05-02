export interface Task {
  id: string;
  title?: string | null;
  type?: string | null;
  customer?: string | null;
  customerName?: string | null;
  description?: string | null;
  status?: string | null;
  userCreate?: string | null;
  fullNameCreate?: string | null;
  avatarUserCreate?: string | null;
  watching: Watching[] | [];
  Attachment: Attachment[] | [];
  deadline?: Date | null;
}

export interface Watching {
  username: string;
  fullName: string;
  avatar: string;
}

export interface Attachment {
  uri: string;
  size: string;
  fileType: string;
  fileName: string;
  choice: boolean | false;
}
