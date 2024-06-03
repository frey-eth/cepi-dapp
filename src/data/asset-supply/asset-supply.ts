import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import { AssetSupply } from '../../../types/table'

export const dataAssetSupply: AssetSupply[] = [
  {
    asset: {
      icon: ic_solana,
      name: 'SOL',
    },
    walletBalance: 216.38,
    apy: 2.16,
    isCollateral: true,
    isError: true,
    addressToken: '',
  },
  {
    asset: {
      icon: ic_bonk,
      name: 'BONK',
    },
    walletBalance: 216.38,
    apy: -2.16,
    isCollateral: false,
    addressToken: '6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES',
  },
  {
    asset: {
      icon: ic_usdc,
      name: 'USDC',
    },
    walletBalance: 216.38,
    apy: 2.15,
    isCollateral: true,
    addressToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
]
