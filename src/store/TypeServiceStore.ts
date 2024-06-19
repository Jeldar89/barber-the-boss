import { create } from 'zustand'

export const useTypeServiceStore = create((set) => ({
    typeService: 0,
    setTypeService: (typeService: number | string) => set({ typeService }),
    resetTypeService: () => set({ typeService: 0 })
}))