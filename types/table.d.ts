import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface GlobalPool extends Asset {
  price: number
  apy: number
  weight: number
  deposit: number
  globalLimit: number
  utilization: number
  addressToken?: string
}

export interface GlobalPoolBorrow extends Asset {
  price: number
  apy: number
  ltv: number
  available: number
  total_borrow: number
  utilization: number
  addressToken?: string
}

export interface AssetSupply extends Asset {
  walletBalance: number
  apy: number
  isCollateral: boolean
  isError?: boolean
  addressToken?: string
}

export interface ISupply extends Asset {
  balance: {
    amount: string
    value?: number
  }
  apy?: number
  addressToken?: string
}

export interface AssetsBorrow extends Asset {
  available: number
  apy: number
  addressToken?: string
  balanceValue?: number
}

export interface Asset {
  asset: {
    icon: StaticImport | string
    name: string
  }
}
export type Type = 'borrow' | 'supply' | 'withdraw' | 'repay'
