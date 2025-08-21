import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

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
           // Always load cart items from database when user is authenticated
           setCartItems(data.user.cartItems || {})
        }
      } catch (error) {
          setUser(null)
          // Clear cart items when user is not authenticated
          setCartItems({})
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

    // Debounce cart updates to backend
    const updateTimeout = useRef();

    useEffect(() => {
      // Only update cart if user is logged in and cart is not empty
      if (!user || Object.keys(cartItems).length === 0) return;
      
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => {
        const updateCart = async () => {
          try {
            const { data } = await axios.post('/api/cart/update', { cartItems });
            if (!data.success) {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
        updateCart();
      }, 500); // 500ms debounce
      return () => clearTimeout(updateTimeout.current);
    }, [cartItems, user]);

    //Add product to cart
    const addToCart = (itemID)=>{
      if (!user) {
        toast.error("Please login to add items to cart");
        setShowUserLogin(true);
        return;
      }

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
      if (!user) {
        toast.error("Please login to update cart");
        return;
      }

      let cartData = structuredClone(cartItems);
      cartData[itemID] = quantity;
      setCartItems(cartData);
      toast.success("Cart Updated")
    }

    //Remove Item from Cart
    const removeFromCart = (itemID) => {
      if (!user) {
        toast.error("Please login to modify cart");
        return;
      }

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

    //Clear Cart (both locally and in backend)
    const clearCart = async () => {
      if (!user) {
        setCartItems({});
        return;
      }

      try {
        setCartItems({});
        await axios.post('/api/cart/update', { cartItems: {} });
      } catch (error) {
        toast.error("Failed to clear cart");
      }
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

    // Logout function that clears cart items
    const logoutUser = async () => {
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          setCartItems({}); 
          navigate('/');
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    // Login function that loads cart items from database
    const loginUser = async (email, password, name = null, isRegister = false) => {
      try {
        console.log('Attempting login/register:', { isRegister, email, timestamp: new Date().toISOString() });
        
        const endpoint = isRegister ? '/api/user/register' : '/api/user/login';
        const payload = isRegister ? { name, email, password } : { email, password };
        
        console.log('Making request to:', `${axios.defaults.baseURL}${endpoint}`);
        
        const { data } = await axios.post(endpoint, payload);
        
        console.log('Response received:', { success: data.success, message: data.message });
        
        if(data.success){
          setUser(data.user);
          // Fetch the complete user data with cart items after login/register
          await fetchUser();
          navigate('/');
          return { success: true };
        } else {
          toast.error(data.message);
          return { success: false, message: data.message };
        }
      } catch (error) {
        console.error('Login request failed:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url
        });
        toast.error(error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const value = {navigate, user, setUser, isSeller, setIsSeller, 
      showUserLogin,setShowUserLogin, products, setProducts, currency,
      addToCart, updateCartItem, removeFromCart, clearCart, cartItems, searchQuery, setSearchQuery,
      getCartCount, getCartAmount, axios, fetchProducts, logoutUser, loginUser, fetchUser, setCartItems};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext);
}
