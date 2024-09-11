import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera } from "lucide-react";

const ProductExchangeForm = () => {
  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const timeOfDay = ["Mañana", "Tarde", "Noche"];

  return (
    <div className="space-y-8 mt-5 w-full max-w-[1232px] mx-auto">
      <h2 className="font-bold text-[36px] mx-auto max-w-3xl">
        Publica tu anuncio
      </h2>
      <Card className="w-full max-w-3xl mx-auto rounded-none lg:rounded-3xl p-8 flex justify-center bg-[#F7C036] border-none">
        <div className="w-fit bg-white flex flex-col items-center px-6 py-2 rounded-lg font-semibold">
          <Camera className="w-16 h-16 mx-auto" />
          <h3>Añadir fotos</h3>
          <p>0/6</p>
        </div>
      </Card>
      <Card className="w-full max-w-3xl mx-auto rounded-none lg:rounded-3xl bg-[#74ACDF] px-4 lg:px-24 py-2 lg:py-14">
        <CardHeader>
          <CardTitle className="text-[24px] font-bold text-white">
            ¿Qué te interesa a cambio?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="interest"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  Servicios o productos que aceptas a cambio
                </Label>
                <Textarea id="interest" placeholder="Input" className="mt-1" />
              </div>

              <div>
                <Label
                  htmlFor="category"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  ¿En qué categoría encaja mejor lo que ofreces?
                </Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Categoría 1</SelectItem>
                    <SelectItem value="category2">Categoría 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="province"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  Provincia
                </Label>
                <Select>
                  <SelectTrigger id="province">
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="province1">Provincia 1</SelectItem>
                    <SelectItem value="province2">Provincia 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="department"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  Departamento
                </Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dept1">Departamento 1</SelectItem>
                    <SelectItem value="dept2">Departamento 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  Describe tu producto o servicio
                </Label>
                <Textarea
                  id="description"
                  placeholder="Explica en qué consiste tu servicio o el estado del producto"
                  className="mt-1 h-32"
                />
              </div>

              <div>
                <Label
                  htmlFor="exchangeInterest"
                  className="text-white font-semibold text-[1.2rem] my-4"
                >
                  ¿Qué te interesa a cambio?
                </Label>
                <Textarea
                  id="exchangeInterest"
                  placeholder="Explica qué pides a cambio por tu servicio o producto"
                  className="mt-1 h-32"
                />
              </div>

              <div>
                <Label className="text-white font-semibold text-[1.2rem] my-4">
                  Tus horarios
                </Label>
                <p className="text-sm text-white mb-2">
                  Marca los días y horarios que tenés disponible para realizar
                  el trueque
                </p>
                <div className="flex justify-between mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex flex-col items-center gap-3">
                      <Label
                        htmlFor={`day-${day}`}
                        className="ml-1 bg-[#F7C036] text-center font-bold aspect-square p-4 rounded-full"
                      >
                        {day}
                      </Label>
                      <Checkbox
                        id={`day-${day}`}
                        className="border-black border-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                  {timeOfDay.map((time) => (
                    <div
                      key={time}
                      className="flex items-center flex-col gap-3"
                    >
                      <Label
                        htmlFor={`time-${time}`}
                        className="ml-1 bg-[#F7C036] text-center font-bold py-2 px-4 rounded-full"
                      >
                        {time}
                      </Label>
                      <Checkbox
                        id={`time-${time}`}
                        className="border-black border-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-x-6">
                <Button
                  type="submit"
                  className="bg-[#F7C036] hover:bg-[#F7C036] text-black font-bold px-14 py-6 drop-shadow-md"
                >
                  Publicar
                </Button>
                <Button
                  variant="outline"
                  className="border-white border-2 bg-transparent font-bold px-14 py-6 drop-shadow-md"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductExchangeForm;
