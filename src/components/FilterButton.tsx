import Minus from "@/icons/Minus";
import Plus from "@/icons/Plus";

interface IFilterButtonProps {
  id: number|string;
  name: string | undefined;
  isSelected?: boolean;
  select(id: number | string): void;
}

export default function FilterButton({
  id,
  name,
  isSelected,
  select,
}: IFilterButtonProps) {
  return (
    <button
      onClick={() => {
        select(id);
      }}
      className={`${
        isSelected ? "bg-gray-200 underline" : ""
      } flex flex-wrap justify-between hover:bg-gray-200 px-10 md:px-5 lg:px-10 py-2 uppercase w-60 md:w-40 lg:w-52 text-left text-sm md:text-base lg:text-lg font-semibold`}
    >
      <span> {name} </span>
      {isSelected && <Minus />}
      {!isSelected && <Plus />}
    </button>
  );
}
