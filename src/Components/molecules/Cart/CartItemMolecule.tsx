import React from "react";
import { SlTrash } from "react-icons/sl";
import { AiOutlineShoppingCart } from "react-icons/ai";
import DisplayRating from "../../atoms/DisplayStar";

interface CartItemMoleculeProps {
  items: {
    id: number;
    itemName: string;
    imageSrc: string;
    rating: number;
  }[];
  onDelete: (itemId: number) => void;
  onAddToCart: (itemId: number) => void;
  cart?: boolean;
  wish?: boolean;
}

const CartItemMolecule: React.FC<CartItemMoleculeProps> = ({
  items,
  onDelete,
  onAddToCart,
  cart,
  wish,
}) => {
  return (
    <>
      {items.length === 0 && (
        <>
          <div className={cart ? "block p-10" : "hidden"}>
            <img
              src="/empty-cart.png"
              alt="Empty Cart"
              className="h-12 mx-auto opacity-50"
            />
            <div className="text-center text-gray-500">No items in Cart</div>
          </div>
          <div className={wish ? "block p-10" : "hidden"}>
            <img
              src="/broken-heart.png"
              alt="Empty Cart"
              className="h-12 mx-auto opacity-50"
            />
            <div className="text-center text-gray-500">
              No items in WishList
            </div>
          </div>
        </>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center gap-3 py-1 border-b border-gray-100 last:border-none pl-2"
        >
          <img
            className="h-16 w-16 rounded-xl object-cover object-center"
            src={item.imageSrc}
            alt={item.itemName}
          />
          <div>
            <div onClick={() => onAddToCart(item.id)}>
              <AiOutlineShoppingCart
                size={18}
                className={`text-primary absolute right-2 top-3 cursor-pointer ${
                  cart ? "hidden" : "block"
                }`}
              />
            </div>
            <div onClick={() => onDelete(item.id)} >
              <SlTrash
                size={15}
                className={`text-red-500 absolute right-2 cursor-pointer ${
                  wish ? "bottom-3" : "top-2"
                } `}
              />
            </div>
          </div>
          <div className="w-full pr-8">
            <p>{item.itemName}</p>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">{item.rating}</span>
              <DisplayRating size={12} rating={item.rating} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItemMolecule;
