import { z } from "zod";

const typeOfFunction = z.enum(["COMMAND", "FREE"], {
  message: "Seleccione el tipo de función",
});
const typeOfEntry = z.enum(["STRING", "NUMBER"]);
const typeOfFormat = z.enum(["INTERVAL", "SCALE", "FREE"]);

export const deviceFunctionForm = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "El nombre debe tener por lo menos dos caracteres" }),
  description: z.string({ message: "Escriba una descripción" }),
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

// export type deviceFunctionClientData = {
//   id: string;
//   name: string;
//   description: string;
//   tEntry: typeOfEntry;
//   command: string | number;
//   blocking: boolean;
//   userInfo: boolean;
//   userTEntry: typeOfEntry | undefined;
//   unit: string | undefined;
//   symbol: string | undefined;
//   format: typeOfFormat | undefined;
//   maxInterval: number | undefined;
//   minInterval: number | undefined;
//   scaleData: number[] | undefined;
//   message: string | undefined;
//   sendData: boolean;
//   streaming: boolean;
//};
