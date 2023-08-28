export function Avisar({ aviso, func, setModal }: { aviso: string, func: Function, setModal: Function }) {
    return (
        <div onClick={() => setModal(false)} className="w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-5 bg-gray-500 flex flex-col gap-4">
                <div>{aviso}</div>
                <div>
                    <button onClick={() => {
                        func()
                        setModal(false)
                    }}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}