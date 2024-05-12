const Card = ({ children, headerSlot, className }) => {
  return <div className={className}>
    <>{headerSlot}</>
    <section className="card shadow-md hover:shadow-md dark:text-gray-300 border dark:border-transparent rounded-xl lg:p-6 p-4 bg-white dark:bg-sky-950 lg:duration-100">
        {children}
    </section>
  </div>
}
export default Card
