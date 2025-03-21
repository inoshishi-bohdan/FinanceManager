import { motion } from "framer-motion"

export default function InfoCard({ src, alt, text }) {
   return (
      <motion.div
         initial={{ y: 30, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="card info-card" >
         <img src={src} className="card-img-top" alt={alt} />
         <div className="card-body">
            <p className="card-text">{text}</p>
         </div>
      </motion.div>
   )
}