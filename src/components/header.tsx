import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png'
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";


interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <div className="logo">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        <img className="logo-img" src={Logo} alt="Logo" />
      </Link>
      </div>
      <div className="right-header">
     <div className="icons-div">
     <div className="icons">
     

     <Link onClick={() => setIsOpen(false)} to={"/"}>
       Home
     </Link>

     <Link onClick={() => setIsOpen(false)} to={"/search"}>
       
       <FaSearch/>
     </Link>
     <Link onClick={() => setIsOpen(false)} to={"/cart"}>
       <FaShoppingBag />
     </Link>

     {user?._id ? (
       <>
         <button onClick={() => setIsOpen((prev) => !prev)}>
           <FaUser />
         </button>
         <dialog open={isOpen}>
           <div>
             {user.role === "admin" && (
               <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                 Admin
               </Link>
             )}

             <Link onClick={() => setIsOpen(false)} to="/orders">
               Orders
             </Link>
             <button onClick={logoutHandler}>
               <FaSignOutAlt />
             </button>
           </div>
         </dialog>
       </>
     ) : (
       <Link to={"/login"}>
         <FaSignInAlt />
       </Link>
     )}
     </div>
     </div>
      <div className="admin-link">
      <Link className="admin-dashboard" to={"https://admin-dashboard.arshdeepsingh.in/admin/dashboard"}>
        Not an admin? <span className="link">check demo Admin Dashboard</span>
      </Link>
      </div>
      </div>
    </nav>
  );
};

export default Header;
