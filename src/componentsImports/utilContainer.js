import $ from './import-jquery.js'

export const appendToContainer = function(html,containerview){
       
    console.log("estoy dentro de appendToContainer");
    console.log(containerview)
    
    
    $(html).appendTo(containerview);
    
};
/*
    removeContainer(self.options.containerView); 
    appendToContainer.apply(self,[html,self.options.containerView]); 
*/

export function recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    } else {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
};
export const removeContainer = function(containerview){
    var self=this;
    console.log("estoy dentro de removeContainer");
    console.log(containerview)
       //Tratar de borrar elementos de esta manera y sus eventos
    console.dir(document.querySelector(containerview))
    if (document.querySelector(containerview))
       recreateNode(document.querySelector(containerview),true);     
    
    //limpiar el area antes de inyectar el codigo html
    $(containerview).empty();
    $(containerview).remove();

    
};