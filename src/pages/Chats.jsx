import Navigation from '../Components/NavigationLayout';
import './Chats.css';
import React, { useContext, useEffect, useState } from "react";
import Sidebar from '../Components/SidebarT';
import Chat from '../Components/ChatT';
import "../stilos.scss";



class Chats extends React.Component {

    constructor(props) {
        super(props);
        console.dir(props);
        this.state = {
            prop: props,
            cantidadBotones: 0
        };
        document.body.classList.add('bodyBack');
        
    }
    componentDidMount() {
    }



    render() {



        return (

            <section className="vh-100 gradient-custom2">
                
                <div className='h-100'>
                    <Navigation />
                    <div className='homeT'>
                        <div className="containerT">
                            <Sidebar/> 
                            <Chat/>
                        </div>
                    </div>
                    
                </div>
                
            </section>

           /* <section className="vh-100 gradient-custom2">
               <div className='h-100'>
                   <Navigation />
            
                    <br />
                   <Container >
            
                       <div className='separar'>
                           <div>
                               <Search />
                            </div>  
                            <ChatWindow />
                        </div>
                    </Container>
               </div>
            </section>*/
            
        )
    }
}

export default Chats;