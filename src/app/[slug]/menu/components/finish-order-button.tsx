import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { isValidCpf } from "@/helpers/cpf";

export const FinishOrderButton = () => {
  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "O nome é obrigatório",
    }),
    cpf: z.string().refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
  });

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild={true}>
          <Button className="w-full rounded-full">Finalizar pedido</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Finalizar pedido</DrawerTitle>
            <DrawerDescription>
              Insira suas informações abaixo para finalizar o seu pedido.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
