import React, { useState } from 'react'
import { me } from '../apollo'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../images/defaultImg.png'
import ImageUploader from '../components/images/ImageUploader'
import ConfirmLogOut from '../components/modals/ConfirmLogOut'
import EditProfile from '../modals/EditProfile.modal'
import { useSnackbar } from 'notistack'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'

const Profile = () => {
  const router = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [modal, setModal] = useState<boolean>(false)
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)

  const user = me()

  if (user === null) {
    router('/')
  }

  const copyBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = e.currentTarget.textContent
    email && (await navigator.clipboard.writeText(email))
    enqueueSnackbar(`Success copy this ${email}`)
  }

  const onModal = () => setModal(!modal)
  const onEditProfileModal = () => setEditProfileModal(!editProfileModal)

  return (
    <>
      <Helmet>
        <title>
          {user!.nickname} | {HELMET_TITLE}
        </title>
      </Helmet>
      {editProfileModal ? (
        <EditProfile onEditProfileModal={onEditProfileModal} />
      ) : (
        <>
          {modal ? (
            <ConfirmLogOut title={'Confirm Log out!'} onModal={onModal} />
          ) : (
            <section className="profile w-full text-white h-screen center flex-col">
              <div className="center overlay w-full">
                <ImageUploader
                  image={defaultAvatar}
                  title={'default-avatar-image'}
                />

                <div className="p-5">
                  <p className="text-4xl font-bold pb-5">
                    <span className="text-green-500">{user!.role}</span>
                    <span className="ml-5 tracking-wide">{user!.nickname}</span>
                  </p>
                  <p className="pb-5">
                    <abbr title="Copy this!">
                      <span
                        onClick={copyBoard}
                        className="font-medium text-2xl underline cursor-pointer hover:text-blue-300"
                      >
                        {user!.email}
                      </span>
                    </abbr>
                  </p>
                  <p>
                    <span className="font-medium text-2xl">
                      Create At {user!.createAt}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-2xl">
                      Update At {user!.updateAt}
                    </span>
                  </p>
                  <div>
                    <button onClick={onEditProfileModal} className="utilBtn">
                      <span>Edit</span>
                    </button>
                    <button onClick={onModal} className="utilBtn ml-5">
                      <span>LOG OUT</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}

export default Profile
