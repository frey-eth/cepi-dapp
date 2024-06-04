import nonToken from '@/icons/non-token.svg'
import icBonk from '@/images/global-pool/bonk.svg'
import icSolana from '@/images/global-pool/sol.svg'
import icUsdc from '@/images/portfolio/usdc.svg'
import { ISupply } from '@/types/table'

export const supplyData: ISupply[] = [
  {
    asset: {
      icon: icSolana,
      name: 'SOL',
    },
    balance: {
      amount: '0.0010000',
      value: 0.17,
    },
    apy: 2.16,
    addressToken: '',
  },
  {
    asset: {
      icon: icBonk,
      name: 'BONK',
    },
    balance: {
      amount: '2.00',
      value: 0.000064,
    },
    apy: 2.16,
    addressToken: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  },
  {
    asset: {
      icon: icUsdc,
      name: 'USDC',
    },
    balance: {
      amount: '0.0010000',
      value: 0.001,
    },
    apy: 2.16,
    addressToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
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
      value: 0.083,
    },
    apy: 3,
    addressToken: '',
  },
]
