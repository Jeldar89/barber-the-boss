import Search from "@/icons/Search";
import { useSearchStore } from "@/store/SearchStore";

export default function SearchServicesBar() {
    const search = useSearchStore((state: any) => state.search);
    return(
        <div className="flex items-center">
          <span
            className="bg-gray-500 text-white p-2 ml-2 fill-white border border-gray-300"
          >
            <Search />
          </span>
          <input
            type="text"
            className="border border-gray-300 p-2 w-96"
            placeholder="Search"
            value={search}
            onChange={(e) => useSearchStore.setState({ search: e.target.value })}
          />
        </div>
    )
}