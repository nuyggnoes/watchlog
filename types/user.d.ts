type AuthUser = {
    id: string;
    email: string;
    password: string;
}

type UserProfile = {
    user_id: string;
    name: string;
}

type User = AuthUser & {
    name?: string;
}

type UserWithOutPassword = Omit<User, 'password'>;

type ProfileUser = {
    id: string;
    email: string;
    name: string;
}

type UserState = {
  isLoggedIn: boolean;
  user: UserWithOutPassword | null;
  login: (user: UserWithOutPassword) => void;
  logout: () => void;
}
