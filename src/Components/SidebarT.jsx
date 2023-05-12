import React from "react";
import Navbar from "./NavbarT"
import Search from "./SearchT"
import Chats from "./ChatsT"
import "../stilos.scss";
import GroupButton from './GroupButton';

const Sidebar = () => {
  return (
    <div>

   
      <div className="sidebarT">
        
        <Navbar />
        <Search/>
        <Chats/> 
        
        
        
      
      </div>
      <div className="espacios"></div>
      <div  >
        <GroupButton />
      </div>
      
      
    </div>
    
    
  );
};

export default Sidebar;
