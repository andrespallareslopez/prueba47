import React,{useEffect}  from 'react'

import $ from './import-jquery.js'

import MyMenuVertical from './MyMenuVertical.jsx'
import MyMenuHorizontal from './MyMenuHorizontal.jsx'

function Layout(){
    useEffect(()=> {
        $("#btn-toggle-right").click(function(event){
          event.preventDefault();
          $(".menu-horizontal").toggleClass("navbars-open");    
        });
        
        $("#btn-toggle-left").click(function(event){
          
          event.preventDefault();
          
          $(".lyt01 aside").toggleClass("section-open");
        });
        //*******************************************************
        
        $(document).on("click","#btn-toggle-sign-in",function(event){
          //console.log("estoy en sig-in");
          event.preventDefault();
          $(".form-login").toggleClass("open-login");
          
        });
        //*********************************************************
        $("#btn-footer-menu01").click(function(event){
          console.log("estoy en boton footer");
          event.preventDefault();
          if ($(".footer-menu").hasClass("expand-footer")){
             $(".footer-menu").removeClass("expand-footer");
          }else{
             $(".footer-menu").addClass("expand-footer");
          }
        });
       },[])

    return (
        <div className="container " >
          <div className='lyt01'>
              <header className='sm:block bg-blue-500 p-6 '>
                  
              </header>
              <nav className='group   bg-blue-700 shadow-xl leading-none  '>
                  <button type="button" id="btn-toggle-left" className="nav-mobile ripple push-float-left">
                    <i className="fa fa-bars fa-2x" ></i>  
                  </button>
        
                  <button type="button" id="btn-toggle-right" className="nav-mobile ripple push-float-right">
                    <i className="fa fa-list fa-2x" ></i>
                  </button>
                  <button type="button" id="btn-toggle-sign-in" className="nav-mobile ripple push-float-right">
                    <i className="fa fa-sign-in fa-2x" ></i>  
                  </button>
                  
                  <MyMenuHorizontal />
              
              </nav>
              <div className='row' >
                  <aside>
                    <MyMenuVertical id="MenuVertical01" />
                  </aside>
                  <section className='bg-blue-100'>
                      
                  </section>
              </div>
              <footer className='bg-blue-500'>
                  
              </footer>
          </div>
          <div className="childLayout">

          </div>
          <div className="childLayout1"></div>
          <div className="childLyt" ></div>
        </div>
    )

}

export default Layout;
