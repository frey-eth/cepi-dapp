import { Type } from './table'

export type DataModalType = { data: GlobalPool | AssetSupply | AssetsBorrow; type: Type }

export interface ModalProps {
  isOpen: boolean
  data?: DataModalType
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export type DataDisplayType = {
  title: 'supply' | 'borrow'
  walletBalance: number
  assetIcon: string | StaticImport
  assetName: string
  currency: string
  apy: number
  available: number
  address_token?: string
}
