import {create} from 'zustand'

export const useSearchStore = create((set) => ({
    search: '',
    setSearch: (search: string) => set({search}),
    resetSearch: () => set({search: ''})
}))
