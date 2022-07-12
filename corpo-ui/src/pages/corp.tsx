import { useQuery } from "react-query";
import getCompanies from "../api/company/get-companies";
import { PlusIcon } from "@heroicons/react/outline";
import Spinner from "../components/spinner";
import { useNavigate } from "react-router-dom";

export default function Corp() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery("corps", getCompanies);
  return (
    <div className="flex justify-center items-center lg:mt-36 mt-10 space-x-2">
      <div className="lg:w-1/3 md:w-1/2 sm:w-2/3 w-3/4 mb-16">
        <>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex space-x-4 divide-x items-center mt-auto mb-5 px-4 py-3 border border-transparent shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="pl-6 pr-3">Add Company</span>
          </button>
          {isLoading && <Spinner className="h-5 w-5 text-black" />}
          {!isLoading && error && (
            <small className="block text-red-600">
              Failed to get the saved company list
            </small>
          )}
          {!isLoading && !error && data && data.length > 0 && (
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CIN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map(({ cin, name }, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {cin}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">
                          {name}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
