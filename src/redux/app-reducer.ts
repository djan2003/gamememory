export type InitialStateType = {
    openCard: boolean
    firstCard: null | number
    disable: boolean
    attempts: number
    imageForCard: Array<number>

}

const initialState: InitialStateType = {
    openCard: false,
    firstCard: null,
    disable: false,
    attempts: 0,
    imageForCard: [1, 2, 3, 4, 5, 6, 7, 8]
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-OPEN-CARD':
            return {...state, openCard: action.openCard}
        case 'APP/SET-FIRST-CARD':
            return {...state, firstCard: action.firstCard}
        case 'APP/SET-DISABLE':
            return {...state, disable: action.disable}
        case 'APP/SET-ATTEMPTS':
            return {...state, attempts: action.attempts}
        default:
            return {...state}
    }
}
export const setOpenCardAC = (openCard: boolean) => ({type: 'APP/SET-OPEN-CARD', openCard} as const)
export const setFirstCardAC = (firstCard: null | number) => ({type: 'APP/SET-FIRST-CARD', firstCard} as const)
export const setDisableAC = (disable: boolean) => ({type: 'APP/SET-DISABLE', disable} as const)
export const setAttemptsAC = (attempts: number) => ({type: 'APP/SET-ATTEMPTS', attempts} as const)

type ActionsType =
    | SetOpenCardActionType
    | SetFirstCardActionType
    | SetDisableActionType
    | SetAttemptsActionType
export type SetOpenCardActionType = {
    type: 'APP/SET-OPEN-CARD'
    openCard: boolean
}
export type SetFirstCardActionType = {
    type: 'APP/SET-FIRST-CARD'
    firstCard: null | number
}
export type SetDisableActionType = {
    type: 'APP/SET-DISABLE'
    disable: boolean
}
export type SetAttemptsActionType = {
    type: 'APP/SET-ATTEMPTS'
    attempts: number
}