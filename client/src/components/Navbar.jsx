import React, { useEffect, useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Navbar = () => {

  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // ✅ LOGIN SUCCESS TOAST (runs once)
  useEffect(() => {
    if (user) {
      toast.success("Login successful 🚗");
    }
  }, [user]);

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋");
    navigate('/');
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      <Link to="/">
        <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row gap-4 sm:gap-8 max-sm:p-4 transition-all z-50 ${
          open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
        } ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>{link.name}</Link>
        ))}

        <div className="flex items-center gap-6">
          {isOwner && (
            <button onClick={() => navigate('/owner')} className="font-medium hover:text-primary transition-all">
              Dashboard
            </button>
          )}

          <button
            onClick={() => user ? handleLogout() : setShowLogin(true)}
            className="px-8 py-2 bg-primary text-white rounded-lg"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      <button className="sm:hidden" onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
