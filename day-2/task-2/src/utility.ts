// Write updateUser(id: string, changes: Partial<User>): Promise<User>

type User = {
    id:string,
    name: string,
    avatar:string,
    age: number,
    place: string,
    createdAt:Date
}

let users : User[] = [
    {
        id: "0",
        name: 'akshay',
        avatar:'https://image.com',
        age: 22,
        place: 'alappuzha',
        createdAt:new Date()
    },
    {
        id: "1",
        name: 'anjal',
        avatar:'https://image.com',
        age: 22,
        place: 'kannur',
        createdAt:new Date()
    }
]

async function updateUser(id: string, changes: Partial<User>): Promise<User>{
    let user = await users.find(user => user.id === id)
    if (!user) throw new Error('user not found')
    Object.assign(user,changes);
    return user
}

updateUser("1", { name: "delwin" }).then(user => console.log('Partial<User>',user));
setTimeout(() => {
    console.log(users)
}, 3000)

// Write createRequiredUser(data: Required<User>): User enforcing all fields are present

function createRequiredUser(data: Required<User>): User {
    return {...data}
}

console.log("Required<User>", createRequiredUser({ id: "10", name: 'fadhil', age: 33,avatar:'https://image.com', place: 'kzkd' ,createdAt: new Date()}))

// Pick

type UserPreview = Pick<User, "id" | "name">

let user: UserPreview = {
    id:"0",
    name: 'akshay'
}

// omit

type UserOmits = Omit<User, "id" | "place" | "createdAt">

let placelessUser: UserOmits = {
    name: 'hawas',
    age: 23,
    avatar:'https://image.com',
}

function createUser(user: UserOmits) {
    const newUser = {
        ...user,
        id: "12",
        createdAt:new Date()
    }

    return newUser
}

console.log("Omit",createUser(placelessUser))

// Record

type ConfigKey = "URL" | "PORT" | "AUTH_KEY"

let app_config: Record<ConfigKey, string> = {
    "AUTH_KEY": '#kshdfkjsfashdakdha',
    "PORT": "123",
    "URL":"https://example.com"
}