import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { filterList } from "@/config/shop-options-config";
import { useFormContext } from "react-hook-form";
import FilterCheckbox from "./FilterCheckbox";

const FiltersSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Filters</h2>
        <FormDescription>
          Select the filters that your shop needs
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="filters"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {filterList.map((filterItem) => (
                <FilterCheckbox filters={filterItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FiltersSection;
