import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface DialogErrorRegistroProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    errorMessage: string | null;
}

export const DialogErrorRegistro = ({ open, onOpenChange, errorMessage }: DialogErrorRegistroProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger />
            <DialogContent>
                <DialogTitle>Error en el Registro</DialogTitle>
                <DialogDescription>
                    {errorMessage || "Ocurrió un error. Por favor, inténtalo nuevamente."}
                </DialogDescription>
                <DialogClose>Ok</DialogClose>
            </DialogContent>
        </Dialog>
    );
};
