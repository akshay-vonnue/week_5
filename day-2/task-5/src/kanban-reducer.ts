type Status = 'todo' | 'in-progress' | 'done'

type State = {
    id: number,
    text: string,
    status:Status
}

// type Action = {
//     type: 'ADD_CARD' | 'REMOVE_CARD'| 'MOVE_CARD',
//     payload:
//     {
//         id?:number,
//         text?: string,
//         status: Status
//         to?:Status
//     }
// }

type Action = 
    | {
        type: 'ADD_CARD',
        payload: {
            text: string,
            status:Status
        }
    }

    | {
        type: 'REMOVE_CARD',
        payload: {
            id:number
        }
    }

    | {
        type: 'MOVE_CARD',
        payload: {
            id: number,
            status:Status
        }
    }

function reducer(state: State[], action: Action):State[] {
    
    function getNextId(state: State[]) {
        if (state.length === 0) return 0
        let maxId: number = state.reduce((maxId, stateItem) => Math.max(stateItem.id, maxId), -1)
        return maxId + 1
    }

    switch (action.type) {
        case "ADD_CARD":
            if(!action.payload.text) return state
            return [
                ...state,
                {
                    id: getNextId(state),
                    text: action.payload.text,
                    status:action.payload.status
                }
            ]
        
        case "MOVE_CARD":
            return state.map(stateItem => {
                if (stateItem.id === action.payload.id) {
                    return {
                        ...stateItem,
                        status:action.payload.status
                    }
                }
                return stateItem
            })
        
        case 'REMOVE_CARD':
            return state.filter(stateItem => stateItem.id !== action.payload.id)
    
    }
}