import { useEffect, useState } from "react"

export default function useRightClickMenu() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    const handleContextmenu = (e) => {
        e.preventDefault();
        setX(e.pageX);
        setY(e.pageY);
        setShowMenu(true);
    }
    const handleClick = () => {
        showMenu && setShowMenu(false)
    }
    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleContextmenu)
    })

    return { x, y, showMenu }
}