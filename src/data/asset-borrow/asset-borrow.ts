import ic_usdc from '@/images/global-pool/usdc.svg'
import ic_dai from '@/images/portfolio/dai.svg'
import ic_usdt from '@/images/portfolio/usdt.svg'
import { AssetsBorrow } from '../../../types/table'

export const dataBorrow: AssetsBorrow[] = [
  {
    asset: {
      icon: ic_usdt,
      name: 'SOL',
    },
    available: 2.71,
    apy: 7.03,
    address_token: '',
  },
  {
    asset: {
      icon: ic_dai,
      name: 'BONK',
    },
    available: 2.71,
    apy: 34.98,
    address_token: '6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES',
  },
  {
    asset: {
      icon: ic_usdc,
      name: 'USDC',
    },
    available: 2.71,
    apy: 22.64,
    address_token: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
]
