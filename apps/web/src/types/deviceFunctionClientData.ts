import { z } from "zod";

const typeOfFunction = z.enum(["COMMAND", "FREE"], {
  message: "Seleccione el tipo de función",
});
const typeOfEntry = z.enum(["STRING", "NUMBER"]);
const typeOfFormat = z.enum(["INTERVAL", "SCALE", "FREE"]);

export const deviceFunctionForm = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener por lo menos dos caracteres" }),
  description: z.string({ required_error: "Escriba una descripción" }),
  typeOfFunction: typeOfFunction,
  command: z.string().min(1, { message: "Escriba por lo menos un caracter" }),
  userInfo: z.boolean(),
  userTypeOfEntry: z.optional(typeOfEntry),
  unit: z.optional(
    z.string().min(1, { message: "Escriba por lo menos un caracter" }),
  ),
  // symbol: z.optional(
  //   z.string().min(1, { message: "Escriba por lo menos un caracter" }),
  // ),
  format: z.optional(typeOfFormat),
  maxInterval: z.optional(z.number()),
  minInterval: z.optional(z.number()),
  scaleData: z.optional(z.array(z.number())),
  message: z.optional(
    z
      .string()
      .min(2, { message: "El mensaje debe tener por lo menos dos caracteres" }),
  ),
  sendData: z.boolean(),
});

export type deviceFunctionFormType = z.infer<typeof deviceFunctionForm>;
// export type deviceFunctionInitialState = {
//   name: string;
//   description: string;
//   typeOfFunction: typeOfEntry;
//   command: string | number;
//   userInfo: boolean;
//   userTypeOfEntry: typeOfEntry | undefined;
//   unit: string | undefined;
//   format: typeOfFormat | undefined;
//   maxInterval: number | undefined;
//   minInterval: number | undefined;
//   scaleData: number[] | undefined;
//   message: string | undefined;
//   sendData: boolean;
// };
