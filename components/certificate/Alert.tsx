"use client";
import { User } from "@/types/user";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Alert({
  statusCode,
}: {
  statusCode: number | undefined;
}) {
  const getBackgroundColor = () => {
    switch (statusCode) {
      case 201:
        return "bg-green-50";
      case 500:
        return "bg-red-50";
      default:
        return "hidden";
    }
  };

  return (
    statusCode !== undefined && (
      <div className={`rounded-md p-4 ${getBackgroundColor()}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {statusCode === 201 && (
              <CheckCircleIcon
                aria-hidden="true"
                className="h-5 w-5 text-green-400"
              />
            )}
            {statusCode === 409 && (
              <ExclamationTriangleIcon
                aria-hidden="true"
                className="h-5 w-5 text-yellow-400"
              />
            )}
            {statusCode === 500 && (
              <XCircleIcon
                aria-hidden="true"
                className="h-5 w-5 text-red-400"
              />
            )}
          </div>
          <div className="ml-3">
            {statusCode === 201 && (
              <p className="text-sm font-medium text-green-800">
                Thank you for registering for the certificate program. You
                should be automatically redirected or click{" "}
                <Link href="/" className="underline">
                  here
                </Link>
                .
              </p>
            )}
            {statusCode === 500 && (
              <>
                <h3 className="text-sm font-medium text-red-800">
                  There was an error with your certificate registration form.
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  Please find one of us or contact us at{" "}
                  <Link href="mailto:sasiatuci@gmail.com" className="underline">
                    sasiatuci@gmail.com
                  </Link>
                  .
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}
