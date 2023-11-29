// ResponsiveCard.tsx

import DisplayRating from "../../atoms/DisplayStar";
import { SlCamrecorder, SlTrash } from "react-icons/sl";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { IoDocumentOutline, IoLanguageOutline } from "react-icons/io5";
import { SiLevelsdotfyi } from "react-icons/si";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import helper from "../../../Utils/helper";
import Button from "../../atoms/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { addNumberOfItems } from "../../../Store/Slices/cartSlice";
import { addNumberOfWishlistItems } from "../../../Store/Slices/wishSlice";
import { AiFillHeart } from "react-icons/ai";
import { deleteUser } from "../../../Store/Slices/userSlice";
import { addCourseLesson, addTab } from "../../../Store/Slices/tabSlice";
import { doneTab } from "../../../Store/Slices/tabSlice";
import { addCourseBasic } from "../../../Store/Slices/tabSlice";
import { execSupportReload } from "../../../Store/Slices/reloadSlice";

type Props = {
  title: string;
  description: string;
  enrolled?: number;
  lessons: number;
  videos: number;
  language: string;
  instructor: string;
  instructor_image: string;
  level: string;
  thumbnail: string;
  review: number;
  tag: string;
  rating: number;
  cart_wishlist: boolean;
  edit_delete: boolean;
  id: string;
  buttons?: boolean;
  shortCard?: boolean;
  published?: boolean;
};

const CardMolecule = (props: Props) => {
  const [loadingaddtocart, setLoadingAddToCart] = useState(false);
  const [loadingwishlist, setLoadingWishlist] = useState(false);
  const { truncateText } = helper();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: any) => state.user.role);
  const extWishlist = useSelector((state: any) => state.wish.wish);
  let wishlist: any = [];
  if (extWishlist) {
    wishlist = useSelector((state: any) => state.wish.wish)?.map(
      (e: any) => e._id
    );
  }

  const handleDeleteItemWish = (itemId: string) => {
    customAxios
      .delete(`/wishlist/remove/${itemId}`)
      .then((res) => {
        const numberOfItems = res.data.data.courses.length;
        dispatch(addNumberOfWishlistItems(numberOfItems));
      })
      .catch((err) => console.log(err));
  };

  const handlePublish = () => {
    setLoadingWishlist(true);
    customAxios
      .patch(`/course/publish/${props.id}`)
      .then(() => {
        setLoadingWishlist(false);
        navigate("/dashboard/admin/courses");
        toast.success("Course Published");
      })
      .catch(() => {
        setLoadingWishlist(false);
        toast.error("Something went wrong");
      });
  };

  const handleDecline = () => {
    setLoadingAddToCart(true);
    customAxios
      .patch(`/course/reject/${props.id}`)
      .then(() => {
        setLoadingAddToCart(false);
        toast.success("Course Rejected");
      })
      .catch(() => {
        setLoadingAddToCart(false);
        toast.error("Something went wrong");
      });
  };

  const handleAddToCart = () => {
    setLoadingAddToCart(true);
    customAxios
      .post(`/cart/add`, {
        course: props.id,
      })
      .then((res) => {
        setLoadingAddToCart(false);
        toast.success("Course Added to Cart");
        dispatch(addNumberOfItems(res.data.data.courses.length));
      })
      .catch((err) => {
        setLoadingAddToCart(false);
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          dispatch(deleteUser());
          navigate("/signin");
          toast.error("Please Login to add to cart");
        } else if (err.response.status == 400) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleEdit = () => {
    customAxios.get(`/course/id/${props.id}`).then((res) => {
      dispatch(addCourseBasic({ courseBasic: res.data.data }));
      dispatch(addTab({ createcourseTab: 1 }));
      dispatch(doneTab({ tabComplete: 2 }));
      dispatch(addCourseLesson({ lesson: res.data.data.sections }));
      navigate("/dashboard/instructor/mycourses/add");
    }).then((err) => {
      console.log(err);
    });
  }

  const handleDelete = () => {
    customAxios.delete(`/course/delete/${props.id}`).then((res) => {
      dispatch(execSupportReload());
      toast.success("Course Deleted");
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  }

  const handleAddToWishlist = () => {
    setLoadingWishlist(true);
    customAxios
      .post(`/wishlist/add`, {
        course: props.id,
      })
      .then((res) => {
        setLoadingWishlist(false);
        toast.success("Course Added to Wishlist");
        dispatch(addNumberOfWishlistItems(res.data.data.courses.length));
      })
      .catch((err) => {
        setLoadingWishlist(false);
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          dispatch(deleteUser());
          navigate("/signin");
          toast.error("Please Login to add to wishlist");
        } else if (err.response.status == 400) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="max-w-sm md:w-full mx-auto bg-white rounded-xl overflow-hidden shadow relative">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <span className="bg-green-900 text-white text-xs font-semibold rounded-full px-2 py-1 absolute top-2 right-3 z-10">
              {props.tag}
            </span>
            <img
              onClick={() => {
                navigate(`/course/${props.id}`);
              }}
              className="w-full  cursor-pointer h-72 md:h-52 object-cover object-center hover:scale-105 transition-all duration-500 ease-in-out "
              src={props.thumbnail}
              alt="Card Image"
            />
          </div>
          <div>
            <div
              className={` px-5 ${
                props.buttons && role == "learner" ? "block" : "hidden"
              }`}
            >
              {loadingaddtocart ? (
                <Button
                  className="py-0.5 mt-3"
                  text="Loading"
                  hover
                  disabled={true}
                />
              ) : (
                <Button
                  className="py-0.5 mt-3"
                  text="Add to Cart"
                  hover
                  disabled={false}
                  onClick={handleAddToCart}
                />
              )}

              {loadingwishlist ? (
                <Button
                  className="py-[5.5px] mt-2"
                  text="Loading"
                  hover
                  outline
                  disabled={true}
                />
              ) : (
                <Button
                  className="py-[5.5px] mt-2"
                  text="Add to wishlist"
                  hover
                  outline
                  disabled={false}
                  onClick={handleAddToWishlist}
                />
              )}
            </div>
            <div
              className={` px-5 ${
                props.buttons && role == "admin" && !props.published
                  ? "block"
                  : "hidden"
              }`}
            >
              {loadingwishlist ? (
                <Button
                  className="py-[5.5px] mt-2"
                  text="Loading"
                  hover
                  outline
                  disabled={true}
                />
              ) : (
                <Button
                  className="py-[5.5px] mt-2"
                  text="Publish"
                  hover
                  outline
                  disabled={false}
                  onClick={handlePublish}
                />
              )}

              {loadingaddtocart ? (
                <Button
                  className="py-0.5 mt-3"
                  text="Loading"
                  hover
                  disabled={true}
                />
              ) : (
                <Button
                  className="py-0.5 mt-3"
                  text="Reject"
                  hover
                  disabled={false}
                  onClick={handleDecline}
                />
              )}
            </div>
            <div className="p-6 text-sm relative">
              <div
                className={`justify-between items-center absolute top-3 right-3 ${
                  props.cart_wishlist ? "flex" : "hidden"
                }`}
              >
                <button
                  onClick={handleAddToCart}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <AiOutlineShoppingCart size={24} />
                </button>
                <button className="text-gray-600 hover:text-gray-900 ml-2">
                  {wishlist?.includes(props.id) ? (
                    <>
                      <div
                        onClick={() => {
                          handleDeleteItemWish(props.id);
                        }}
                      >
                        <AiFillHeart size={24} className="text-sec_pink" />
                      </div>
                    </>
                  ) : (
                    <div onClick={handleAddToWishlist}>
                      <AiOutlineHeart size={24} />
                    </div>
                  )}
                </button>
              </div>

              <div
                className={`justify-between items-center absolute top-3 right-3 ${
                  props.edit_delete ? "flex" : "hidden"
                }`}
              >
                <button className="text-gray-600 hover:text-gray-900" onClick={handleEdit}>
                  <SlNote size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-900 ml-2" onClick={handleDelete}>
                  <SlTrash size={20} />
                </button>
              </div>
              <div className={`${props.shortCard ? "hidden" : "block"}`}>
                <div className="flex gap-3 align-center">
                  <p className="text-yellow-500">
                    {props.rating ? props.rating.toFixed(1) : 0}
                  </p>
                  <DisplayRating rating={props.rating ? props.rating : 0} />
                  <p>({props.review})</p>
                </div>
                <p className="text-lg font-semibold text-gray-800 my-1 text-left">
                  {props.title}
                </p>
                <div className="text-gray-600 mt-3">
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: truncateText(
                        props.description ? props.description : "",
                        150
                      ),
                    }}
                  /> */}
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <IoLanguageOutline size={17} />
                    <p>{props.language}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoDocumentOutline />
                    <p>Lesson ({props.lessons})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SlCamrecorder />
                    <p>Videos ({props.videos})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${props.shortCard ? "hidden" : "block"}`}>
          <div className="flex justify-between gap-5 items-center p-3 border-t border-gray-100">
            <div className="flex justify-start items-center gap-1">
              <img
                className="w-8 h-8 rounded-full object-cover object-center"
                src={props.instructor_image}
                alt="Instructor"
              ></img>
              <p className="text-gray-600">{props.instructor}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary">
                <SiLevelsdotfyi />
              </span>
              <p>{props.level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMolecule;
