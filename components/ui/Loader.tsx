import Spinner from "./spinner";

interface LoaderProps {
  text?: string;
}

export default function Loader({
  text = "Loading...",
}: LoaderProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex items-center gap-3">
        <Spinner />
        <span className="text-sm text-gray-500">
          {text}
        </span>
      </div>
    </div>
  );
}