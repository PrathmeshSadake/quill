import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-2.5 md:py-20", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
