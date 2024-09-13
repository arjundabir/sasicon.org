import { Panel } from "@/types/panel";
import EditQuestionButton from "./EditQuestionButton";
import Link from "next/link";
import QuestionTableBody from "./QuestionTableBody";

export default function QuestionDashboard({
  questions,
}: {
  questions: Panel[];
}) {
  return (
    <div className="sm:px-6 lg:px-8 flex-1 overflow-y-auto overflow-x-hidden p-6 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Questions
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all questions submitted. Approve or reject questions.
          </p>
        </div>
      </div>
      <div className="w-full my-2">
        <button className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <Link href="/panel/ask">Add Question</Link>
        </button>
      </div>
      <hr className="my-2" />
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <QuestionTableBody initialQuestions={questions} />
          </div>
        </div>
      </div>
    </div>
  );
}
