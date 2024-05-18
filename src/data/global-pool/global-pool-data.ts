import icBonk from '@/images/global-pool/bonk.svg'
import icSolana from '@/images/global-pool/sol.svg'
import icUsdc from '@/images/portfolio/usdc.svg'
import { GlobalPool, GlobalPoolBorrow } from '../../../types/table'

export const dataLending: GlobalPool[] = [
  {
    asset: {
      icon: icSolana,
      name: 'Solana',
    },
    price: 154.08,
    apy: 0.14,
    weight: 65,
    deposit: 552,
    globalLimit: 200,
    utilization: 10.55,
  },
  {
    asset: {
      icon: icBonk,
      name: 'Bonk',
    },
    price: 216.38,
    apy: 0.02,
    weight: 50,
    deposit: 119,
    globalLimit: 300,
    utilization: 10.29,
  },
  {
    asset: {
      icon: icUsdc,
      name: 'USDC',
    },
    price: 1,
    apy: 8.63,
    weight: 100,
    deposit: 61,
    globalLimit: 200,
    utilization: 83.87,
  },
]

export const dataBorrow: GlobalPoolBorrow[] = [
  {
    asset: {
      icon: icSolana,
      name: 'Solana',
    },
    price: 154.08,
    apy: 0.15,
    ltv: 65,
    available: 300,
    total_borrow: 10,
    utilization: 30.08,
  },
  {
    asset: {
      icon: icBonk,
      name: 'Bonk',
    },
    price: 216.38,
    apy: 5.07,
    ltv: 77,
    available: 333,
    total_borrow: 166,
    utilization: 2.25,
  },
  {
    asset: {
      icon: icUsdc,
      name: 'USDC',
    },
    price: 1,
    apy: 12.03,
    ltv: 80,
    available: 988,
    total_borrow: 10,
    utilization: 83.87,
  },
]
