'use client'
import { useState } from 'react'
import { GlobalPool } from '../../../../../types/table'

const useModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<GlobalPool | undefined>()

  const handleOpenModal = (data: GlobalPool) => {
    setOpenModal(true)
    setModalData(data)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setTimeout(() => setModalData(undefined), 300)
  }
  return { openModal, modalData, handleOpenModal, handleCloseModal }
}

export default useModal
