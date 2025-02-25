import { useContext, useState } from 'react';
import useMyQuery from '../../hooks/useMyQuery';
import { BASE_URL, fetchMyProfileInfo, fetchProfileImage, fetchProfileImages } from '../../util/http'
import LoadingIndicator from './LoadingIndicator';
import UserEditForm from './UserEditForm';
import classes from './UserCard.module.css'
import { UserModalContext } from '../../store/user-modal-context';
import UserRemover from './UserRemover';

export default function UserCard() {
   const [editMode, setEditMode] = useState(false);
   const { handleOpenDeleteModal } = useContext(UserModalContext);

   const { data: profileInfo, isPending: isPendingMyProfileInfo } = useMyQuery(fetchMyProfileInfo, ['my-profile-info']);
   const { data: profileImage, isPending: isPendingMyProfileImage } = useMyQuery(
      ({ signal, queryKey }) => fetchProfileImage({
         signal: signal,
         id: queryKey[queryKey.length - 1].id
      }),
      ['my-profile-image', { id: profileInfo?.profileImageId }],
      !!(profileInfo?.profileImageId)
   );

   function handleEditClick() {
      setEditMode(true);
   }

   function handleCancelClick() {
      setEditMode(false);
   }

   let content;

   if (isPendingMyProfileImage || isPendingMyProfileInfo) {
      content = <LoadingIndicator />
   }

   if (profileInfo && profileImage) {
      if (editMode) {
         content = <UserEditForm profileData={profileInfo} onCancel={handleCancelClick} />
      } else {
         content = <>
            <img className={classes['profile-img']} src={`${BASE_URL}/images/${profileImage.path}`} alt={profileImage.caption} />
            <p className='fs-2 fw-semibold m-0'>{profileInfo.userName}</p>
            <div className='d-flex w-100 align-items-center justify-content-center gap-2'>
               <button className='btn btn-outline-success' onClick={handleEditClick}>Edit Profile</button>
               <button className='btn btn-outline-danger' onClick={handleOpenDeleteModal}>Delete Account</button>
            </div>
         </>;
      }
   }

   return (
      <>
         <UserRemover />
         <div className={`card ${classes['user-card']}`}  >
            {content}
         </div>
      </>
   );
}