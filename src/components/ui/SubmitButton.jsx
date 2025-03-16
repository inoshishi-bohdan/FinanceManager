import { motion } from "framer-motion";

export default function SubmitButton({ isPending, text }) {
   return (
      <motion.button
         whileHover={{ scale: 1.1 }}
         transition={{ type: 'spring'}}
         type="submit"
         className={`btn btn-primary auth mt-4`}
         disabled={isPending}
      >
         {isPending ? 'Submitting...' : text}
      </motion.button>
   );
}