import classes from "./ErrorBox.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function ErrorBox({ message, errors, onConfirm }) {
   return (
      <motion.div
         initial={{ opacity: 0, y: -30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         className={classes['error']}>
         <h2>{message}</h2>
         {errors && (
            <motion.ul>
               <AnimatePresence>
                  {Object.values(errors).map(err => <motion.li
                     layout
                     exit={{ y: -20, opacity: 0 }}
                     key={err}>{err}</motion.li>)}
               </AnimatePresence>
            </motion.ul>
         )}
         {onConfirm && (
            <div className={classes['confirmation-actions']}>
               <button onClick={onConfirm} className="btn btn-danger">
                  Okay
               </button>
            </div>
         )}
      </motion.div>
   );
}