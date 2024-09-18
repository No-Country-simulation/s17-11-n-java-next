'use client'
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteService } from '@/services/DeleteService';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/auth';

interface DeleteButtonProps {
  serviceId: number;
}

export function DeleteButton({ serviceId }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const id = useAuthStore((state) => state.id) as number;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicesById', id] });
      setIsDialogOpen(false); // Cierra el diálogo después de la eliminación exitosa
    },
  });

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    mutation.mutate();
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleDeleteClick}
            size="sm"
            variant="outline"
            className={`bg-[#D14A4A] ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={mutation.isPending}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleConfirm}
              variant="destructive"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Eliminando...' : 'Eliminar'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="ml-2"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {mutation.error && <p className="text-red-600 mt-2">Error: {mutation.error.message}</p>}
    </>
  );
}
