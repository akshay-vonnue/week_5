"use strict";
const user = [
    {
        id: 0,
        name: 'akshay',
        email: 'a@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        avatar: 'https://image.com'
    },
    {
        id: 1,
        name: 'anjal',
        email: 'an@gmail.com',
        role: 'viewer',
        createdAt: new Date(),
        avatar: 'https://image.com'
    },
    {
        id: 2,
        name: 'delwin',
        email: 'd@gmail.com',
        role: 'editor',
        createdAt: new Date(),
        avatar: 'https://image.com'
    },
    {
        id: 3,
        name: 'fadhil',
        email: 'f@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        avatar: 'https://image.com'
    },
    {
        id: 4,
        name: 'sona',
        email: 's@gmail.com',
        role: 'editor',
        createdAt: new Date(),
        avatar: 'https://image.com'
    },
];
const newUser = {
    id: 5,
    name: 'hawas',
    email: 'h@gmail.com',
    role: 'editor',
    createdAt: new Date(),
    // age:21  excess property check error
};
const newReadOnlyUser = {
    id: 6,
    name: 'bucker',
    email: 'b@gmail.com',
    role: 'editor',
    createdAt: new Date()
};
newUser.name = 'bucker';
// newReadOnlyUser.name = 'hawas'
function updateUser(user, changes) {
    return { ...user, ...changes };
}
let updatedUser = updateUser(newUser, { name: 'gowri', role: 'admin' });
console.log(updatedUser);
const dog = {
    name: 'kyser',
    bark: true,
    carnivore: true
};
const thinkPad = {
    name: 'lenovo',
    ssd: 512
};
let cat = {
    name: 'snowbell',
    carnivore: true
};
// type cannot be changed once it is created
// Duplicate identifier 'Computer'
// type Computer = {
//     isPortable: boolean;
// }
