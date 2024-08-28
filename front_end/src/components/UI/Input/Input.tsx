import React, { FunctionComponent, HTMLInputTypeAttribute, ReactElement } from "react";
import styles from './Input.module.css'

type Props = {
    onChange: React.ChangeEventHandler
    value: string
    placeholder?: string
    className?: string
    type?: HTMLInputTypeAttribute
    name?: string
    required?: boolean
}

const Input: FunctionComponent<Props> = (props: Props): ReactElement => {
    
    return (
        <input onChange={props.onChange} value={props.value} placeholder={props.placeholder} className={`${styles.Input} ${props.className || ''}`} type={props.type || 'text'} name={props.name} required={props.required} />
    )
}

export default Input