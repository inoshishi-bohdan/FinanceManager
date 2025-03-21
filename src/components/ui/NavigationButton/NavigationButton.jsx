import { motion } from "framer-motion";

export default function NavigationButton({primary, children, ...props }) {
   return (
      <motion.button
         {...props}
         type='button'
         whileHover={{ scale: 1.1 }}
         transition={{ type: 'spring', stiffness: 500 }}
         className={`btn ${primary ? ' btn-primary': 'btn-secondary'} rounded-pill`}
      >{children}</motion.button>
   );
}