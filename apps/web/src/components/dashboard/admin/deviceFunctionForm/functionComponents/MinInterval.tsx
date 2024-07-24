import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";
import { Control } from "react-hook-form";
import { deviceFunctionFormType } from "types/deviceFunctionClientData";

export default function MinInterval(props: {
  control: Control<deviceFunctionFormType>;
}) {
  return (
    <FormField
      control={props.control}
      name="minInterval"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm lg:text-base">
            Intervalo minimo
          </FormLabel>
          <FormControl>
            <Input
              className="text-sm focus:border-accent lg:text-base dark:bg-dark"
              {...field}
              autoComplete="off"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
