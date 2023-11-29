import React from "react";
import DisplayRating from "../../atoms/DisplayStar";
import helper from "../../../Utils/helper";
import AccordionCustomIcon from "../../atoms/Accordion";
import Button from "../../atoms/Button";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";

interface Course {
  _id: string;
  name: string;
  rating: number;
  thumbnail: string;
}

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
}

interface TransactionListProps {
  transactions: Transaction[];
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionList: React.FC<TransactionListProps> = ({
  setModified,
  transactions,
}) => {
  const { formatDateTime } = helper();
  const [loading, setLoading] = React.useState(false);
  const [declineLoading, setDeclineLoading] = React.useState(false);
  const role = useSelector((state: any) => state.user.role);

  const handleAppropve = (transaction_id: string) => {
    setLoading(true);
    customAxios
      .patch(`/transaction/approve/${transaction_id}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        setModified((prev) => !prev);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleDecline = (transaction_id: string) => {
    setDeclineLoading(true);
    customAxios
      .patch(`/transaction/reject/${transaction_id}`)
      .then((res) => {
        setDeclineLoading(false);
        toast.success(res.data.message);
        setModified((prev) => !prev);
      })
      .catch((err) => {
        setDeclineLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="container mx-auto mt-5">
      <div>
        {transactions.map((transaction, index) => (
          <AccordionCustomIcon
            key={transaction._id}
            accordionHeader={
              <div className="flex justify-between items-center gap-5 w-full">
                <div className="flex gap-2 items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover object-center"
                    src={
                      import.meta.env.VITE_BUCKET_BASE +
                      transaction.user.imageUrl
                    }
                  ></img>
                  <div>
                    <p className="text-md font-semibold">
                      {transaction.user.name}
                    </p>
                    <p className="text-sm">{transaction.user.email}</p>
                  </div>
                </div>

                <p className="text-sm hidden md:block">
                  {formatDateTime(transaction.createdAt)}
                </p>
                {transaction.approved ? (
                  <p className="text-sm text-white px-2 py-0.5 rounded-xl bg-green-500 w-20 text-center">
                    Approved
                  </p>
                ) : transaction.cancelled ? (
                  <p className="text-sm bg-red-500 px-2 py-0.5 rounded-xl text-white w-20 text-center">
                    Declined
                  </p>
                ) : (
                  <p className="text-sm  text-white px-2 py-0.5  rounded-xl bg-yellow-500 w-20 text-center">
                    Pending
                  </p>
                )}
              </div>
            }
            accordionNumber={index + 1}
          >
            <div>
              {
                <div className="p-2">
                  <div>
                    <h3 className="text-md font-semibold mb-1">Courses:</h3>
                    {transaction.courses.map((course) => (
                      <div key={course._id} className="mb-2">
                        <div className="flex item-center gap-5">
                          <div className="flex items-center justify-center">
                            <img
                              src={
                                import.meta.env.VITE_BUCKET_BASE +
                                course.thumbnail
                              }
                              alt={course.name}
                              className=" h-16 w-16 object-cover object-center rounded-xl"
                            />
                          </div>

                          <div className="w-2/3">
                            <p className="text-md font-semibold">
                              {course.name}
                            </p>
                            <p className="text-yellow-500">
                              {course.rating.toFixed(1)}
                            </p>
                            <DisplayRating size={15} rating={course?.rating} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {role === "admin" && (
                    <>
                      <div className="flex item-center justify-center gap-3 mb-2">
                        <div>
                          {loading ? (
                            <Button
                              className="md:w-[100px] py-[7px] float-right"
                              text="Loading"
                              hover
                              outline
                              disabled={true}
                            />
                          ) : (
                            <Button
                              className="md:w-[100px] py-[7px] float-right"
                              text="Accept"
                              hover
                              outline
                              disabled={false}
                              onClick={() => {
                                handleAppropve(transaction._id);
                              }}
                            />
                          )}
                        </div>
                        <div>
                          {declineLoading ? (
                            <Button
                              className="md:w-[100px] py-0.5 float-right"
                              text="Loading"
                              hover
                              disabled={true}
                            />
                          ) : (
                            <Button
                              className="md:w-[100px] py-0.5 float-right"
                              text="Decline"
                              hover
                              disabled={false}
                              onClick={() => {
                                handleDecline(transaction._id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              }
            </div>
          </AccordionCustomIcon>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
