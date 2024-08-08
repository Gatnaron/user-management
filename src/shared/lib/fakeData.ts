import { faker } from '@faker-js/faker';
import { User, roles, workBorders } from '../../entities/User/model/types/User';

export const generateFakeUsers = (count: number): User[] => {
    return Array.from({ length: count }).map(() => {
        const randomRoles = faker.helpers.arrayElements(roles, faker.datatype.number({ min: 1, max: roles.length }));
        const randomWorkBorders = faker.helpers.arrayElements(workBorders, faker.datatype.number({ min: 1, max: workBorders.length }));

        return {
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            roles: randomRoles,
            workBorders: randomWorkBorders
        };
    });
};