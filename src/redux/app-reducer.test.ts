import {appReducer, InitialStateType, setAttemptsAC, setDisableAC, setFirstCardAC, setOpenCardAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        openCard: false,
        firstCard: null,
        disable: false,
        attempts: 0,
        imageForCard: [1, 2, 3, 4, 5, 6, 7, 8]
    }
});

test('Card must be open after clicking', () => {
    const action = setOpenCardAC(true)
    const endState = appReducer(startState, action)
    expect(endState.openCard).toBe(true);
})
test('The content of the first card must be added after clicking', () => {
    const action = setFirstCardAC(3)
    const endState = appReducer(startState, action)
    expect(endState.firstCard).toBe(3);
})
test('Cards must be disabled', () => {
    const action = setDisableAC(true)
    const endState = appReducer(startState, action)
    expect(endState.disable).toBe(true);
})
test('The field the number of attempts should increase after failure', () => {
    const action = setAttemptsAC(startState.attempts += 1)
    const endState = appReducer(startState, action)
    expect(endState.attempts).toBe(1);
})