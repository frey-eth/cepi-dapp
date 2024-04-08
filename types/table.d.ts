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

export type ISupply = {
  asset: {
    icon: StaticImport | string
    name: string
  }
  balance: {
    amount: string
    value: number
  }
  apy: number
}

export type AssetsBorrow = {
  asset: {
    icon: StaticImport | string
    name: string
  }
  available: number
  apy: number
}
