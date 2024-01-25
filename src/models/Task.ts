export interface Task {
  id: number | 0;
  title: string;
  status: string;
  userCreate: string;
  fullNameCreate: string;
  avatarUserCreate: string;
  watching: Watching[];
}

export interface Watching {
  username: number;
  fullName: string;
  avatar: string;
}
