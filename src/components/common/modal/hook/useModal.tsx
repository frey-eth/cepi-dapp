'use client'
import { useState } from 'react'
import { ModalProps } from '..'
import { GlobalPool } from '../../../../../types/table'

const useModal = (
  supplyAction?: () => void
): ModalProps & {
  handleOpen: (data: GlobalPool) => void
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<GlobalPool | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleOpen = (data: GlobalPool) => {
    setIsOpen(true)
    setData(data)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsSuccess(false)
    setTimeout(() => setData(undefined), 300)
  }

  const handleSupply = () => {
    setIsLoading(true)

    // TODO: call api
    supplyAction && supplyAction()

    setTimeout(() => {
      setIsOpen(false)

      setTimeout(() => {
        setIsLoading(false)
        setData(undefined)
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
  }
}

export default useModal
