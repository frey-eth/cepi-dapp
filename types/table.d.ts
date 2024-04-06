import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type GlobalPool = {
  asset: {
    icon: StaticImport | string
    name: string
  }
  price: number
  apy: number
  weight: number
  deposit: number
  globalLimit: number
  utilization: number
  walletAmt: number
}
