function PageContent({ title, subtitle, children }) {
   return (
      <div className='page-content'>
         <h1>{title}</h1>
         <h2>{subtitle}</h2>
         {children}
      </div>
   );
}

export default PageContent;