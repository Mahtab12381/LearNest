import SearchInput from '../../atoms/SearchInput'
import QuizFormMolecule from './QuizFormMolecule'

type Props = {}

const AddQuizOrganism = (props: Props) => {
  return (
    <div className="">
        <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <div>
            <h1 className="text-2xl font-semibold ml-3">Create Quiz</h1>
          </div>
        </div>
        <div>
            <QuizFormMolecule/>
        </div>
    </div>
  )
}

export default AddQuizOrganism