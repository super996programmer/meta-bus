import { FC } from 'react'

export interface IBusKeyBoard {
    name: string;
}

const BusKeyBoard: FC<IBusKeyBoard> = (props) => {
    const { children, name } = props

    return (
        <div>
            {children},{name}
        </div>
    )
}

export default BusKeyBoard
