import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";
import { type Control, type FieldValues, useFieldArray } from "react-hook-form";
import { deviceFunctionFormType } from "types/deviceFunctionClientData";

export default function ScaleData(props: {
  control: Control<deviceFunctionFormType>;
}) {
  return (
    <>
      {/* {fields.map((field, index) => {
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
      })} */}
      <button type="button">Add Number</button>
    </>
  );
}
