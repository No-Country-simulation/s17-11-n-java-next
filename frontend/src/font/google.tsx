import {Lato, Rubik_Mono_One, Rubik_Puddles } from 'next/font/google'

//Rubik One
export const rubikOne = Rubik_Mono_One ({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
    variable: '--font-rubik',
})
//Lato
export const lato = Lato ({
    subsets: ['latin', 'latin-ext'],
    weight: ['100','300','400','700','900'],
    variable: '--font-lato',
})

// Rubik Puddles

export const rubikPuddles = Rubik_Puddles ({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
    variable: '--font-rubik-puddles',
})