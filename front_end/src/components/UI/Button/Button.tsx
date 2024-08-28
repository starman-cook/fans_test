import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import styles from './Button.module.css'

type Props = {
    onClick?: React.MouseEventHandler
    className?: string
    children?: string | ReactNode | ReactNode[]
}

const Button: FunctionComponent<Props> = (props: Props): ReactElement => {
    
    return (
        <button onClick={props.onClick} className={`${styles.Button} ${props.className || ''}`}>{props.children}</button>
    )
}

export default Button