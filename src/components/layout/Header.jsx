import React from 'react'
import { useSelector } from 'react-redux'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Navbar from '../Navbar/Navbar'

export default function Header() {
    const { title } = useSelector((state) => state.auth)
    const titlePrefix = "K2システム | ";
    useDocumentTitle(title, titlePrefix)
    return (
        <>
            <Navbar title={title} />
        </>
    )
}
