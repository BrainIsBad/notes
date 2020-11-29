import React, {useContext, createContext, useState} from 'react'

const ModalContext = createContext()

export const useModal = () => {
    return useContext(ModalContext)
}

export const ModalProvider = ({children}) => {
    const [visible, setVisible] = useState(false)

    const toggle = () => {
        setVisible(prev => !prev)
    }
    return (
        <ModalContext.Provider value={{toggle, visible}}>
            { children }
        </ModalContext.Provider>
    )
}