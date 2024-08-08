import create from 'zustand';

interface WorkBorder {
    id: string;
    name: string;
}

interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName?: string;
    roles: string[];
    workBorders: WorkBorder[];
}

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    updateUser: (updatedUser: User) => void;
    deleteUser: (userId: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        ),
    })),
    deleteUser: (userId) => set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
    })),
}));

export default useUserStore;
