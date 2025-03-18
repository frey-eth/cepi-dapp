import ic_cepi from '@/images/header/cepi.png'
import ic_pi from '@/images/portfolio/pitoken.jpg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import { AssetSupply } from '@/types/table'

export const dataAssetSupply: AssetSupply[] = [
  {
    asset: {
      icon: ic_cepi,
      name: 'CEPI',
    },
    walletBalance: 216.38,

    apy: 2.16,
    isCollateral: true,
    isError: true,
    addressToken: '',
  },
  {
    asset: {
      icon: ic_pi,
      name: 'PI',
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
