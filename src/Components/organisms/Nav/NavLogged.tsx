import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineBell } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { addId, deleteUser } from "../../../Store/Slices/userSlice";
import CartItemMolecule from "../../molecules/Cart/CartItemMolecule";
import customAxios from "../../../Utils/customAxios";
import { addNumberOfItems, addToCart } from "../../../Store/Slices/cartSlice";
import helper from "../../../Utils/helper";
import {
  addNumberOfWishlistItems,
  addToWishlist,
} from "../../../Store/Slices/wishSlice";
import { useEffect } from "react";
import Button from "../../atoms/Button";
import { toast } from "react-toastify";
import { RiHeartsLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const numberOfItemsredux = useSelector(
    (state: any) => state.cart.numberOfItems
  );

  const numberOfItemsWishredux = useSelector(
    (state: any) => state.wish.numberOfItems
  );
  const cartItemsredux = useSelector((state: any) => state.cart.cart);
  const wishItemsredux = useSelector((state: any) => state.wish.wish);
  const role = useSelector((state: any) => state.user.role);
  const user_id = useSelector((state: any) => state.user.id);
  const profileImageReload = useSelector((state: any) => state.reload.profileImageReload);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isWishDropdownOpen, setIsWishDropdownOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const { getTimeAgo } = helper();

  const handleToggleNav = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const handleToggleProfileDropdown = () => {
    setIsProfileDropdownOpen(
      (prevIsProfileDropdownOpen) => !prevIsProfileDropdownOpen
    );
    setIsNotificationDropdownOpen(false);
    setIsCartDropdownOpen(false);
    setIsWishDropdownOpen(false);
  };

  const handleToggleCartDropdown = () => {
    setIsCartDropdownOpen((prevIsCartDropdownOpen) => !prevIsCartDropdownOpen);
    setIsNotificationDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsWishDropdownOpen(false);
  };

  const handleToggleWishDropdown = () => {
    setIsWishDropdownOpen((prevIsWishDropdownOpen) => !prevIsWishDropdownOpen);
    setIsNotificationDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsCartDropdownOpen(false);
  };

  const handleToggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(
      (prevIsNotificationDropdownOpen) => !prevIsNotificationDropdownOpen
    );
    setIsProfileDropdownOpen(false);
    setIsCartDropdownOpen(false);
    setIsWishDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsProfileDropdownOpen(false);
    dispatch(deleteUser());
    dispatch(addId(""));
    navigate("/signin");
  };

  const handleDeleteItem = (itemId: number) => {
    customAxios
      .patch(`/cart/remove/${itemId}`)
      .then((res) => {
        const numberOfItems = res.data.data.courses.length;
        dispatch(addNumberOfItems(numberOfItems));
      })
      .catch((err) => console.log(err));
  };

  const handleAddTocart = (itemId: number) => {
    customAxios
      .post(`/cart/add`, {
        course: itemId,
      })
      .then((res) => {
        toast.success("Course Added to Cart");
        dispatch(addNumberOfItems(res.data.data.courses.length));
        handleDeleteItemWish(itemId);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/login");
          toast.error("Please Login to add to cart");
        } else if (err.response.status == 400) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleDeleteItemWish = (itemId: number) => {
    customAxios
      .delete(`/wishlist/remove/${itemId}`)
      .then((res) => {
        const numberOfItems = res.data.data.courses.length;
        dispatch(addNumberOfWishlistItems(numberOfItems));
      })
      .catch((err) => console.log(err));
  };

  const handleCheckout = () => {
    setLoading(true);
    customAxios
      .post("/transaction/add")
      .then(() => {
        setLoading(false);
        dispatch(addNumberOfItems(0));
        dispatch(addToCart([]));
        toast.success("Admin will approve your Subscription");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const cartItems =
    cartItemsredux.length > 0
      ? cartItemsredux.map((item: any) => {
          return {
            id: item._id,
            itemName: item.name,
            imageSrc: import.meta.env.VITE_BUCKET_BASE + item.thumbnail,
            rating: item.rating.toFixed(1),
          };
        })
      : [];

  const wishItems =
    wishItemsredux.length > 0
      ? wishItemsredux.map((item: any) => {
          return {
            id: item._id,
            itemName: item.name,
            imageSrc: import.meta.env.VITE_BUCKET_BASE + item.thumbnail,
            rating: item.rating.toFixed(1),
          };
        })
      : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (role === "learner") {
      customAxios
        .get("/cart/view")
        .then((res) => {
          if (res.data.message === "No Item in Cart") {
            dispatch(addNumberOfItems(0));
            dispatch(addToCart([]));
            return;
          }
          const numberOfItems = res.data.data.courses.length;
          dispatch(addNumberOfItems(numberOfItems));
          dispatch(addToCart(res.data.data.courses));
        })
        .catch(() => {
          dispatch(addNumberOfItems(0));
          dispatch(addToCart([]));
        });
    } else {
      dispatch(addNumberOfItems(0));
      dispatch(addToCart([]));
    }
  }, [numberOfItemsredux]);

  useEffect(() => {
    if (role === "learner") {
      customAxios
        .get("/wishlist/view")
        .then((res) => {
          if (res.data.message === "No Item in Wishlist") {
            dispatch(addNumberOfWishlistItems(0));
            dispatch(addToWishlist([]));
            return;
          }
          const numberOfItems = res.data.data.courses.length;
          dispatch(addNumberOfWishlistItems(numberOfItems));
          dispatch(addToWishlist(res.data.data.courses));
        })
        .catch(() => {
          dispatch(addNumberOfWishlistItems(0));
          dispatch(addToWishlist([]));
        });
    } else {
      dispatch(addNumberOfWishlistItems(0));
      dispatch(addToWishlist([]));
    }
  }, [numberOfItemsWishredux]);

  useEffect(() => {
    if (user_id == "") return;
    customAxios
      .get("/notification/user-notification/" + user_id)
      .then((res) => {
        setNotification(res.data.data);
        setUnReadNotification(
          res.data.data.filter((item: any) => !item.read).length
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id, unReadNotification]);

  useEffect(() => {
    customAxios.get("/user/my-profile").then((res) => {
      const profileData: any = res.data.data;
      setImgUrl(profileData.imageUrl);
    }).catch((err) => {
      console.log(err);
    });
  }, [profileImageReload]);

  return (
    <div className="bg-gray-100 p-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black font-bold text-3xl">
          <span className="text-sec_pink">Lear</span>
          <span>Nest</span>
        </div>
        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex lg:items-center lg:justify-center flex-grow">
          <NavLink
            to={`/dashboard/${role}`}
            className="text-black mx-4 lg:hover:text-sec_pink transition"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/courses"
            className="text-black mx-4 lg:hover:text-sec_pink transition"
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className="text-black mx-4 lg:hover:text-sec_pink transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-black mx-4 lg:hover:text-sec_pink transition"
          >
            Contact
          </NavLink>
        </div>

        <div className="items-center hidden lg:flex lg:gap-5">
          {/* Cart Icon */}
          <div
            className={`relative ${
              role == "instructor" || role == "admin" ? "hidden" : "block"
            }`}
          >
            <AiOutlineShoppingCart
              size={24}
              className="text-black cursor-pointer"
              onClick={handleToggleCartDropdown}
            />
            <div>
              <span className="absolute top-[-6px] right-[-6px] rounded-full bg-sec_pink text-white text-xs px-1">
                {numberOfItemsredux}
              </span>
            </div>
            {/* Cart Dropdown */}
            {isCartDropdownOpen && (
              <div className="absolute top-8 right-0 bg-white border rounded-lg w-[450px] min-h-[250px] max-h-[70vh] flex flex-col justify-between p-5 overflow-y-scroll shadow-lg">
                <div>
                  <CartItemMolecule
                    items={cartItems}
                    onDelete={handleDeleteItem}
                    cart={true}
                    onAddToCart={handleAddTocart}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  {loading ? (
                    <Button
                      className="w-[150px]"
                      text="Loading"
                      hover
                      disabled={true}
                    />
                  ) : (
                    <Button
                      className="w-[150px]"
                      text="Checkout"
                      hover
                      disabled={false}
                      onClick={handleCheckout}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          {/* WishList Icon */}
          <div
            className={`relative ${
              role == "instructor" || role == "admin" ? "hidden" : "block"
            }`}
          >
            <RiHeartsLine
              size={24}
              className="text-black cursor-pointer"
              onClick={handleToggleWishDropdown}
            />
            <div>
              <span className="absolute top-[-6px] right-[-6px] rounded-full bg-sec_pink text-white text-xs px-1">
                {numberOfItemsWishredux}
              </span>
            </div>
            {/* Cart Dropdown */}
            {isWishDropdownOpen && (
              <div className="absolute top-8 right-0 bg-white border rounded-lg w-[450px] min-h-[250px] max-h-[70vh] flex flex-col justify-between p-5 overflow-y-scroll shadow-lg">
                <div>
                  <CartItemMolecule
                    items={wishItems}
                    onDelete={handleDeleteItemWish}
                    wish={true}
                    onAddToCart={handleAddTocart}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <AiOutlineBell
              size={25}
              className="text-black cursor-pointer"
              onClick={handleToggleNotificationDropdown}
            />
            <div>
              <span className="absolute top-[-5px] right-[-3px] rounded-full bg-sec_pink text-white text-xs px-1">
                {unReadNotification}
              </span>
            </div>
            {/* Notification Dropdown */}
            {isNotificationDropdownOpen && (
              <div className="absolute shadow top-8 right-0 bg-white border rounded-lg p-2 w-80 h-96 overflow-y-scroll">
                {notification.length > 0 ? (
                  notification.map((item: any) => {
                    return (
                      <div
                        className={`text-black cursor-pointer mb-1 px-2 hover:text-primary py-3 border-b ${
                          item.read
                            ? ""
                            : "bg-primary bg-opacity-10 rounded-xl px-2"
                        }`}
                        onClick={() => {
                          if (item.read) return navigate(item.link);
                          customAxios
                            .patch("/notification/make-read/" + item._id)
                            .then(() => {
                              setUnReadNotification(unReadNotification - 1);
                              navigate(item.link);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        <div className="flex justify-start items-center">
                          <div className="flex justify-between items-end w-2/12">
                            <img
                              className="h-10 w-10 object-cover object-center"
                              src={`${
                                item.type === "subscription"
                                  ? "/certificate.png"
                                  : item.type === "assignment"
                                  ? "/approve.png"
                                  : item.type === "course"
                                  ? "/book.png"
                                  : item.type === "feedback"
                                  ? "/feedback.png"
                                  : ""
                              }`}
                            ></img>
                          </div>
                          <div className="w-10/12">
                            <p className="ml-3">{item.message}</p>
                          </div>
                        </div>
                        <p className="text-sm text-end mr-3">
                          {getTimeAgo(item.createdAt)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-black cursor-pointer hover:text-primary">
                    <p className="ml-3 text-center">No Notification</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="relative">
            <img
              src={import.meta.env.VITE_BUCKET_BASE + imgUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleToggleProfileDropdown}
            />
            <div className="mr-4">
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-11 right-0 bg-white border rounded-lg p-2 w-48">
                  <div
                    className="flex item-center gap-3 text-black cursor-pointer hover:text-primary"
                    onClick={handleLogout}
                  >
                    <span className="flex justify-center items-end pl-3">
                      <IoExitOutline size={20} />
                    </span>
                    <span>Logout</span>
                  </div>
                  {/* Add more options as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Toggle Button */}
        <button
          onClick={handleToggleNav}
          className="lg:hidden text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links (Mobile) */}
      <div
        className={`lg:hidden w-2/5 fixed z-50 top-0 right-0 h-screen bg-white p-4 transform transition-transform ease-in-out duration-300 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={handleToggleNav}
            className="lg:hidden text-black focus:outline-none"
          >
            <svg
              className={`h-6 w-6 ${isNavOpen ? "block" : "hidden"}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between h-[92vh]">
          <div className="ml-5 border-t pt-2 mt-3">
            <NavLink
              to="/dashboard"
              className="text-black block mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/courses"
              className="text-black block mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Courses
            </NavLink>

            <NavLink
              to="/about"
              className="text-black block mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-black mb-4 block lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Contact
            </NavLink>

            <NavLink
              to="/logout"
              className="text-black block lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Logout
            </NavLink>
          </div>

          <div className="hidden">
            <div className="flex items-center mt-4 ">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={import.meta.env.VITE_BUCKET_BASE + imgUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={handleToggleProfileDropdown}
                />
                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white border rounded-lg p-2">
                    <div
                      className="text-black cursor-pointer hover:text-sec_pink"
                      onClick={() => console.log("Profile Option 1 clicked")}
                    >
                      Profile Option 1
                    </div>
                    <div
                      className="text-black cursor-pointer hover:text-sec_pink"
                      onClick={() => console.log("Profile Option 2 clicked")}
                    >
                      Profile Option 2
                    </div>
                    {/* Add more options as needed */}
                  </div>
                )}
              </div>
              {/* Profile Name */}
              <div className="ml-4">
                <div
                  className="text-black cursor-pointer"
                  onClick={handleToggleProfileDropdown}
                >
                  John Doe
                </div>
              </div>
            </div>
            {/* Notification Icon */}
            <div className="flex items-center mt-4 relative">
              <AiOutlineBell
                size={24}
                className="text-black cursor-pointer"
                onClick={handleToggleNotificationDropdown}
              />
              {/* Notification Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white border rounded-lg p-2">
                  <div
                    className="text-black cursor-pointer hover:text-sec_pink"
                    onClick={() => console.log("Notification Option 1 clicked")}
                  >
                    Notification Option 1
                  </div>
                  <div
                    className="text-black cursor-pointer hover:text-sec_pink"
                    onClick={() => console.log("Notification Option 2 clicked")}
                  >
                    Notification Option 2
                  </div>
                  {/* Add more options as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
