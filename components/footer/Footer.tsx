import Link from "next/link";

export default function Footer() {
  return (
    <footer className="justify-end mt-10 p-3 lg:p-6 rounded-md w-full z-10 bg-secondary opacity-90">
      <div className="flex items-center justify-around">
        <Link
          className="p-2 text-nowrap"
          target="_blank"
          href="https://termify.io/terms-and-conditions-generator?gad_source=1&gclid=CjwKCAiA0bWvBhBjEiwAtEsoWzs2jSqzrLqZpJmdtm---oXR8xYTOLYo0L-QaQeKJSFxdm-dFJmo8RoCY9cQAvD_BwE"
        >
          Terms and Conditions
        </Link>
        <Link
          className="p-2 text-nowrap"
          target="_blank"
          href="https://fsymbols.com/copyright/"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
