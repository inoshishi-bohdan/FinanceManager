import useMyQuery from '../../hooks/useMyQuery';
import { BASE_URL, fetchProfileImages } from '../../util/http';
import LoadingIndicator from './LoadingIndicator';
import classes from './ImageSelector.module.css'

export default function ImageSelector({ selectedImageId, onImageOptionClick }) {
   const { data: availableProfileImages, isPending: isPendingAvailableProfileImages } = useMyQuery(fetchProfileImages, ['available-profile-images']);

   return (
      <div className={classes['image-selector']}>
         {isPendingAvailableProfileImages && <LoadingIndicator />}
         {availableProfileImages && availableProfileImages.map(image => <img
            className={`${classes['image-option']} ${selectedImageId === image.id ? classes['selected'] : ''}`}
            onClick={() => onImageOptionClick(image.id)}
            key={image.path}
            src={`${BASE_URL}/images/${image.path}`}
            alt={image.caption}
         />)
         }
      </div>
   );
}