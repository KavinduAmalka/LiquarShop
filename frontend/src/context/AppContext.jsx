import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env?.VITE_CURRENCY || '$';

    const navigate =useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    //Fetch Seller Status
    const fetchSeller = async ()=>{
      try {
        const {data} = await axios.get('/api/seller/is-auth');
        if (data.success){
          setIsSeller(true);
        }else{
          setIsSeller(false)
        }
      } catch (error) {
          setIsSeller(false);
      }
    }

    // Fetch User Auth Status, User Data and Cart Items
    const fetchUser = async () =>{
      try {
        const { data } = await axios.get('/api/user/is-auth');
        if(data.success){
           setUser(data.user)
           setCartItems(data.user.cartItems)
        }
      } catch (error) {
          setUser(null)
      }
    }

    //Fetch All Products
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/product/list')
        if(data.success){
            setProducts(data.products);
        }else{
          toast.error(data.message);
        }
      } catch (error) {
          toast.error(data.message);

      }
    } 

    // Load products when component mounts
    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []); 

    //Add product to cart
    const addToCart = (itemID)=>{
      let cartData = structuredClone(cartItems);

      if(cartData[itemID]){
        cartData[itemID] +=1;
      }else{
        cartData[itemID] = 1;
      }
      setCartItems(cartData);
      toast.success("Added to Cart")
    }

    //Update Cart Item Quantity
    const updateCartItem = (itemID, quantity) =>{
      let cartData = structuredClone(cartItems);
      cartData[itemID] = quantity;
      setCartItems(cartData);
      toast.success("Cart Updated")
    }

    //Remove Item from Cart
    const removeFromCart = (itemID) => {
      let cartData = structuredClone(cartItems);
      if(cartData[itemID]){
        cartData[itemID] -= 1;
        if(cartData[itemID] === 0){
          delete cartData[itemID];
        }
      }
      toast.success("Item removed from Cart");
      setCartItems(cartData);
    }

    //Get Cart Item Count
    const getCartCount = () => {
      let totalcount = 0;
      for(const item in cartItems){
        totalcount += cartItems[item];
      }
      return totalcount;
    }

    //Get Cart Total Price
    const getCartAmount = ()=>{
      let totalAmount = 0;
      for (const items in cartItems){
        let itemInfo = products.find((product) => product._id === items);
        if(itemInfo && cartItems[items] >0){
          totalAmount += itemInfo.offerPrice * cartItems[items];
        }
      }
      return Math.floor(totalAmount * 100) / 100; 
    }

    const value = {navigate, user, setUser, isSeller, setIsSeller, 
      showUserLogin,setShowUserLogin, products, setProducts, currency,
      addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery,
      getCartCount, getCartAmount, axios, fetchProducts};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext);
}
