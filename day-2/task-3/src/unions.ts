type ApiResponse<T> = { success: true; data: T } | { success: false, error: string, statusCode: number }

function handleResponse<T>(response: ApiResponse<T>) {
    if (!response.success) {
        console.log("error")
    }
    console.log("success")
}

interface User{
    id: number,
    name: string,
    place: string
}

type LoadingState<T> =
    | "idle"
    | "loading"
    | { status: 'success', data: T }
    | { status: 'error', error: Error }
    ;

function handleLoadingState(state: LoadingState<User[]>) {
    if (state === 'idle') {
        return `<div> idle state </div>`
    }
    
    else if (state === 'loading') {
        return `<div> loading... </div>`
    }

    
    else if (state.status === 'error') {
        return `<div> ${state.error.message} </div>`
    }
    
    if (state.data.length === 0) {
        return `<div>no user present</div>`
    }

    const listItems = state.data.map(user => `<li>${user.id} - ${user.name} - ${user.place}</li>`).join(' ')

    return `<ul>${listItems}</ul>`
}