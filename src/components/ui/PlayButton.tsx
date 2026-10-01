type PlayButtonProps = {
  // Background and icon colour classes
  className?: string;
};

export function PlayButton({ className = "" }: PlayButtonProps) {
  return (
    <span
      className={`flex size-10 items-center justify-center rounded-full ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 12 14"
        className="ml-0.5 h-3.5 w-3 fill-current"
      >
        <path d="M0 0v14l12-7z" />
      </svg>
    </span>
  );
}
