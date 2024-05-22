import nonToken from '@/icons/non-token.svg'
import icBonk from '@/images/global-pool/bonk.svg'
import icSolana from '@/images/global-pool/sol.svg'
import icUsdc from '@/images/portfolio/usdc.svg'
import { ISupply } from '../../../types/table'

export const supplyData: ISupply[] = [
  {
    asset: {
      icon: icSolana,
      name: 'SOL',
    },
    balance: {
      amount: '0.0010000',
      value: 3.31,
    },
    apy: 2.16,
  },
  {
    asset: {
      icon: icBonk,
      name: 'BONK',
    },
    balance: {
      amount: '0.0010000',
      value: 3.31,
    },
    apy: 2.16,
  },
  {
    asset: {
      icon: icUsdc,
      name: 'USDC',
    },
    balance: {
      amount: '0.0010000',
      value: 3.31,
    },
    apy: 2.16,
  },
]

export const nonSupplyData: ISupply[] = [
  {
    asset: {
      icon: nonToken,
      name: '--',
    },
    balance: {
      amount: '--',
    },
    apy: undefined,
  },
]

export const borrowData: ISupply[] = [
  {
    asset: {
      icon: icSolana,
      name: 'SOL',
    },
    balance: {
      amount: '0.000500',
      value: 1.655,
    },
    apy: 3,
  },
]
