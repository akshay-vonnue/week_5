// https://oneuptime.com/blog/post/2026-01-30-typescript-type-safe-api-clients/view

function fetchJSON() {
    
}

class ApiClient{

    private baseURL: string;

    constructor(baseURL:string) {
        this.baseURL = baseURL
    }
    
    async get<T>(path: T): Promise<T>{
        
        const response = await fetch(`${this.baseURL}${path}`);
        const json = await response.json()

        return json.data;
    }

    async post<T, B>(path:T, body: B):Promise<T> {
        
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })

        let json = await response.json()

        return json.data
    }

    async put<T, B>(path:T, body:B) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(body)
        });

        let json = await response.json()

        return response.status
    }
}