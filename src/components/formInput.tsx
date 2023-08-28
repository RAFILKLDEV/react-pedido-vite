export function FormInput({ label, input }: { label: string, input: string }) {
    return <div className="">
        <div className="bg-gray-300 border-2 w-40 border-black p-2">{label}: {input}</div>
    </div>
}