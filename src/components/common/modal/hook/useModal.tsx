'use client'
import { useState } from 'react'
import { AssetSupply, AssetsBorrow, GlobalPool } from '../../../../../types/table'

export type DataModalType = { data: GlobalPool | AssetSupply | AssetsBorrow; type: 'supply' | 'borrow' }

export interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  data?: DataModalType
  isLoading: boolean
  isSuccess: boolean
  handleSupply: () => void
  handleExit: () => void
}

const useModal = (
  supplyAction?: () => void
): ModalProps & {
  handleOpen: (data: DataModalType) => void
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleOpen = (data: DataModalType) => {
    setIsOpen(true)
    setData(data)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleExit = () => {
    setIsOpen(false)
    setIsSuccess(false)
    setTimeout(() => setData(undefined), 300)
  }

  const handleSupply = () => {
    setIsLoading(true)

    supplyAction && supplyAction()

    setTimeout(() => {
      setIsOpen(false)

      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
      }, 300)
    }, 3000)
  }

  return {
    isOpen,
    data,
    isLoading,
    isSuccess,
    handleOpen,
    handleClose,
    handleSupply,
    handleExit,
  }
}

export default useModal
