import { Form, FormField, FormItem } from "components/primitives/Form";
import { useForm } from "react-hook-form";
import { deviceFunctionForm } from "types/deviceFunctionClientData";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Name from "./functionComponents/Name";
import Description from "./functionComponents/Description";
import TypeOfFunction from "./functionComponents/TypeOfFunction";
import Message from "./functionComponents/Message";
import SendaData from "./functionComponents/SendData";
import Command from "./functionComponents/Command";
import UserInfo from "./functionComponents/UserInfo";
import TypeOfEntry from "./functionComponents/TypeOfEntry";
import Format from "./functionComponents/Format";
import Unit from "./functionComponents/Unit";
import MinInterval from "./functionComponents/MinInterval";
import MaxInterval from "./functionComponents/MaxInterval";
import ScaleData from "./functionComponents/ScaleData";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "components/primitives/Button";

export default function FunctionForm(props: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof deviceFunctionForm>>({
    resolver: zodResolver(deviceFunctionForm),
    defaultValues: {},
  });

  const watchTypeOfFunction = form.watch("typeOfFunction");
  const watchUserInfo = form.watch("userInfo");
  const watchTypeOfEntry = form.watch("userTypeOfEntry");
  const watchFormat = form.watch("format");
  const watchScale = form.watch("scaleData");

  console.log(watchScale);
  return (
    <div className="flex flex-col gap-2 rounded border border-lightText/60 bg-white px-4 py-4 dark:border-darkText dark:bg-dark">
      <Form {...form}>
        <Name />
        <Description />
        <TypeOfFunction />
        {watchTypeOfFunction === "COMMAND" ? (
          <>
            <Command />
            <UserInfo />
            {watchUserInfo && (
              <>
                <TypeOfEntry />
                {watchTypeOfEntry === "STRING" ? (
                  <>
                    <Format isText={true} />
                    {watchFormat === "SCALE" && (
                      <>
                        <Unit />
                        <ScaleData control={form.control} />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Format isText={false} />
                    {watchFormat === "INTERVAL" && (
                      <>
                        <Unit />
                        <div className="my-2 flex flex-col justify-between gap-2 lg:w-1/2 lg:flex-row">
                          <MinInterval />
                          <MaxInterval />
                        </div>
                      </>
                    )}
                    {watchFormat === "SCALE" && (
                      <>
                        <Unit />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Message />
          </>
        )}
        <h3 className="text-center text-sm font-bold lg:text-left  lg:text-xl ">
          Datos de Salida
        </h3>
        <SendaData />
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
          <Button
            className="rounded border border-danger bg-transparent px-8 py-2 text-sm text-danger"
            type="button"
            onClick={() => props.setIsEditing(false)}
          >
            Cancelar
          </Button>
          <Button
            className="rounded border border-accent bg-transparent px-8 py-2 text-sm text-accent dark:text-indigo-400"
            type="submit"
          >
            Guardar Funcion
          </Button>
        </div>
      </Form>
    </div>
  );
}
