interface IAdminBtnProps {
    onClick: () => void,
    children: string | JSX.Element | JSX.Element[]
}

export const AdminButton = ({onClick, children}: IAdminBtnProps) => {
    return <button className="py-2 px-3 rounded-lg bg-mainRed" onClick={onClick}>
        {children}
    </button>
}