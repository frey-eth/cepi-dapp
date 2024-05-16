import non_token from '@/icons/non-token.svg'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import { ISupply } from '../../../types/table'

export const supplyData: ISupply[] = [
  {
    asset: {
      icon: ic_solana,
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
      icon: ic_bonk,
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
      icon: ic_usdc,
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
      icon: non_token,
      name: '--',
    },
    balance: {
      amount: '--',
    },
    apy: undefined,
  },
]
