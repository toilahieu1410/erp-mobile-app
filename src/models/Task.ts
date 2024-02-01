export interface Task {
  id: string;
  title: string;
  status: string;
  userCreate: string;
  fullNameCreate: string;
  avatarUserCreate: string;
  watching: Watching[];
}

export interface Watching {
  username: string;
  fullName: string;
  avatar: string;
}
