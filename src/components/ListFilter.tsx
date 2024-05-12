import { filterList } from "@/config/shop-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (filters: string[]) => void;
  selectedFilters: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const ListFilter = ({
  onChange,
  selectedFilters,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedFilter = event.target.value;
    const isChecked = event.target.checked;

    const newFiltersList = isChecked
      ? [...selectedFilters, clickedFilter]
      : selectedFilters.filter((filter) => filter !== clickedFilter);

    onChange(newFiltersList);
  };

  const handleFiltersReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By List</div>
        <div
          onClick={handleFiltersReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {filterList
          .slice(0, isExpanded ? filterList.length : 7)
          .map((filter) => {
            const isSelected = selectedFilters.includes(filter);
            return (
              <div className="flex">
                <input
                  id={`filter_${filter}`}
                  type="checkbox"
                  className="hidden"
                  value={filter}
                  checked={isSelected}
                  onChange={handleFiltersChange}
                />
                <Label
                  htmlFor={`filter_${filter}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {filter}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default ListFilter;
