'use client'
import { debounce } from "@/app/utils/debounce"

interface IForm {
    filterCharacter: (query: string) => Promise<void>
}

export const Form = ({ filterCharacter }: IForm ) => {
    const handleFilter = debounce(filterCharacter, 1000)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        handleFilter(value)
    }

    return <input className="w-full mb-4 p-2 border border-solid rounded" placeholder="Search character..." onChange={handleChange} />
}