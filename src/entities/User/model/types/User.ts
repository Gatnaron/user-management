export interface WorkBorder {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName?: string;
    roles: string[];
    workBorders: WorkBorder[];
}

export const roles = ['ANT', 'ANT_MANAGER', 'ANT_OFFICER', 'DEVELOPER'];

export const workBorders: WorkBorder[] = [
    { id: '1', name: 'Белгатой' },
    { id: '2', name: 'Шали' },
    { id: '3', name: 'Урус-Мартан' }
];
