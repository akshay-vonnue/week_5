// interface User{
//     id: number,
//     name: string,
//     email: string,
//     isActive:boolean
// }

function isUser(value: unknown) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        typeof user.id === "number" &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.isActive === 'boolean'
    )
}


function fetchUrl(url:string) {
    let user = {
        id: 1,
        name: 'akshay',
        email: 'a@gmail.com',
        isActive:true
    }

    let user2 = {
        id: 2,
        name: 'delwin',
        email: 'a@gmail.com',
        isActive:"false"
    }

    return user2
}

function fetchUser() {
    let user = fetchUrl('https://user.com/1')
    if (!isUser(user)) {
        console.log("not a valid user...")
        return
    } else {
        console.log("user verified")
    }
}

fetchUser()