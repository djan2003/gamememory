import './App.css';
import React, {useCallback} from "react";
import {Card} from "./components/Card/Card";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAttemptsAC, setDisableAC, setFirstCardAC, setOpenCardAC} from "./redux/app-reducer";
import {AppRootStateType} from "./redux/store";

type CardType = {
    image: number
    openCard?: boolean
}

const App = React.memo(() => {

    const dispatch = useDispatch()
    const openCard = useSelector<AppRootStateType, boolean>(state => state.app.openCard)
    const firstCard = useSelector<AppRootStateType, null | number>(state => state.app.firstCard)
    const disable = useSelector<AppRootStateType, boolean>(state => state.app.disable)
    let attempts = useSelector<AppRootStateType, number>(state => state.app.attempts)
    const imageForCard = useSelector<AppRootStateType, Array<number>>(state => state.app.imageForCard)
    const doubleImg = [...imageForCard, ...imageForCard]

    function shuffle(array: Array<number>) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const preparedArray = shuffle(doubleImg).map((image: number) => {
        return {
            image: image,
        }
    })

    let [arrayForGame, setArrayForGame] = useState<Array<CardType>>(preparedArray)
    const goBackIfError = (id: number, openCard: boolean) => {
        setArrayForGame(arrayForGame = arrayForGame.map((imgC: CardType, i: number) => {
            dispatch(setOpenCardAC(!openCard))
            if (i === id) {
                return {
                    image: imgC.image,
                }
            } else return imgC
        }))
    }
    let cardHandler = useCallback((id: number) => {
        if (firstCard == null) {
            dispatch(setFirstCardAC(id))
        } else {
            let firstCardContent = arrayForGame[firstCard].image
            let secondCardContent = arrayForGame[id].image
            if (firstCardContent === secondCardContent) {
                dispatch(setFirstCardAC(null))
            } else {
                dispatch(setDisableAC(true))
                setTimeout(() => {
                    goBackIfError(firstCard, true)
                    goBackIfError(id, true)
                    dispatch(setFirstCardAC(null))
                    dispatch(setDisableAC(false))
                    dispatch(setAttemptsAC(attempts += 1))
                }, 1500)
            }
        }
        setArrayForGame(arrayForGame = arrayForGame.map((imgC: CardType, i: number) => {
            if (i === id) {
                return {
                    image: imgC.image,
                    openCard: !openCard
                }
            } else return imgC
        }))

    }, [goBackIfError, dispatch, arrayForGame])


    return (
        <div className={"main"}>
            {arrayForGame.map((img: CardType, id: number) => {
                return <Card cardHandler={() => cardHandler(id)}
                             key={id}
                             content={img.image}
                             openCard={img.openCard}
                             disable={disable}
                />
            })}
            <h2>number of attempts: {attempts}</h2>
        </div>
    );
})

export default App;
