// components/ui/success-dialog.tsx
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SuccessDialog({ isOpen, onClose }: SuccessDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-green-50 text-green-900">
                <DialogHeader>
                    <DialogTitle>Ha sido realizado con exito</DialogTitle>
                    <DialogDescription>
                        Ahora tu servicio esta disponible para que otros usuarios lo vean e inicien intercambios . Buena suerte!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Aceptar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
