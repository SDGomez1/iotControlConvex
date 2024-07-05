import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "components/primitives/Form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "components/primitives/Select";

export default function TypeOfFunction() {
  return (
    <FormField
      name="typeOfFunction"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm lg:text-base">
            Tipo de función
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="data-[state=open]:border-accent">
                <SelectValue placeholder="Selecciona un tipo de función" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-dark">
                <SelectItem
                  className="focus:bg-black/10 dark:focus:bg-white/10"
                  value="COMMAND"
                >
                  Por comandos
                </SelectItem>
                <SelectItem
                  className="focus:bg-black/10 dark:focus:bg-white/10"
                  value="FREE"
                >
                  Libre
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
