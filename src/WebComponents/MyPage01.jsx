import React from 'react'

export const MyPage01= (props) => {
    
   return (
    <div id={props.id} className="wrapper page child" >
        <div className="nav" >
            <nav  >
            <button type="button" id="btn-toggle-back-3" className="nav-mobile push-float-left"   >
                <span className="fa fa-chevron-left" ></span>
                <span className="texto-btn"  > Back</span>
            </button>
            </nav>
        </div>  
        <div className="main" >
        <main>
            <div className="box content"  >
                    
            </div>
        </main>
        </div>
        <div className="footer">
            <footer  >
                
            </footer>
        </div>
    </div>

   )
}




