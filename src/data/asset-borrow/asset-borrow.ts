import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import { AssetsBorrow } from '@/types/table'

export const dataBorrow: AssetsBorrow[] = [
  {
    asset: {
      icon: ic_solana,
      name: 'SOL',
    },
    available: 2.71,
    balanceValue: 451.09,
    apy: 7.03,
  },
  {
    asset: {
      icon: ic_bonk,
      name: 'BONK',
    },
    available: 2.71,
    balanceValue: 0.000087,
    apy: 34.98,
    addressToken: '6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES',
  },
  {
    asset: {
      icon: ic_usdc,
      name: 'USDC',
    },
    available: 2.71,
    balanceValue: 2.71,
    apy: 22.64,
    addressToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
]
