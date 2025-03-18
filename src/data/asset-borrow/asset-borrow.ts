import ic_cepi from '@/images/header/cepi.png'
import ic_pi from '@/images/portfolio/pitoken.jpg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import { AssetsBorrow } from '@/types/table'

export const dataBorrow: AssetsBorrow[] = [
  {
    asset: {
      icon: ic_cepi,
      name: 'CEPI',
    },
    available: 2.71,
    balanceValue: 451.09,
    apy: 7.03,
    addressToken: '',
  },
  {
    asset: {
      icon: ic_pi,
      name: 'PI',
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
