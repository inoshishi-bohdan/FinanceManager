import useMyQuery from '../../hooks/useMyQuery';
import { BASE_URL, fetchProfileImages } from '../../util/http';
import LoadingIndicator from './LoadingIndicator';
import classes from './ImageSelector.module.css'
import { motion } from 'framer-motion';


export default function ImageSelector({ selectedImageId, onImageOptionClick }) {
   const { data: availableProfileImages, isPending: isPendingAvailableProfileImages } = useMyQuery(fetchProfileImages, ['available-profile-images']);

   return (
      <div
         transition={{ staggerChildren: 0.05 }}
         className={classes['image-selector']}>
         {isPendingAvailableProfileImages && <LoadingIndicator />}
         {availableProfileImages && availableProfileImages.map(image => <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [0.8, 1] }}
            exit={{ opacity: 1, scale: 1 }}
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