'use client'

import {ReactNode} from "react"
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react"


export default function ProvidersTanstack({children}: {children: ReactNode}) {
    const [queryClient] = useState(()=> new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
            {children}
    </QueryClientProvider>
  )
}
