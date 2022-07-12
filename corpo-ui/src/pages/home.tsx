import { Combobox, Transition } from "@headlessui/react";
import { GlobeAltIcon, SearchIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import getSearchResults from "../api/search";
import { useNavigate } from "react-router-dom";
import saveCompany from "../api/company/save-company";
import Spinner from "../components/spinner";

export default function Home() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [selected, setSelected] = useState({ name: "", cin: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useQuery(
    [searchQuery, searchQuery],
    () => getSearchResults(searchQuery),
    {
      enabled: !!searchQuery,
    }
  );
  const m = useMutation(saveCompany, {
    onMutate: () => queryClient.invalidateQueries("corps"),
    onSuccess: () => navigate("/corp"),
  });

  return (
    <div className="flex justify-center items-center lg:mt-36 mt-10 space-x-2">
      <div className="relative lg:w-1/3 md:w-1/2 sm:w-2/3 w-3/4">
        <Combobox
          value={selected.name}
          onChange={(e: any) => setSelected(e)}
          disabled={m.isLoading}
        >
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
            <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
              <>
                Find a Corp&nbsp;
                {!isLoading && error && (
                  <span className="text-red-500">
                    (failed to get companies)
                  </span>
                )}
                {!m.isLoading && m.error && (
                  <span className="text-red-500">(failed to save company)</span>
                )}
              </>
            </Combobox.Label>
            <Combobox.Input
              className="border-gray-300 w-full pl-4 pr-12 py-3 text-sm leading-5 shadow-md text-gray-900 focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
              displayValue={(corp: string) => corp}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="start typing..."
            />
            <Combobox.Button className="absolute bottom-0 top-6 right-0 flex items-center pr-3">
              {isLoading ? (
                <Spinner className="h-5 w-5 text-gray-400" />
              ) : (
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchQuery("")}
          >
            <Combobox.Options
              hidden={!data || (data?.length === 0 && searchQuery === "")}
              className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {data?.length === 0 && searchQuery !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No companies found!
                </div>
              ) : (
                data?.map((corp, i) => (
                  <Combobox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={corp}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {corp.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-indigo-600"
                            }`}
                          >
                            <GlobeAltIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-gray-400"
                            }`}
                          >
                            <GlobeAltIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
      <button
        onClick={() => m.mutate({ cin: selected.cin, name: selected.name })}
        disabled={selected.cin === "" || m.isLoading}
        className="inline-flex items-center mt-auto px-4 py-3 border border-transparent shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {m.isLoading ? <Spinner className="h-5 w-5 text-white" /> : "Submit"}
      </button>
    </div>
  );
}
