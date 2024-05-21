import { Type } from './table'

export type DataModalType = { data: GlobalPool | AssetSupply | AssetsBorrow | ISupply; type: Type }

export interface ModalProps {
  isOpen: boolean
  data?: DataModalType
  setIsOpen: Dispatch<SetStateAction<boolean>>
  type: string
}

export type DataDisplayType = {
  title: 'supply' | 'borrow' | 'withdraw' | 'repay' | undefined
  walletBalance: number
  assetIcon: string | StaticImport
  assetName: string
  currency: string
  apy: number
  available: number
  address_token?: string
}
