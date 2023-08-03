import clsx from "clsx"

interface GenericTitleInterface {
  title: string
  className?: string
}

const GenericTitle = ({ title, className }: GenericTitleInterface) => {
  return (
    <div
      className={clsx(
        "text-2xl font-bold uppercase sm:text-4xl font-roboto",
        className,
      )}
    >
      <p>{title}</p>
    </div>
  )
}

export default GenericTitle
