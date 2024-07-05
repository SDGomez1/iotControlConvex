import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";

export default function MaxInterval() {
  return (
    <FormField
      name="maxInterval"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm lg:text-base">
            Intervalo maximo
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
