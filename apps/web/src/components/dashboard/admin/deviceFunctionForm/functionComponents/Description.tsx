import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Input } from "components/primitives/Input";

export default function Description() {
  return (
    <FormField
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm lg:text-base">
            Descripción de la función
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
