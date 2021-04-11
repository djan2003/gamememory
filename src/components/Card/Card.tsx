import React from "react";
import "./CardStyle.css"

type PropsType = {
    cardHandler: () => void
    key: number
    content: number
    openCard: boolean | undefined
    disable: boolean

}

export const Card = React.memo((props: PropsType) => {

    let content;
    if (props.openCard) {
        content = props.content
    } else content = ''
    return (
        <>
            <div onClick={props.cardHandler}
                 className={`${props.openCard ? 'card-opened' : 'card'} ${props.disable ? 'disable' : ''}`}>
                {content}
            </div>
        </>
    )
})