import PaginationMolecule from '../../molecules/Others/PaginationMolecule';

type PaginationOrganismProps = {
  totalResults: number;
  pageNumber: number;
  limit: number;
};

const PaginationOrganism = (props:PaginationOrganismProps) => {
  const totalResults = props.totalResults;
  const pageNumber = props.pageNumber;
  const limit = props.limit;
  const X = pageNumber === 1 ? 1 : (pageNumber - 1) * limit + 1;
  const Y = Math.min(pageNumber * limit, totalResults);

  return (
    <div className="flex items-center justify-center md:justify-between py-5 ">
      <p className="text-gray-600 text-sm font-semibold hidden md:block">
        {`Showing ${X} - ${Y} of ${totalResults} results`}
      </p>
      <PaginationMolecule
        totalItems={totalResults}
        itemsPerPage={limit}
      />
    </div>
  );
};

export default PaginationOrganism;
