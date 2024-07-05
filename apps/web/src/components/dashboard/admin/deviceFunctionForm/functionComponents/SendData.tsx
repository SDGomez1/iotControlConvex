import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import { Switch } from "components/primitives/Switch";

export default function SendaData() {
  return (
    <FormField
      name="sendData"
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-2 lg:w-1/2">
          <FormLabel className="text-xs lg:text-sm">
            ¿Esta funcion envia datos al usuario?
          </FormLabel>

          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
