import React,{useEffect}  from 'react'

import $ from './import-jquery.js'


function MyMenuHorizontal(props){

     return (
        <ul id="menuhorizontal01" className="menu-horizontal" >
            <li className="parent element pr" >
                <a className="element-link gr ripple" href="#">Link 1<span className="fa fa-chevron-right push-float-right" ></span></a>
            <div class="sub-menu sb" >
                <a className="back-element bk ripple" href="#" ><span className="fa fa-chevron-left push-float-left" ></span>Back</a> 
                <a className="element-link el ripple" href="#/template1" >SubLink 1</a>
                <a className="element-link el ripple" href="#/template2" >SubLink 2</a>
                <a className="element-link el ripple" href="#/template3" >SubLink 3</a>
                <a className="element-link el ripple" href="#/template4" >SubLink 4</a>
                <a className="element-link el ripple" href="#/template5" >SubLink 5</a>
            </div>
            </li>
            <li className="element item itm" ><a className="element-link el ripple" href="#/template6">Link 2</a></li>
            <li className="parent element pr" ><a className="element-link gr ripple" href="#">Link 3<span className="fa fa-chevron-right push-float-right" ></span></a>
            <div className="sub-menu sb" >
                <a className="back-element bk ripple" href="#" ><span className="fa fa-chevron-left push-float-left" ></span> Back</a> 
                <a className="element-link el ripple" href="#/template7" >SubLink 1</a>
                <a className="element-link el ripple" href="#/template8" >SubLink 2</a>
                    
                <a className="sub-element" href="#/template9" >SubLink 3</a>
                <a className="sub-element" href="#/template10" >SubLink 4</a>
                
            </div>
            </li>
            <li className="element item itm"><a className="element-link el ripple" href="#/template12">Link 4</a></li>
        </ul>
          
     )

}

export default MyMenuHorizontal;


