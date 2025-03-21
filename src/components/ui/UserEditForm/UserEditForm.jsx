import { useContext, useState } from 'react';
import useMyMutation from '../../../hooks/useMyMutation'
import { updateMyProfileInfo } from '../../../util/http';
import ImageSelector from '../ImageSelector/ImageSelector';
import Input from '../Input/Input'
import classes from '../UserEditForm/UserEditForm.module.css'
import ErrorBox from '../ErrorBox/ErrorBox'
import { showSuccessNotification } from '../../../util/notification';
import { AuthContext } from '../../../store/authentication-context';
import { useNavigate } from 'react-router-dom';

export default function UserEditForm({ profileData, onCancel }) {
   const { mutate, responseMessage, isPending } = useMyMutation(updateMyProfileInfo, onSuccess);
   const [selectedProfileImageId, setSelectedProfileImageId] = useState(profileData.profileImageId);
   const { changeIsAuthenticated } = useContext(AuthContext);
   const navigate = useNavigate();

   function handleSubmit(event) {
      event.preventDefault();
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         userName: data.userName,
         email: data.email,
         oldPassword: data.oldPassword,
         newPassword: data.newPassword,
         profileImageId: selectedProfileImageId
      };

      mutate(request)
   }

   function handleImageOptionClick(imageId) {
      setSelectedProfileImageId(imageId);
   }

   function onSuccess() {
      showSuccessNotification('Profile data was successfully updated. Please login again');
      changeIsAuthenticated(false);
      navigate('/login');
   }

   return (
      <form onSubmit={handleSubmit} className={classes['user-edit-form']}>
         <h4 className='text-center auth m-0'>Edit Profile</h4>
         <ImageSelector selectedImageId={selectedProfileImageId} onImageOptionClick={handleImageOptionClick} />
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <Input
            id='userName'
            name='userName'
            label='User Name'
            type='text'
            defaultValue={profileData.userName ?? ''}
            required
         />
         <Input
            id='userEmail'
            name='email'
            label='Email'
            type='email'
            defaultValue={profileData.email ?? ''}
            required
         />
         <Input
            id='oldPassword'
            name='oldPassword'
            label='Old Password'
            type='password'
            required
         />
         <Input
            id='newPassword'
            name='newPassword'
            label='New Password'
            type='password'
            required
         />
         <div className={'d-flex justify-content-end gap-3 mt-4'}>
            <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? 'Submitting...' : 'Confirm'}</button>
            <button className="btn btn-secondary" onClick={onCancel} disabled={isPending}>Cancel</button>
         </div>
      </form>);
}