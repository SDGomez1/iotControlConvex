import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";
import { type Control, type FieldValues, useFieldArray } from "react-hook-form";

export default function ScaleData(props: { control: any }) {
  const { fields, append, remove } = useFieldArray({
    name: "scaleData",
    rules: { minLength: 1 },
    control: props.control,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            name={`scaleData${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dato {index + 1}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );
      })}
      <button type="button" onClick={() => append(0)}>
        Add Number
      </button>
    </>
  );
}
