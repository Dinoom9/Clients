import React from 'react'
import './ModalButtons.scss'
import { Button } from '@mui/material'

interface ModalButtonsProps {
    firstButtonFunc: () => void;
    secondButtonFunc: () => void;
    firstButtonTitle: string;
    secondButtonTitle: string;
}

export default function ModalButtons({ firstButtonFunc, secondButtonFunc, firstButtonTitle, secondButtonTitle }: ModalButtonsProps) {
    return (
        <div className='buttonsContainer'>
            <Button variant='contained' onClick={firstButtonFunc}>{firstButtonTitle}</Button>
            <Button variant='contained' onClick={secondButtonFunc}>{secondButtonTitle}</Button>
        </div>
    )
}
