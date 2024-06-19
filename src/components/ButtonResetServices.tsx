import { useTypeServiceStore } from "@/store/TypeServiceStore";

export default function ButtonResetServices() {
    //const useTypeService = useTypeServiceStore((state: any) => state.id);
    
    const reset = () => {
        useTypeServiceStore.setState({ id: 0 });
    }

    return (
        <button
            className="w-80 md:text-end text-xl font-semibold hover:underline"
            onClick={reset}
          >
            Mostrar todos
          </button>
    )
}