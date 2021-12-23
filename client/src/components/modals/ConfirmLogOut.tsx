import React from 'react'
import { ACCESS_TOKEN, LOG_OUT } from '../../common/constatns'
import { isLoggedInVar } from '../../apollo'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

interface ConfirmProp {
  title: string
  onModal: () => void
}

const ConfirmLogOut: React.FC<ConfirmProp> = ({ title, onModal }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onSignOK = () => {
    window.localStorage.removeItem(ACCESS_TOKEN)
    isLoggedInVar(false)
    enqueueSnackbar(LOG_OUT)
    navigate('/')
  }

  return (
    <section className="bg-black h-screen w-full center z-50">
      <div className="w-1/3 h-1/4 center flex-col">
        <p className="p-5">
          <span className="text-4xl text-green-500 tracking-widest">
            {title}
          </span>
        </p>
        <div>
          <button onClick={onSignOK} className="utilBtn">
            <span>OK</span>
          </button>
          <button onClick={onModal} className="utilBtn ml-5">
            <span>CANCEL</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmLogOut
