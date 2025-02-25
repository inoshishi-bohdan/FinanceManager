export default function InfoCard({ src, alt, text }) {
   return (
      <div className="card info-card" >
         <img src={src} className="card-img-top" alt={alt} />
         <div className="card-body">
            <p className="card-text">{text}</p>
         </div>
      </div>
   )
}