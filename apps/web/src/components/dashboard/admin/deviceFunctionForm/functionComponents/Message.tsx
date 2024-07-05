import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Textarea } from "components/primitives/TextArea";

export default function Message() {
  return (
    <FormField
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm lg:text-base">
            Escribe un mensaje para el usuario
          </FormLabel>
          <FormControl>
            <Textarea
              className="text-sm focus:border-accent lg:text-base dark:bg-dark"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
