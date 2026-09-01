type Role = 'admin' | 'editor' | 'viewer'

interface User{
    id: number,
    name: string,
    email: string,
    role: Role,
    createdAt: Date,
    avatar?: string
}

const user: User[] = [
    {
        id: 0,
        name: 'akshay',
        email: 'a@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        avatar:'https://image.com'
    },
    {
        id: 1,
        name: 'anjal',
        email: 'an@gmail.com',
        role: 'viewer',
        createdAt: new Date(),
        avatar:'https://image.com'
    },
    {
        id: 2,
        name: 'delwin',
        email: 'd@gmail.com',
        role: 'editor',
        createdAt: new Date(),
        avatar:'https://image.com'
    },
    {
        id: 3,
        name: 'fadhil',
        email: 'f@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        avatar:'https://image.com'
    },
    {
        id: 4,
        name: 'sona',
        email: 's@gmail.com',
        role: 'editor',
        createdAt: new Date(),
        avatar:'https://image.com'
    },
]

const newUser: User = {
    id: 5,
    name: 'hawas',
    email: 'h@gmail.com',
    role: 'editor',
    createdAt: new Date(),
    // age:21  excess property check error
}

type readOnlyUser = Readonly<User>

const newReadOnlyUser: readOnlyUser = {
    id: 6,
    name: 'bucker',
    email: 'b@gmail.com',
    role: 'editor',
    createdAt:new Date()
}

newUser.name = 'bucker'
// newReadOnlyUser.name = 'hawas'


function updateUser(user: User, changes: Partial<User>):User {
    return {...user,...changes}
}

let updatedUser = updateUser(newUser, { name: 'gowri', role: 'admin' })
console.log(updatedUser)



// difference between interface and type alias
// extending in interface
interface Animal{
    name:string
}

interface Dog extends Animal{
    bark:boolean
}

const dog: Dog = {
    name: 'kyser',
    bark: true,
    carnivore:true
}

// extending in type via intersections

type Computer = {
    name:string
}

type Laptop = Computer & {
    ssd: number
}

const thinkPad: Laptop = {
    name: 'lenovo',
    ssd:512
}

// it is possible to add new fields to existing fields
interface Animal{
    carnivore:boolean
}

let cat: Animal = {
    name: 'snowbell',
    carnivore:true
}

// type cannot be changed once it is created
// Duplicate identifier 'Computer'
// type Computer = {
//     isPortable: boolean;
// }