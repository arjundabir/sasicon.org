"use client";
import { useState } from "react";
export default function InputForm() {
  const [isDigital, setIsDigital] = useState<boolean | null>(null);
  return (
    <form>
      <div className="mt-4 space-y-4">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            How would you like to receive your certificate?
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose between a digital (via email) or physical certificate
            (elligible for US locations only).
          </p>
          <TypeSection setIsDigital={setIsDigital} />
        </div>
        <hr className="w-3/4" />
        {isDigital ? (
          <DigitalSection />
        ) : isDigital === false ? (
          <PhysicalSection />
        ) : (
          <div>
            <p>Select a method above.</p>
          </div>
        )}
      </div>
      <p className="mt-1 text-xs leading-4 text-gray-600">
        Filling out this form does NOT guarantee you will receive a certificate,
        you must complete the criteria for the certificate to be awarded.
      </p>

      <div className="mt-4 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

const TypeSection = ({
  setIsDigital,
}: {
  setIsDigital: (isDigital: boolean) => void;
}) => (
  <div>
    <fieldset>
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-x-3">
          <input
            id="push-everything"
            name="push-notifications"
            type="radio"
            onClick={() => setIsDigital(true)}
            className="h-4 w-4 border-gray-300 text-blue-800 focus:fill-blue-800"
          />
          <label
            htmlFor="push-everything"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Digital Certificate
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            id="push-email"
            name="push-notifications"
            type="radio"
            onClick={() => setIsDigital(false)}
            className="h-4 w-4 border-gray-300 text-blue-800 focus:ring-blue-800"
          />
          <label
            htmlFor="push-email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Physical Certificate
          </label>
        </div>
      </div>
    </fieldset>
  </div>
);

const DigitalSection = () => (
  <div>
    <h2 className="text-base font-semibold leading-7 text-gray-900">
      Enter your email address.
    </h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      We will send your certificate to this email address.
    </p>
    <div className="sm:col-span-4">
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email..."
          autoComplete="email"
          className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-blue-800 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  </div>
);

const PhysicalSection = () => (
  <div>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Country
        </label>
        <div className="">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-blue-800 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>United States</option>
            <option>
              International * NOT elligible for a physical certificate *
            </option>
          </select>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="street-address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Street address
        </label>
        <div className="">
          <input
            id="street-address"
            name="street-address"
            type="text"
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-blue-800 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label
          htmlFor="city"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          City
        </label>
        <div className="">
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-blue-800 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="region"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          State / Province
        </label>
        <div className="">
          <input
            id="region"
            name="region"
            type="text"
            autoComplete="address-level1"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-blue-800 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="postal-code"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          ZIP / Postal code
        </label>
        <div className="">
          <input
            id="postal-code"
            name="postal-code"
            type="text"
            autoComplete="postal-code"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-blue-800 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div>
);
