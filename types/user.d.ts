type User = {
    id: string;
    email: string;
    password: string;
}

type UserWithOutPassword = Omit<User, 'password'>;

type UserState = {
  isLoggedIn: boolean;
  user: UserWithOutPassword | null;
  login: (user: UserWithOutPassword) => void;
  logout: () => void;
}
