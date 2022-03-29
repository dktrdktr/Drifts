import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function UserPrompt({ promptType, onDelete, onDeleteCancel }) {
  const userResponse = (response) => {
    if (response) {
      onDelete();
      return;
    }
    onDeleteCancel();
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => onDeleteCancel()}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white drop-shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {`Delete ${promptType}`}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`Are you sure you want to delete this ${promptType}?`}
                  </p>
                </div>

                <div className="flex gap-x-2 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-1/4 px-4 py-2 text-sm font-medium bg-gray-200 border border-transparent rounded-md hover:bg-blue-200"
                    onClick={() => userResponse(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-1/4 px-4 py-2 text-sm font-medium bg-gray-200 border border-transparent rounded-md hover:bg-red-200"
                    onClick={() => userResponse(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
