//@ts-nocheck
import React from "react";
import TransactionList from "../../molecules/Transaction/TransactionList";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import SearchInput from "../../atoms/SearchInput";
import Dropdown from "../../atoms/Dropdown";
import { useState } from "react";
import PaginationOrganism from "../Others/PaginationOrganism";

interface Course {
  _id: string;
  name: string;
  rating: number;
  thumbnail: string;
}

type Option = {
  option: string;
  sort: string;
  order: string;
};

interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface Transaction {
  _id: string;
  user: User;
  courses: Course[];
  approved: boolean;
  cancelled: boolean;
  createdAt: string;
  updatedAt: string;
}

const TransactionOrganism: React.FC = () => {
  const [transaction, setTransaction] = React.useState<Transaction[]>([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [modified, setModified] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [reload, setReload] = useState(false);

  const onSelect = (option: Option) => {
    setSelectedOption(option.option);
  };

  useEffect(() => {
    setLoadingPage(true);
    customAxios
      .get("/transaction/all")
      .then((res) => {
        setTransaction(res.data.data);
        setLoadingPage(false);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
  }, [modified,reload]);

  const transactionsData: { data: Transaction[] } = {
    data: transaction,
  };

  return (
    <>
     {loadingPage ? (
      <div>
        <div className="flex justify-center items-center text-2xl h-[80vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    ) : (
      <>
      <div className="flex flex-col justify-between w-full h-[80vh]">
      <div>
        <div className="md:flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <h1 className="text-2xl font-semibold ml-3 mb-2">Subscriptions</h1>
          <div className="md:flex justify-center items-center">
            <div className="md:mr-5">
            <SearchInput 
              onChange={(value: string) => {
                const filteredData = transaction.filter((course: Course) => {
                  return course.user.name.toLowerCase().includes(value.toLowerCase());
                });
                setTransaction(filteredData);
                if(value===""){
                  setReload(prev=>!prev);
                }
              }}
              />
            </div>
            {/* <Dropdown
              options={["All", "Accepted", "Pending", "Rejected"]}
              selectedOption={selectedOption}
              onSelect={onSelect}
              className="md:w-[140px]"
            /> */}
          </div>
        </div>

        <TransactionList
          setModified={setModified}
          transactions={transactionsData.data}
        />
      </div>

      <PaginationOrganism
        totalResults={transaction.length}
        pageNumber={1}
        limit={50}
      />
    </div>
      </>
        
    )}
    </>


    
  );
};

export default TransactionOrganism;
