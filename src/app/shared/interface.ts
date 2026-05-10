export interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}


export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ProfileFormValue {
  name: string;
  age: number;
  password: string;
}

export interface StoredProfile {
  id: string;
  name: string;
  age: number;
  createdAt: string;
}
