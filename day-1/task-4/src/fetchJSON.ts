export async function fetchJSON(url:string):Promise<unknown> {
    const response = await fetch(
        url
    );
    if (!response) {
        throw new HttpError(404,"something went wrong...")
    }
    const data:unknown = await response.json()
    return data;
}

export class HttpError extends Error{
    statusCode:number;
    constructor(statusCode:number,message:string) {
        super(message)

        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}