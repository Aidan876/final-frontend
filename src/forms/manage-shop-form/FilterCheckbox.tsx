import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  filters: string;
  field: ControllerRenderProps<FieldValues, "filters">;
};

const FilterCheckbox = ({ filters, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(filters)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, filters]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== filters)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{filters}</FormLabel>
    </FormItem>
  );
};

export default FilterCheckbox;
