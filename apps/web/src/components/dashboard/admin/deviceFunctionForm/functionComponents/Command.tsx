import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";

export default function Command() {
  return (
    <FormField
      name="command"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel className="text-sm lg:text-base">Comando</FormLabel>
          <FormControl>
            <Input
              className=" text-sm focus:border-accent lg:text-base dark:bg-dark"
              {...field}
              autoComplete="off"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
