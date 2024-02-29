export interface Task {
  id: string;
  title: string | null;
  type: string | null;
  customer: string | null;
  customerName: string | null;
  description: string | null;
  status: string | null;
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
