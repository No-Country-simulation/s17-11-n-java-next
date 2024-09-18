  "use client";

  import React from "react";
  import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Contact2 } from "@/components/dialog/Contact2";

  function HeaderDevTeam() {
    return (
      <>
        <Card className="flex flex-col justify-center items-center border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-display-small-bold font-bold">Conoce a nuestro grandioso equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-[24px]">
              Nuestra filosofía es simple; Contratamos personas excelentes y, les
              brindamos los recursos y el
              <br />
              apoyo para hacer su mejor trabajo.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Contact2 />
          </CardFooter>
        </Card>
      </>
    );
  }

  export default HeaderDevTeam;
