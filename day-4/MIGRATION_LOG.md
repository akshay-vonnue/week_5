# TYPES
## Action

### Property does not exist on type
dynamic payload types for each type of action.

```
export type Action = 
    | {
        type: 'TASK_ADDED',
        payload:string
    }
    | {
        type: 'TASK_TOGGLED',
        payload:number
    }
    | {
        type:'CLEAR_TASKS'
    }
    | {
        type: 'TASK_UPDATE',
        payload: {
            id: number,
            text:string
        }
    }
    | {
        type: 'TASK_DELETED',
        payload:number
    }

```

## Modal component
### Object is possibly null

id used for targetting task in edit mode in the dynamic modal.Added '?' to the id parameter so that it is useful in the modal in edit mode only.

```
export function Modal(type:string, id?: number) {
    .....
}
```