import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js' // Adjust the path as necessary
import { useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const {user, setUser, setShowUserLogin, navigate} = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate('/');
  }

  return (
     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/'onClick={()=> setOpen(false)} className="flex items-center gap-2">
                <img className="h-20 w-20" src={assets.logo} alt="Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className="w-4 h-4" src={assets.search_icon} alt="Search Icon" />
                </div>   

                <div onClick={()=>navigate("/cart")}className="relative cursor-pointer">
                    <img className="w-6 opacity-80" src={assets.nav_cart_icon} alt='Cart'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? ( <button onClick={()=> setShowUserLogin(true)} 
                className="cursor-pointer px-8 py-2 bg-primary hover:bg-accent transition text-white rounded-full">
                    Login
                </button>
                ):
                (
                  <div className='relative group'>
                    <img src={assets.profile_icon} alt="Profile" className="w-10"/>
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                      <li onClick={()=>navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                      <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                    </ul>
                  </div>
                )
                }
               
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="Menu" />
            </button>

            {/* Mobile Menu */}
            { open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[100px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink onClick={()=> setOpen(false)} to='/' >Home</NavLink>
                <NavLink onClick={()=> setOpen(false)} to='/products' >All Product</NavLink>
                {user && 
                <NavLink onClick={()=> setOpen(false)} to='/products' >My Orders</NavLink>
                }
                <NavLink onClick={()=> setOpen(false)} to='/' >Contact</NavLink>

                {!user ?(
                  <button onClick={()=>{
                    setOpen(false);
                    setShowUserLogin(true);
                  }}
                  className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-accent transition text-white rounded-full text-sm">
                    Login
                </button>
                ):(
                  <button onClick={logout}
                  className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-accent transition text-white rounded-full text-sm">
                    Logout
                </button>
                )
                }
                
            </div>
             ) }

        </nav>
              
  )
}

export default Navbar
