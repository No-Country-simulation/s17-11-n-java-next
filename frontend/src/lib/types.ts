import { z } from "zod";

export const FormSchemaFilters = z.object({
    provincia: z.string({
        required_error: "La provincia es obligatoria",
    }),
    departamento: z.string({
        required_error: "Seleccione un departamento",
    }),
    servicio: z.string({
        required_error: "Seleccione un tipo de servicio",
    }),
});