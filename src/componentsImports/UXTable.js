import jQuery from '../../src/componentsImports/import-jquery.js';
//import * as inputmask1 from 'jquerymask';
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

import {UXPaginacionControl} from '../../src/componentsImports/UXPaginacionControl.js'
import {UXPaginacion} from '../../src/componentsImports/UXPaginacion.js'

import Enumerable from 'linq'

import IMask from 'imask'

import Inputmask from 'inputmask'

import Mousetrap from 'mousetrap';
import moment from 'moment'
var controls;

;(function(ns,$){
    "use strict";
       
       ns.UXTable=(function(){
          return function(options){
              if (options){
                 this.init(options);
              }              
          };
       })();
       ns.enumTraking={
           insert:0,
           update:1,
           delet:2,
           read:4
       };
       ns.sort_by=function(field,reverse,primer){
         var key = primer ? 
           function(x) {return primer(x[field]);} : 
           function(x) {return x[field];};
        
           reverse = !reverse ? 1 : -1;
           //console.dir(key);
         return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         };   
       };
       ns.UXTable.prototype.extend=(function(){
             
             return function(objeto){
                objectExtend(objeto,ns.container.prototype);      
             };
             
         })();
       ns.UXTable.prototype.config={};
       ns.UXTable.prototype.options={};
       ns.UXTable.prototype.metadata={};
       ns.UXTable.prototype.init=function(options){
             //this.config={};
             (function(config){
                 config.containerComponent=config.containerComponent||"table-01";
                 
                 config.classHeader=config.classHeader||"cabezera";
                 config.classRow=config.classRow||"dato";
                 config.classCell=config.classCell||"cell";
                 config.classFooter=config.classFooter||"pie";
                 
                 config.iconStringSortAsc=config.iconStringSortAsc||"fa-sort-alpha-asc";
                 config.iconStringSortDesc=config.iconStringSortDesc||"fa-sort-alpha-desc";
                 config.iconNumericSortAsc=config.iconNumericSortAsc||"fa-sort-numeric-asc";
                 config.iconNumericSortDesc=config.iconNumericSortDesc||"fa-sort-numeric-desc";
                 
             })(this.config);
              
             
              
             (function(options){
                 
                 options.nameid=options.nameid||undefined;
                 options.fileds=options.fields||undefined;
              
                 options.data=options.data||undefined;
                 options.container=options.container||undefined;
                 options.containerComponent=options.ContainerComponent||undefined;
                 options.nameTemplate=options.nameTemplate||undefined;
                 options.pathTemplate=options.pathTemplate||undefined;
                 options.fetchRemote=options.fetchRemote||undefined;
                 options.callbackObserver=options.callbackObserver||undefined;
                 
             })(options);
             this.separator=";";
             //this.options={};
             objectExtend(options,this.options);
             
             this.toFixed=2;
            
             this.arraydata=this.options.data;
             this.arrayContent=undefined;
             this.focusFake=false;
              
             this.render();
             this.initEvent();
       };
       ns.UXTable.prototype.render=function(){
          renderTable.apply(this,[]);   
       };
       ns.UXTable.prototype.initEvent=function(){
           var self=this;
             var table=document.getElementById(self.options.nameid);
             //console.dir(table);
             Mousetrap(table).bind("enter",function(e){
                var pos;
                     
                var curelement=document.activeElement;
                
                    var objeto=$(curelement).parent();
                   
                    findNextElement.apply(self,[objeto[0],1]);
                    
                curelement=null;
    
             });
             Mousetrap.bind("right",function(e){
                var pos;
                     
                var curelement=document.activeElement;
                if (curelement.value){
                  if (curelement.value.length>doGetCaretPosition(curelement)){
                    pos=doGetCaretPosition(curelement)+1;
                  }
                }
                
                if (pos===undefined){
                  
                    var objeto=$(curelement).parent();
                   
                    findNextElement.apply(self,[objeto[0],1]);
                    
                }
                curelement=null;
             });
             Mousetrap.bind("left",function(e){
                 var pos;
             
                var curelement=document.activeElement;
                //console.log(curelement.value);
                if (doGetCaretPosition(curelement)>0){
                     pos=doGetCaretPosition(curelement)-1; 
                }
                //console.log(pos);
                if (pos===undefined){
                    //var objeto=$("#"+self.options.nameid).find(".current-element").parent().prev();
                    
                    //console.dir(objeto);
                    //var objeto=$("#"+self.options.nameid).find(".current-element").parent();
                    var objeto=$(curelement).parent();
                    findNextElement.apply(self,[objeto[0],-1]); 
                    
                }
                curelement=null;
             });
             Mousetrap.bind("down",function(){
                 //console.log("abajo");
                 var curelement=document.activeElement;
                 var nameField=$(curelement).parent().data();
                 
                 var objeto=$("#"+self.options.nameid).find(".current-element").parent().parent().next().find("td").filter(function(){
                     return $(this).data("name")==nameField.name;
                 });
                 if (objeto.length>0){
                    setNewRow.apply(self,[objeto.parent()[0]]);
                    setCellEdit(self,objeto[0],objeto.data());
                 }
                 
                 //console.dir(objeto);
                 curelement=null;
                 objeto=null;
             });
             Mousetrap.bind("up",function(){
                 //console.log("arriba");
                 var curelement=document.activeElement;
                 var nameField=$(curelement).parent().data();
                 
                 var objeto=$("#"+self.options.nameid).find(".current-element").parent().parent().prev().find("td").filter(function(){
                     return $(this).data("name")==nameField.name;
                 });
                 if (objeto.length>0){
                    //setNewRow(objeto.parent()[0]);
                    checkNewRow.apply(self,[objeto[0]]);
                    setCellEdit(self,objeto[0],objeto.data());
                 }
                 curelement=null;
                 objeto=null;
             });
             Mousetrap.bind("del",function(){
                //console.log("pulsar la tecla supr o del");
                var txt;
                var curelement=document.activeElement;
                if (!isNewRow($(curelement).parent().parent())){
                    var r=window.confirm("Esta seguro de eliminar esta fila?");
                    if (r===true){
                    txt="pulse ok";
                        removeRow.apply(self,[curelement]);
                    
                    }else{
                    txt="pulse cancel";
                    
                    }
                }
                console.log(txt);
             });
             
             //var elementos=document.querySelectorAll(".cell");
             //console.log(elementos);
             var tabla=document.getElementById(self.options.nameid);
             //console.dir(tabla);
             $(tabla).on("mouseover",function(e){
                if ($(this).hasClass("cell")){
                    $(this).addClass("celda");
                }
             });
             /*
             tabla.addEventListener("mouseover",function(e){
                //e.target.classList.contains("cell")
                if (e.target && $(e.target).hasClass("cell")){
                    //e.target.classList.add("celda");
                    $(e.target).addClass("celda");
                }
             });
             */
             $(tabla).on("mouseout",function(e){
                 if ($(this).hasClass("cell")){
                     $(this).removeClass("celda");
                 }
             });
             /*
             tabla.addEventListener("mouseout",function(e){
                //e.target.classList.contains("cell")
                if (e.target && $(e.target).hasClass("cell")){
                    //e.target.classList.remove("celda");
                    $(e.target).removeClass("celda");
                }
             });
             */
             $(tabla).dblclick(function(e){
                console.log("estoy en dblclick");
                if ($(e.target).hasClass("cell")){
                    var nameField=$(e.target).data();
                     setCellEdit(self,e.target,nameField);
                }
             });
            /*
            $(tabla).on("dblclick",function(e){
             
            });
            */
            /*
             tabla.addEventListener("dblclick",function(e){
                 console.log("estoy en dblclick");
                 //e.target.classList.contains("cell")
                 if (e.target && $(e.target).hasClass("cell")){               
                      //var nameField=e.target.dataset;
                      var nameField=$(e.target).data();
                      setCellEdit(self,e.target,nameField);
                 }
             });
             */            
       };
    
       var findNextElement=function(elemento,av){
         var self=this;
         var objeto=$(elemento);
         var check;
         do{
           if (av>0){
              objeto=objeto.next();
           }else{
               objeto=objeto.prev();
           }       
           check=false;
           if (objeto.data() && self.metadata[objeto.data().name])
             check=("computed" in self.metadata[objeto.data().name] || "readonly" in self.metadata[objeto.data().name]);
         } while(check===true);
         if (objeto.length>0){
            var mytimer=setTimeout(function() {
             setCellEdit(self,objeto[0],objeto.data()); 
             clearTimeout(mytimer);  
             objeto=null; 
            }, 0);
         }else{
             //console.dir($(elemento));
             var current=$(elemento).parent().parent().find(".current-element");
             //console.dir(current);
             if (av>0 && !isNewRow($(elemento).parent())){
                 console.log("estoy en pasar al siguiente");
                 findNextRow.apply(self,[$(elemento).parent()[0],1]);
             }
             if (av>0 && isNewRow($(elemento).parent())){
                  console.log("aqui podemos anadir");
                  addRowContent.apply(self,[current[0]]);      
             }
         }     
       };
       var findNextRow=function(elemento,av){
           var self=this;
           var objeto=$(elemento);
           var check;
           var j=0;
           do{
               j=j+5;
               if (av>0){
                   objeto=objeto.next();
               }else{
                   objeto=objeto.prev();
               }
               check=false;
               if (!objeto.hasClass("dato")){
                   check=true;
               }
               if (j===5){
                  check=false;
               }
           }while(check===true);
             //console.dir(objeto);
             if (objeto.length>0){
               setNewRow.apply(self,[objeto[0]]);  
               var cell=findFirstCell.apply(self,[objeto[0]]);
               //console.dir(cell);
               setCellEdit(self,cell[0],cell.data());
               
             }
             self=null;
       };
       var findFirstCell=function(fila){
          //var self=this;
          var objeto=$(fila).find(".cell").first();
          return objeto;
       };
       var removeRow=function(elem){
          var self=this;
          var objeto=$(elem);
          console.dir(elem);
          //var num=$("#"+self.options.nameid).find("tr.cabezera").first().nextUntil(objeto.parent().parent(),"tr.dato").length; 
          var num=getNumRow.apply(self,[objeto.parent().parent()[0]]);
          console.log(num);
          console.dir(self.arraydata[num]);
          var key=self.arraydata[num].key;
          self.arraydata.splice(num,1);
          console.dir(self.arraydata);
          self.arrayContent[key].Traking=ns.enumTraking.delet;
          console.dir(self.arrayContent[key]);
             renderPartial.self(self,[]);
             
          self=null;   
       };
       var renderTable=function(){
           var self=this;
            createTableStyle.apply(self,[]);
           createTable.apply(self,[]);
           createCaptions.apply(self,[]);
          
           createOriginalRows.apply(self,[]);
           createFooterInputs.apply(self,[]);
           createFooter.apply(self,[]);
           self=null;
       };
       var renderPartial=function(){
          var self=this;
          $("#"+self.options.nameid).find("."+self.config.classRow).remove();
          $("#"+self.options.nameid).find("tfoot").remove();
          $("#"+self.options.nameid).find("."+self.config.classFooter).remove();
          createRows.apply(self,[]);
          createFooterInputs.apply(self,[]);
          createFooter.apply(self,[]);
          self=this;
       };
       var createTable=function(){
           var self=this;
           console.log("container table principal:"+self.options.container);
           $("<table />",{"id":self.options.nameid,"class":self.config.containerComponent})
           .appendTo($(self.options.container));
           
           //self=null;
       };
       var createTableStyle=function(){
           var self=this;
           var style="";
           var i;
           //console.dir(self.metadata);
    
           self.options.fields.forEach(function(element,index){
              style+="#"+self.options.nameid+"."+self.config.containerComponent+" .cell:nth-of-type("+(index+1)+"):before{content:'"+element.caption+"';}";
    
              //console.dir(element); 
           });
           
           style+="@media screen and (min-width:768px){";
           self.options.fields.forEach(function(element,index){
                 style+="#"+self.options.nameid+"."+self.config.containerComponent+" .cell:nth-of-type("+(index+1)+"):before{content:'';}";
           });
           style+="}";
    
           console.log(style);       
           
           $("head").append("<style>"+style+"</style>");
       };
       var createCaptions=function(){
           var self=this;
           self.metadata={};
           var thead=$("<thead />");
           var newTr=$("<tr />",{"class":self.config.classHeader});
           
           self.options.fields.forEach(function(element,index){
               var classSortAsc;
               var classSortDesc;
               if (element.sort){
                     
                     switch(element.type){
                        case "string":
                            classSortAsc=self.config.iconStringSortAsc;
                            classSortDesc=self.config.iconStringSortDesc;   
                        break;
                        case "decimal":
                            classSortAsc=self.config.iconNumericSortAsc;
                            classSortDesc=self.config.iconNumericSortDesc;
                        break;
                        case "mask":
                            switch(element.subtype){
                                case "decimal":
                                  classSortAsc=self.config.iconNumericSortAsc;
                                  classSortDesc=self.config.iconNumericSortDesc;
                                break;
                                case "string":
                                  classSortAsc=self.config.iconStringSortAsc;
                                  classSortDesc=self.config.iconStringSortDesc;   
                                break;
    
                            }
                        break;
                     }
                     
                  $("<th class='btn-cursor columna' width='"+element.width+"' ><a class='ripple ' href='#' ><span class='truncate'>"+element.caption+"</span> <span class='fa "+classSortAsc+"'></span></a></th>")
                  .on("click",function(){
                      
                   
                      if ($(this).find(".fa").hasClass(classSortAsc)){
                         $(this).find(".fa").removeClass(classSortAsc);
                         $(this).find(".fa").addClass(classSortDesc);
                         if (element.sort===true){
                            self.arraydata.sort(ns.sort_by(element.name,true));
                         }else{
                           self.arraydata.sort(ns.sort_by(element.name,true,element.sort));
                         }
                         
                      }else{
                         $(this).find(".fa").removeClass(classSortDesc);
                         $(this).find(".fa").addClass(classSortAsc);
                         if (element.sort===true){
                              self.arraydata.sort(ns.sort_by(element.name,false));
                         }else{
                              self.arraydata.sort(ns.sort_by(element.name,false,element.sort));
                         }
                      }
                      //console.dir(self.arraydata);
                      renderPartial.apply(self,[]);
    
                  }).appendTo(newTr);
               }else{
                  var classtxt="no-select columna";
                  if ("readonly" in element){
                      classtxt+=" cell-background-2 disabled";
                  }
                  $("<th />",{"text":element.caption,"width":element.width,"class":classtxt})
                  .appendTo(newTr);
               }
               
               configOptions.apply(self,[element]);
    
           });
           //$(newTr).appendTo(thead);
           $("#"+self.options.nameid).append(newTr);
           newTr=null;
           thead=null;
           //self=null;
       };
       var createOriginalRows=function(){
           var self=this;
           //if (self.arraycontent)
           //    self.arrayContent=null;
           
           self.arrayContent=[]; 
           self.arraydata.forEach(function(dato,i){
               
               var newTr;
               newTr=$("<tr />",{"class":self.config.classRow});
               
               if (!self.arrayContent[i]) 
                 self.arrayContent.push({});
               
               self.arraydata[i].key=i;
               
               self.options.fields.forEach(function(element,index){
                      var valor;
                      var content={};
                      var options=self.metadata[element.name]||{};
                      
                      options.valor=dato[element.name];
                      valor=dato[element.name];
                      if ("computed" in element){   
                          //options.computed=element.computed;
                          // valor=options.formatText(element.computed(dato));
                          
                          //hay que meter el valor computado en el array;
                          valor=element.computed(dato);
                          self.arraydata[i][element.name]=valor;
                          
                      }
                      
                     content.originalValue=element.computed ? element.computed(dato) : dato[element.name];
                     content.value=element.computed ? element.computed(dato) : dato[element.name];
                     content.isValid=true;
                     switch(element.type){
                     
                      case "integerstring":
                        
                        valor=options.formatText(valor,options.length);
                      break;
                      default:
                         valor=options.formatText(valor);
                      break;
                     
                     }
                     
                     content.text=valor;
                     self.arrayContent[i].Traking=ns.enumTraking.read;
                     self.arrayContent[i][element.name]=content;      
                     //console.dir(content);
                     
                     var classtxt="animate-2 cell truncate";
                     if ("readonly" in element){
                         classtxt=classtxt+" cell-background-1 disabled no-select";
                     }
                     if ("computed" in element){
                        classtxt=classtxt+" disabled no-select cell-background";
                     } 
                      switch(element.align){
                         case "left":
                         classtxt+=classtxt+" cell-align-left";
                         break;
                         case "right":
                         classtxt+=classtxt+" cell-align-right";
                         break;
                         case "center":
                         classtxt+=classtxt+" cell-align-center";
                         break;
                     }
    
                   //$("<td  />",{"text":valor,"align":element.align,"class":classtxt,"data-name":element.name})
                   $("<td  />",{"text":valor,"class":classtxt,"data-name":element.name})
                   .appendTo(newTr);
                   options=null;
                   content=null;
               });
               
               $("#"+self.options.nameid).append(newTr);
               newTr=null;
           });
           //console.dir(self.arrayContent);
           
         
           //self=null;
           //self.arraydata=null;
       };
       var createRows=function(){
           var self=this;
           //if (self.arraycontent)
           //    self.arrayContent=null;
           
           //self.arrayContent=[]; 
           self.arraydata.forEach(function(dato,i){
               
               var newTr;
               newTr=$("<tr />",{"class":self.config.classRow});
               
               //if (!self.arrayContent[i]) 
               //  self.arrayContent.push({});
               
               //self.arraydata[i]["key"]=i;
               
               self.options.fields.forEach(function(element,index){
                      var valor;
                      var content={};
                      var options=self.metadata[element.name]||{};
                      
                      options.valor=dato[element.name];
                      valor=dato[element.name];
                      if ("computed" in element){   
                          //options.computed=element.computed;
                          // valor=options.formatText(element.computed(dato));
                          //hay que meter el valor computado en el array;
                          valor=element.computed(dato);
                          self.arraydata[i][element.name]=valor;   
                      }
                      
                       //content.originalValue=element.computed ? element.computed(dato) : dato[element.name];
                       //content.value=element.computed ? element.computed(dato) : dato[element.name];
                       //content.isValid=true;
                       //console.log(element.name);
                       //console.log(valor);
                       if (valor){
                            switch(element.type){
                                
                                case "integerstring":
                                
                                valor=options.formatText(valor,options.length);
                                break;
                                default:
                                valor=options.formatText(valor);
                                break;
                            }
                       }
                     //content.text=valor;
                     //self.arrayContent[i][element.name]=content;      
                     //console.dir(content);
                     var classtxt="animate-2 cell truncate";
                     if ("readonly" in element){
                         classtxt=classtxt+" cell-background-1 disabled no-select";
                     }
                     if ("computed" in element){
                        classtxt=classtxt+" disabled no-select cell-background";
                     }
                     switch(element.align){
                         case "left":
                         classtxt+=classtxt+" cell-align-left";
                         break;
                         case "right":
                         classtxt+=classtxt+" cell-align-right";
                         break;
                         case "center":
                         classtxt+=classtxt+" cell-align-center";
                         break;
                     } 
                   //$("<td  />",{"text":valor,"align":element.align,"class":classtxt,"data-name":element.name})
                   $("<td  />",{"text":valor,"class":classtxt,"data-name":element.name})
                   .appendTo(newTr);
                   options=null;
                   content=null;
               });
               
               $("#"+self.options.nameid).append(newTr);
               newTr=null;
           });
           //console.dir(self.arrayContent);
           
         
           //self=null;
           //self.arraydata=null;
       };
       function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
       }
       var formatTextDefault=function(valor){
           return valor;
       };
       var formatTextDecimal=function(valor){
           return formatNumber2dEu(valor); 
       };
       var formatTextDecimalString=function(valor){
           return formatNumber2dEu(valor);
       };
       var formatTextIntegerString=function(valor,length){
           return ns.padLeft(Number(valor),length);
       };
       var formatTextMask=function(valor){
           var value;
           if (ns.isNumber(valor)){
             value=formatNumber2dEu(valor);              
           }else{
               value=valor;
           }
           return value;
       };
       var configOptions=function(element){
        var self=this;   
        var options={};
        //console.dir(element);
        if (!element.type)
         options.type="string";
                     
        if (!element.align)
         options.align="left";
                      
                      //options.valor=dato[element.name];
                      
        if ("required" in element){
         options.required=element.required;
        }
        if ("computed" in element){   
          options.computed=element.computed;
        }  
        if ("readonly" in element){
            console.log("estoy en readonly");
          options.readonly=element.readonly;
        }                   
        if ("alias" in element){
         options.alias=element.alias;
        }
        if ("regex" in element){
         options.regex=element.regex;
        }
        if ("subtype" in element){
         options.subtype=element.subtype;
        }
        if ("mask" in element){
         options.mask=element.mask;
        }
        if ("toFixed" in element){
         options.toFixed=element.toFixed;
        }
        if ("min" in element){
         options.min=element.min;
        }
        if ("max" in element){
         options.max=element.max;
        }  
        if ("length" in element){
         options.length=element.length;
        }
        options.align=element.align;              
        options.type=element.type;
        options.inputControl=inputstring;
        options.formatText=formatTextDefault;              
                      
        switch(element.type){
          case "string":
                         
            options.inputType="text";
            options.idInput="txtdescripcion";
            options.classElement="input-ctrl mousetrap";
            options.inputControl=inputstring;
            options.format=formatdefault;
            options.validate=validateStringValue;
            options.formatText=formatTextDefault;
    
            break;
          case "decimal":
            //formato   
            ///if (ns.isNumber(dato[element.name])){
                        
            //  options.valor=formatNumber2dEu(dato[element.name]);   
                      
           // }
             options.inputType="number";
             options.idInput="txtnumeric";
             options.classElement="input-ctrl hide-inputbtns mousetrap";
             options.inputControl=inputdecimal;
             options.format=formatdecimal;
             options.validate=validateDecimalValue;
             options.formatText=formatTextDecimal;
             break;
          case "decimalstring":
             //formato
             //options.valor=formatNumber2dEu(dato[element.name]); 
                         
             options.inputType="text";
             options.idInput="txtnumeric";
             options.classElement="input-ctrl mousetrap";
             options.inputControl=inputdecimalstring;
             options.format=formatdecimalstring;
             options.validate=validateDecimalValue;
             options.formatText=formatTextDecimalString;
             break;
          case "integer":
                      
             options.inputType="text";
             options.idInput="txtnumeric";
             
             
             break;
          case "integerstring":
                        
             //options.valor= dato[element.name];
             //formato
             //options.valor=ns.padLeft(Number(dato[element.name]),options.length);
                        
             options.inputType="text";
             options.idInput="txtnumeric";
             options.classElement="input-ctrl mousetrap";
             options.inputControl=inputIntegerString;
             options.format=formatintegerstring;
             options.validate=validateIntegerStringValue;
             options.formatText=formatTextIntegerString;
             break;
          case "datetime":
                       
             break;
          case "mask":
             //formato
             //if (ns.isNumber(dato[element.name])){
                        
             // options.valor=formatNumber2dEu(dato[element.name]);   
                      
             // }
            switch(options.subtype){
             case "time":
               options.mask="hh:mm";
               break;
             }
             options.inputType="text";
             options.idInput="txtmask";
             options.classElement="input-ctrl mousetrap";
             options.inputControl=inputmask;
             options.format=formatmask;
             options.validate=validateMaskValue;
             options.formatText=formatTextMask;
             break;
           case "datestring":
                     
             options.inputType="text";
             options.idInput="txtdate";
             options.classElement="input-ctrl mousetrap";
             options.inputControl=inputdatestring; 
             options.format=formatdefault;
             options.validate=validateDateValue;
             options.formatText=formatTextDefault;
    
             break;
           case "dateshim":
                       
             options.inputType="date";
             options.idInput="txtdate";
                       
             options.inputControl=inputdateshim;
                    
             break;
            }
                     
            self.metadata[element.name]=options;
            options=null;
    
       };
       var checkNewRow=function(that){
           //var objeto=$(that);
          
           var objeto=$(that).parent().parent().find(".current-element");
           //console.dir(objeto);
           var elem=objeto.parent().parent();
           //console.dir(that);
           if (isNewRow(elem)){
              if (isAnyInput(elem)){
                  if (isAnyInputValue(elem)){
    
                  }else{
                      //console.log("no hay valores");
                      removeNewRow(elem);
                  }
              }    
           }
       };
       var setNewRow=function(that){
           var self=this;
           //var objeto=$(that);
           //console.dir(objeto);
           //console.log(isNewRow(that));
           //console.log(isAnyInput(objeto[0]));
           if (isNewRow(that)){
              if (isAnyInput(that)){
                  //console.log("hay nuevos inputs");
                  if (isAnyInputValue(that)){
                      //console.log("hay valores");
                      
                  }
              }else{
                  //creamos el row con los inputs en esta fila
                  //console.log("hay que crear nuevos inputs");
                  createNewRow.apply(self,[]);
              }          
           }
           //objeto=null;
       };
       var isNewRow=function(that){
           //console.log($(that).hasClass("new-row"));
           return $(that).hasClass("new-row") ? true : false;
       };
       var isAnyInput=function(that){
          //var objeto=$(that);
          //console.dir($(that).find("input.input-ctrl-new"));
          return $(that).find("input.input-ctrl-new").length>0 ? true :false;
       };
       var isAnyInputValue=function(that){
           var objeto=$(that);
           var elem;
           elem=objeto.find("input.input-ctrl-new").filter(function(){
               return $(this).val() ? true: false;
           });
           //console.dir(elem);
           return elem.length>0 ? true : false ;
       };
       var addRowContent=function(current){
            var self=this;
            //var num=$("#"+self.options.nameid).find("tr.cabezera").first().nextUntil($(current).parent(),"tr.dato").length;
            var num=getNumRow.apply(self,[$(current).parent()[0]]);
            //console.log(num);
            var newrow=$(current).parent().parent();
            //console.dir(newrow);
            var newcells=newrow.find(".cell");
            //console.dir(newcells);
            var isValid=checkIsValid.apply(self,[newcells]);
            //console.log(isValid);
            if (isValid){
               
               addNewContent.apply(self,[newcells,num-1]);
               renderPartial.apply(self,[]);
    
               var objeto=findFirstNewInput.apply(self,[]);
               setCellEdit(self,objeto[0],objeto.data()); 
    
            }
       };
       var addNewContent=function(cells,numRow){
           var self=this;
           self.arrayContent.push({});
           self.arraydata.push({});
           var num=self.arrayContent.length-1;
           self.arraydata[numRow].key=num;
           //console.dir(self.arrayContent);
           $.each(cells,function(index,elem){
              var nameField=$(elem).data();
              var objeto=$(elem).find(".input-ctrl-new");
              //console.log(numRow);
              
              var content=setContent.apply(self,[objeto,nameField,num]);
              self.arraydata[numRow][nameField.name]=content.value;
              //console.log(nameField.name);
              //console.log( self.arraydata[numRow][nameField.name]);
              self.arrayContent[num][nameField.name]=content;
              //quitar o desactivar el focus una vez anadida esta fila
              
              
           });
           self.arrayContent[num].Traking=ns.enumTraking.insert;
    
           //console.dir(self.arraydata[numRow]);
           console.dir(self.arrayContent[numRow]);
           
       };
       var setContent=function(elem,nameField,numRow){
          var self=this;
          var valor=elem.val();
          var options=self.metadata[nameField.name];
          var content=options.validate(valor);
          content.name=nameField.name;
          content.row=numRow;
          content.originalValue=content.value; 
          
          return content;
       };
       var checkIsValid=function(cells){
          var self=this;
          var isValid=true;
          $.each(cells,function(index,elem){
              //console.dir($(elem));
              var nameField=$(elem).data();
              var objeto=$(elem).find(".input-ctrl-new");
              
              var options=self.metadata[nameField.name];
              var content=options.validate(objeto.val());
              //console.log(nameField.name);
              //console.log(objeto.val());
              //console.dir(content);
              if (content.isValid===false){
                    isValid=false;
                    return false;
              }
          });
          return isValid;
       };
       var createNewRow=function(){
           var self=this;
           var fila=$("#"+self.options.nameid).find(".dato").last(); //encontrar la ultima fila;
           var num=$("#"+self.options.nameid).find(".dato").length;
           fila.addClass("active");
           $.each(fila.find(".cell"),function(index,elem){
            //var nameField=elem.dataset;
            var nameField=$(elem).data();
            var options=self.metadata[nameField.name];
            if (!("computed" in options)){
                var idinput=nameField.name+num;
                options.inputControl(elem,idinput);
                setNewCtrlInput(elem);  //establecer clase input-ctrl-new
                $(elem).find("input").on("click",function(e){
                       console.log("estoy en foco fuera input new"); 
                   //if (!self.focusFake){  //esta condicion es para evitar que se meta doblemente el foco con las teclas
                                          //el seteditcell hay en una de las condificones self.focusFake.
                     console.log("estoy en foco input new"); 
                     cajamouselivecurrent.apply(self,[elem]);
                     //console.log(self.options.nameid);
                     removeCurrentElement.apply(self,[]);
                     setCurrentElement(elem);
                     $(this).parent().addClass("current-cell-bg");
                     $(this).addClass("current-cell-bg");
                     //console.dir(e);
                     //e.cancelBubble=true;
                   //}else{
                   //    self.focusFake=false;
                       //console.log("estoy dentro de focusfake=false");
                   //} 
                });
            }
             options=null;
             nameField=null;
           });
           //self=null;
           fila=null;
          // options=null;
         
       };
       var removeNewRow=function(that){
         var objeto=$(that).find(".cell");
         //console.dir(objeto);
         objeto.parent().removeClass("active");
         $.each(objeto,function(index,elem){
             $(elem).removeClass("current-cell-bg");
             $(elem).find("span").remove();  //borramos los posibles mensajes de errores
             $(elem).find("input").off("click");
             $(elem).find("input").remove();
             //console.dir($(elem).find(":before"));
             //console.dir($(elem).find("cell:before"));
             //$(elem).find(".cell:before").remove();
         
         });
         
         objeto=null;
       };
       var findFirstNewInput=function(){
           var self=this;
           var fila=$("#"+self.options.nameid).find(".dato").last(); //encontrar la ultima fila;
           var num=$("#"+self.options.nameid).find(".dato").length;
           var objeto=fila.find(".cell").first();
           //console.dir(objeto);
           return objeto;
           
       };
       var setCellEdit=function(self,that,nameField){
              //console.dir(self);
              cajamouselivecurrent.apply(self,[that]);
              //console.dir(self.metadata[nameField.name]);        
              if (!("computed" in self.metadata[nameField.name]) && !("readonly" in  self.metadata[nameField.name])){
                 $(that).removeClass("celda");  
                 removeCurrentElement.apply(self,[]);        
                 //var width=$(that).width();
                 //console.log(self.options.nameid); 
                 //var num=$("#"+self.options.nameid).find("tr.cabezera").first().nextUntil($(that).parent(),"tr.dato").length;
                 var num=getNumRow.apply(self,[$(that).parent()[0]]);
                 //console.dir(num); 
                 var idinput=nameField.name+num;
                 var objeto=$(that).find("input");
                 //console.dir(self.metadata[nameField.name]);
                 if (objeto && !isNewInputCtrl(objeto[0])){
                      self.metadata[nameField.name].inputControl(that,idinput);
                      $(that).addClass("current-cell-bg"); 
                          
                 }
                  
                  
                 setCurrentElement(that);  
                           
                 
                 //$(that).width(width);
                 
                 //hacemos esto para evitar un buble infinito
                 setAlignLeft(that);
                 if (objeto && !isNewInputCtrl(objeto[0])){
                      //setFocus(that);
                      
                      //setAlignLeft(that);
    
                      var row=self.arraydata[num].key;
                      //console.log(row); 
                      var content=self.arrayContent[row][nameField.name];
                      //console.dir(content);
                      
                      var warning=setCellValid("warning",content);
                      $(that).addClass("current-cell-bg"); 
                      if (warning){
                         
                         $(that).append(warning);
                      }else{
                         //$(that).removeClass("current-cell-bg"); 
                         $(that).find("span").remove();
                      }
                      
                       
                 }else{
                     // $(that).removeClass("cell");
                      $(that).addClass("current-cell-bg");
                      $(objeto).addClass("current-cell-bg");
                      
                      self.focusFake=true;
                      //$(that).find("input").focus();   
                 }
                 setFocus(that);
              }  
       };
       var setFocus=function(that){
          var objeto=$(that).find("input"); 
          objeto.focus(function(){
          var self=this;
           var timer=setTimeout(function() {
             //console.log(self.value.length);
             setCaretPosition(self,self.value.length); 
             $(self).select();
           
           },5);
                    
          });
          objeto.focus();
          //if (objeto && !isNewInputCtrl(objeto[0])){
            objeto.off("focus");
          //}
          objeto=null;  
       };
       var setCurrentElement=function(that){
           //console.log("estoy dentro de current eleemnt");
           if ($(that).find("input").hasClass("current-element")){
               console.log("!!! ya hay un current element!!!");
           }else{
               
               $(that).find("input").addClass("current-element");
               
           }
       };
       var setAlignLeft=function(that){
           //console.log("estoy en align left");
           $(that).removeAttr("align");
           $(that).attr("alig","left");
       };
       var setAlignDefault=function(that,options){
           //console.dir(options);
           $(that).removeAttr("align");
           $(that).attr("align",options.align);
       };
       
       var removeCurrentElement=function(){
           var self=this;
           //console.log(self.options.nameid);
           //console.dir($("#"+self.options.nameid).find(".current-element"));
           if ($("#"+self.options.nameid).find(".current-element").hasClass("current-element"))
              $("#"+self.options.nameid).find(".current-element").removeClass("current-element");
           //self=null;
       };
       var setNewCtrlInput=function(that){
           if (!$(that).find("input").hasClass("input-ctrl-new"))
               $(that).find("input").addClass("input-ctrl-new");
           
       };
    
       var createFooter=function(){
           var self=this;
    
           var tfoot=$("<tfoot />");
    
           var newTr=$("<tr />",{"class":self.config.classFooter});
    
           $("<th />",{"colspan":(self.options.fields.length-1)})
           .appendTo(newTr);
           $("<th />").appendTo(newTr);
           
           $(newTr).appendTo(tfoot);
           
           $("#"+self.options.nameid).append(tfoot);
           
           newTr=null;
           //self=null;
       };
       var createFooterInputs=function(){
           var self=this;
    
           var newTr=$("<tr />",{"class":self.config.classRow+" new-row"});
    
           self.options.fields.forEach(function(element,index){
             //var options=self.metadata[element.name];  
             var celda= $("<td />",{"align":element.align,"class":"animate-2 cell","data-name":element.name});
             celda.appendTo(newTr);
             celda=null; 
           }); 
           $("#"+self.options.nameid).append(newTr);
           createNewRow.apply(self,[]);
    
           newTr=null; 
       };
      
       var objectExtend=function(base,extension){
           for (var property in base){
                extension[property]=base[property];
           }
       };
       function formatNumber(num){
           return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
       }
       function formatNumber2d(num){
           return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
       }
       function formatNumber2dEu (num) {
        return Number(num)
           .toFixed(2) // always two decimal digits
           .replace(".", ",") // replace decimal point character with ,
           .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");  // use . as a separator
       }
       function formatDateEs(str){
          var date=new Date(str);
          //console.log(date);
          if (!isNaN(date.getTime())) {
            // Months use 0 index.
            var d = date.getDate().toString();
            var m=(date.getMonth()+1).toString();
    
            return  (d[1]?d:"0"+d[0]) + '/' + (m[1]?m:"0"+m[0]) + '/' + date.getFullYear();
          }
       }
       //para utilizarlo en el evento onkeypress
       //onkeypress="return isNumberKey(event)"
       //este permite numeros decimales
       ns.isNumberKey=function(evt) {
        if (evt){
          //console.dir(evt);  
          var charCode = (evt.which) ? evt.which : undefined;
          //console.log(charCode);
          if (charCode==45)
              return true;
          if (charCode != 46 && charCode > 31&& (charCode < 48 || charCode > 57))
            return false;
    
          if (charCode===undefined){
              if (evt.keyCode===37 || evt.keyCode===39)
                return true;
              
              return false; 
          }
              
          return true;
        }
        return false;
    };
    //este solo permite numeros enteros
    ns.isIntegerKey= function(evt) {
        if (evt){
         var charCode = (evt.which) ? evt.which : undefined;
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
    
         if (charCode===undefined){
             if (evt.keyCode===37 || evt.keyCode===39)
                return true;
              
             return false; 
         }    
         
         return true;
        }
        return false;
    };
    ns.isEmailKey=function(evt){
        if (evt){
         //console.log(evt.which);   
         var charCode = (evt.which) ? evt.which : undefined;
         if (charCode==37 || charCode==39){
               console.log("estoy dentro");
               return false;  
         }
          
    
         return true;
        }
        return false;
    };
    ns.isDateNumberKey=function(evt){
         if (evt){
          //console.log(evt.target.value);  
          var charCode = (evt.which) ? evt.which : undefined;
          //console.log(charCode);
          if (charCode != 47 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
          if (charCode===undefined){
              if (evt.keyCode===37 || evt.keyCode===39)
                return true;
              
              return false; 
          }
         
          return true;
        }
        return false;
    };
    
    //permite fechas formato mm/dd/yyyy formato ingles
    //para utilizarlo en onkeyup
    ns.isdatekeyeng=function(evt){
        var v = this.value;
        if (v.match(/^\d{2}$/) !== null) {
            this.value = v + '/';
        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
            this.value = v + '/';
        }
    };
    //permite fechas en formato yyyy/mm/dd
    //para utilizarlo en onkeyup
    ns.isdatekeyusa=function(evt){
        var v = this.value;
        if (v.match(/^\d{4}$/) !== null) {
            this.value = v + '/';
        } else if (v.match(/^\d{4}\/\d{2}$/) !== null) {
            this.value = v + '/';
        }    
    };
    //permite fechas en formato dd/mm/yyyy
    //para utilizarlo en onkeyup
    ns.isdatekeyeu=function(){
        var v = this.value;
       // console.log(v);
        if (v.match(/^\d{2}$/) !== null) {
            this.value = v + '/';
        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
            this.value = v + '/';
        }
    };
    ns.isValidDate=function(str){
        var datareg=/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        return str.match(datareg);
    };
    ns.mmIsDate=function(str) {
        var ano=0;
        var mes=1;
        var dia=2;
        if (str === undefined) { return false; }
    
        var parms = str.split(/[\.\-\/]/);
    
        var yyyy = parseInt(parms[ano], 10);
    
        if (yyyy < 1900) { return false; }
    
        var mm = parseInt(parms[mes], 10);
        if (mm < 1 || mm > 12) { return false; }
    
        var dd = parseInt(parms[dia], 10);
        if (dd < 1 || dd > 31) { return false; }
    
        var dateCheck = new Date(yyyy, mm - 1, dd);
        return (dateCheck.getDate() === dd && (dateCheck.getMonth() === mm - 1) && dateCheck.getFullYear() === yyyy);
    
    };
    ns.isValidEmail=function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    ////examples
    //console.log(padLeft(23,5));       //=> '00023'
    //console.log((23).padLeft(5));     //=> '00023'
    //console.log((23).padLeft(5,' ')); //=> '   23'
    ns.padLeft=function(nr, n, str){
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    };
    //se puede utilizar numeros negativos
    //console.log((-23).padLeft(5));     //=> '-00023'
    Number.prototype.padLeft = function (n,str) {
        return (this < 0 ? '-' : '') + 
                Array(n-String(Math.abs(this)).length+1)
                 .join(str||'0') + 
               (Math.abs(this));
    };
    
    var emptyString=function(valor){
        if (valor==="" || valor===undefined || valor==-null){
           return true;
        }else{
           return false;
        }
    };
    ns.isNumber=function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    var formatdecimalstring=function(valor){
        var value;
        if (ns.isNumber(Number(valor.replace(",","."))) && !emptyString(valor)){
            value=formatNumber2d(Number(valor.replace(",",".")));
        }else{
            value=valor.replace(",",".");
        }
        return value;
    };
    var inputdecimalstring=function(that,idInput){
        var value;
        value=this.format($(that).text().trim());
        //formato
        //
        var objeto=$("<input  />",
         {"id":idInput,
          "value":value, //formatNumber2d(Number($(self).text().trim().replace(",","."))),
          "type":this.inputType,
          "onkeypress":"return controls.isNumberKey(event)",
          //"width":($(that).width())+"px",
          "width":"calc(100% - 16px)",
          "class":"input-ctrl mousetrap"});
          $(that).wrapInner(objeto);
          objeto=null;
    };
    var formatdecimal=function(valor){
       var value;
        if (ns.isNumber(Number(valor.replace(",","."))) && !emptyString(valor)){
            value=formatNumber2d(Number(valor.replace(",",".")));
        }else{
            value=valor.replace(",",".");
        }
        return value;
    };
    var inputdecimal=function(that,idInput){
        var value;
        value=this.format($(that).text().trim());
        //formato
        //
        var objeto=$("<input />",
         {"id":idInput,
          "value":value,
          "type":this.inputType,
           //"min":"0",
          "step":"0.01",
          "data-number-to-fixed":"2",
          //"width":($(that).width())+"px",
          "width":"calc(100% - 16px)",
          "class":"input-ctrl hide-inputbtns mousetrap"});
         $(that).htmlPolyfill(objeto);
         objeto=null;
    };
    
    var inputstring=function(that,idInput){
       var value=this.format($(that).text().trim());
    
       var objeto=$("<input />",
         {"id":idInput,
          "value":value,
          "type":this.inputType,
          //"width":($(that).width())+"px",
          "width":"calc(100% - 16px)",
          "class":"input-ctrl mousetrap "});
         $(that).wrapInner(objeto);
         objeto=null;
         value=null;  
    };
    var inputdateshim=function(that,idInput){
      var self=this;
        //console.dir(options);
      var objeto=$("<input  />",
        {"id":idInput,
         "value":$(that).text().trim(),
         "data-date":JSON.stringify({"startView": 2,"openOnMouseFocus": true}),
         "type":this.inputType,
         //"onkeydown":"return false",
         //"width":$(that).width()+"px",
         "width":"100%",
         "class":"input-ctrl hide-spinbtns mousetrap"});
                          
        $(self).htmlPolyfill(objeto);
    };
    var inputdatestring=function(that,idInput){
         var value=this.format($(that).text().trim());
         var objeto=$("<input />",{
          "id":idInput,
          "value":value,
          "class":"input-ctrl mousetrap",
          "type":this.inputType,
          //"width":($(that).width())+"px",
          "width":"100%",
          "onkeypress":"return components.isDateNumberKey(event)",
          "onkeyup":"components.isdatekeyeu.apply(this,[])",
          "maxlength":10
         });
                            
         $(that).wrapInner(objeto);
         objeto=null;
    };
    var formatmask=function(valor){
        var value;
        //console.log(this.subtype);
        switch(this.subtype){
           case "decimal":
             //console.log(valor);  
            if (ns.isNumber(Number(valor.replace(",","."))) && !emptyString(valor)){
             
              value=formatNumber2d(Number(valor.replace(",",".")));
            }else{
              value=valor;
            }
           break;
           case "date":
              value=valor;
           break;
           case "email":
             console.log("Estoy en format email:"+ valor)
              value=valor;
           break;
           case "time":
              value=valor;
              //console.log(value);
           break;
           default:
              value=valor;
           break;
        }
        return value;
    };
    var inputmask=function(that,idInput){
        var self=this;
        var selectorInput;
        //console.log("estoy en input mask");
        console.dir(that)
        var value=self.format($(that).text().trim());
        //console.log(value);
        //formato
        //console.log(value);
    
          var objeto=$("<input />",{
            "id":idInput,
            "value":value,
            "class":"input-ctrl mousetrap",
            "type":self.inputType,
            //"width":($(that).width())+"px"
            "width":"calc(100% - 16px)"
          });
       
        
        $(that).wrapInner(objeto);
         if (!self.alias)
                self.alias=this.subtype;
    
        var mytimer=setTimeout(function() {
          
           switch (self.subtype){
               case "decimal":
                 Inputmask(self.alias,{regex:self.mask})
                 .mask(document.querySelector("#"+idInput));
               break;
               case "date":
                var momentFormat = 'DD/MM/YYYY';
                selectorInput=document.querySelector("#"+idInput);

                var momentMask = IMask(selectorInput, {
                  mask: Date,
                  pattern: momentFormat,
                  lazy: false,
                  min: new Date(1900, 0, 1),
                  max: new Date(9999, 0, 1),
                
                  format: function (date) {
                    return moment(date).format(momentFormat);
                  },
                  parse: function (str) {
                    return moment(str, momentFormat);
                  },
                
                  blocks: {
                    YYYY: {
                      mask: IMask.MaskedRange,
                      from: 1900,
                      to: 9999
                    },
                    MM: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 12
                    },
                    DD: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 31
                    },
                    HH: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 23
                    },
                    mm: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 59
                    }
                  }
                });
               
                 /* 
                 Inputmask({alias:'datetime',inputFormat:'dd/mm/yyyy'})
                 .mask(document.querySelector("#"+idInput));
                 */
               break;
               case "email":
                 console.log("Estou en email:"+ self.alias)
                 console.dir($("#"+idInput))
                 console.dir($)
                 //$("#"+idInput).inputmask({alias:self.alias})
               
                 
                 Inputmask({
                  mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}][_*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
                  greedy: false
                 })
                 .mask(document.querySelector("#"+idInput));
                 
               break;
               case "time":
                //options.alias="hh:mm";
                //console.dir("estoy en time");
                self.mask="hh:mm";
                 Inputmask(self.mask)
                  .mask(document.querySelector("#"+idInput)); 
               break;
           }
               
           clearTimeout(mytimer);
        }, 0);
        objeto=null;   
    };
    var formatintegerstring=function(valor){
        var value;
        if (!emptyString(valor)){
          value=ns.padLeft(Number(valor),this.length); 
        }else{
            value=valor;
        }
        
        return value;
    };
    var inputIntegerString=function(that,idInput){
         var valor=this.format($(that).text().trim());
         
         //formato
         
         //valor=ns.padLeft(Number($(self).text().trim()),options.length); 
         
         //
          var objeto=$("<input  />",
           {"id":idInput,
            "value":valor,
            "type":this.inputType,
            "onkeypress":"return controls.isIntegerKey(event)",
            //"width":($(that).width())+"px",
            "width":"calc(100% - 16px)",
            "class":"input-ctrl mousetrap",
             "maxlength":this.length
           });
           
          $(that).wrapInner(objeto);
          objeto=null;
    };
    var formatdefault=function(valor){
        var value=valor;
        return value;
    };
    function doGetCaretPosition (oField) {
    
      // Initialize
      var iCaretPos = 0;
      
      // IE Support
      if (document.selection) {
        
        // Set focus on the element
        oField.focus();
        
        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();
        
        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);
        
        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }
    
      // Firefox support
      else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;
    
      // Return results
      return iCaretPos;
    }
    
    function setCaretPosition(elem, caretPos) {
        //var elem = document.getElementById(elemId);
        
        if (elem !== null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }
    
    var cajamouselivecurrent=function(that){
        var self=this;
        var options;
        //console.dir(options);
        var content={};
        var objeto=$(that).parent().parent().find(".current-element");
        
        
        //console.dir(objeto);
        var nameField=objeto.parent().data();
        
        //console.dir(nameField);
        if (nameField){
          options=self.metadata[nameField.name];
        }
        
        //console.dir(options);
        if (objeto && objeto.length>0){
                //console.dir(objeto.parent().parent());
                //var num=$("#"+self.options.nameid).find("tr.cabezera").first().nextUntil(objeto.parent().parent(),"tr.dato").length;
                //console.log(num);
                var entrada=objeto;
                //console.dir(entrada);
                var valor=entrada.val();
                //console.log(valor);
                
                
                content=options.validate(valor);
                content.name=nameField.name;
               
               //console.dir(objeto);
               //console.log(valor);
               
               //console.dir(content);
               
               setCellContent.apply(self,[objeto[0],content,options]);
               
        }
        objeto=null;
        options=null;
        content=null;    
    };
    var setArrayContent=function(content){
       var self=this;
       if (self.arrayContent[content.row]){
           
         self.arrayContent[content.row].Traking=ns.enumTraking.update;  
         self.arrayContent[content.row][content.name]=content;
         //console.dir( self.arrayContent[content.row]);
       }
      
       
    
       //self=null
    };
    var setArrayData=function(nameField,num,valor){
        var self=this;
        //console.dir(self.arraydata[num]);
        if (self.arraydata[num])
           self.arraydata[num][nameField]=valor;
    
    };
    var getNumRow=function(elem){
        var self=this;
        return $("#"+self.options.nameid).find("tr.cabezera").first().nextUntil($(elem),"tr.dato").length;
    };
    var setCellContent=function(that,content,options){
       var self=this; 
       var objeto=$(that);
       var warning;
       //console.dir(objeto.parent().parent());
       //var num=$("#"+self.options.nameid).find("tr.cabezera").first().nextUntil(objeto.parent().parent(),"tr.dato").length;
       var num=getNumRow.apply(self,[objeto.parent().parent()[0]]);
    
       if (self.arraydata[num]){
          var row=self.arraydata[num].key;
          //console.log(row);
          //console.log(num);
          content.row=row;
          content.originalValue=  self.arrayContent[content.row][content.name].originalValue;
       }
       //var subclass;
       
       //console.log(warning);
       setAlignDefault(objeto.parent()[0],options);
       warning=setCellValid("warning",content);
       if (isNewInputCtrl(that)){
          
          objeto.val(content.text);
          //console.log(warning);
          $(objeto).removeClass("current-cell-bg");
          $(objeto.parent()).removeClass("current-cell-bg");
           
          if (warning){
             if ($(objeto.parent()).find("span").length===0)
                $(objeto.parent()).append(warning);
          
          }else{
             $(objeto.parent()).find("span").remove();
          }
       }else{
          //console.log("borrarmos el cell-bg"); 
          $(objeto.parent()).removeClass("current-cell-bg"); 
         
          
          //console.dir(content); 
          setArrayData.apply(self,[content.name,num,content.value]);
          setArrayContent.apply(self,[content]);
          //warning=setCellValid("warning",content);
          $(objeto.parent()).html(content.text+warning);
       } 
       objeto=null;
    };
    var setCellValid=function(subclass,content){
        var warning;
        if (content.isValid){
            warning="";
          }else{
            warning="<span class='fa fa-warning "+subclass+"'></span>";  
        }
        return warning;
    };
    var isNewInputCtrl=function(that){
      return $(that).hasClass("input-ctrl-new") ? true:false;
    };
    
    var validateMaskValue=function(valor){
      var content={};
      var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
      //console.dir(options);
      switch (options.subtype){
       case "decimal":
        content=validateDecimalValue.apply(options,[valor]);
       break;
       case "date":
        content=validateDateValue.apply(options,[valor]);
       break;
       case "email":
        content=validateEmailValue.apply(options,[valor]);
       break;
       case "time":
        content=validatemasktimevalue.apply(options,[valor]);
       break;
      }
      return content;
    };
    var validateDecimalValue=function(valor){
           var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
    
          var content={text:valor,value:valor,isValid:true};
          
          if (valor){
              console.log("estoy dentro de valor");
              content.value=Number(options.format(valor));
          }
          
          //console.dir(options);
          //console.log(valor);
          //content.isValid=true;
          //content.text=valor
          //content.value=valor;
          if (!isNaN(valor) && valor!=="" && valor!==0 ){
             if ("min" in options && "max" in options){
                //console.log(valor);
                 if (options.min<=valor && options.max>=valor){
                  //valor=formatNumber2dEu(Number(elemInput.val()));
    
                  //dato=options.formatText(Number(valor));
                  content.text=options.formatText(Number(valor));
                  content.value=Number(valor);
                 }else{
                
                  content.isValid=false;
                 }
             }else if ("min" in options){
                 if (options.min<=valor){
                  //valor=formatNumber2dEu(Number(elemInput.val()));
                  console.log("estoy en min"); 
                  content.text=options.formatText(Number(valor));
                  content.value=Number(valor);
                 }else{
                   
                   content.isValid=false; 
                 }
             }else if ("max" in options){
                 if (options.max>=valor){
                   //valor=formatNumber2dEu(Number(elemInput.val()));
                   content.text=options.formatText(Number(valor));
                   content.value=Number(valor);
                 }else{
                  
                   content.isValid=false;
                 }
             }else{
                   //valor=formatNumber2dEu(Number(elemInput.val()));
                  content.text=options.formatText(Number(valor));
                  content.value=Number(valor);
             }        
          }else{
             if ("required" in options){
                 if (emptyString(valor)){
                   //valor="<div class='no-valid-data' >"+valor+"</div>"
                   content.isValid=false;
                 }
             }
          }  //if (!isNaN(valor)){...}
          options=null;
          return content;
    };
    var validateDateValue=function(valor){
        var content={text:valor,value:valor,isValid:true};
        var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
        if ("required" in options){
            if (emptyString (valor)){
              //valor="<div class='no-valid-data'>"+valor+"</div>"; 
              content.isValid=false;
            }else if (!ns.isValidDate(valor)){
              //valor="<div class='no-valid-data'>"+valor+"</div>";
              content.isValid=false;
            }
        }else if (!ns.isValidDate(valor) && !emptyString(valor)){
            //valor="<div class='no-valid-data'>"+valor+"</div>";
            content.isValid=false;
        }
        options=null;
        return content;
    };
    var validateStringValue=function(valor){
        var content={text:valor,value:valor,isValid:true};
        var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options    
        //console.log(options);
        //console.dir(options);
        //console.log(valor);
        if ("required" in options){  
          if (emptyString(valor)){
            //valor="<div class='no-valid-data'>"+valor+"</div>";
            content.isValid=false;
          }
        }
        options=null;
        //console.dir(content);
        return content;
    };
    var validateEmailValue=function(valor){
        var content={text:valor,value:valor,isValid:true};
        var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
        if ("required" in options){
          if (emptyString(valor)){
            //valor="<div class='no-valid-data'>"+valor+"</div>";
            content.isValid=false;
          }
        }else if (!ns.isValidEmail(valor) && !emptyString(valor)){
           //valor="<div class='no-valid-data'>"+valor+"</div>";
           content.isValid=false;
        }
        options=null;
        return content;
    };
    var validatemasktimevalue=function(valor){
        var content={text:valor,value:valor,isValid:true};
        var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
        //console.dir(options);
        //console.log(options.mask);
        //console.log("validate:"+valor);                 
        if ("required" in options){
          if (emptyString(valor)){
             //valor="<div class='no-valid-data'>"+valor+"</div>";
             content.isValid=false;   
          }  
        }else if (!Inputmask.isValid(valor,{alias:options.mask}) && !emptyString(valor)){
          //valor="<div class='no-valid-data'>"+valor+"</div>";
          content.isValid=false;
        }
        options=null;
        return content;
    };
    var validateIntegerStringValue=function(valor){
        var content={text:valor,value:valor,isValid:true};
        var options=this; // se refiere al propio objeto options, estas funciones
                         // luego se asocian a options.format=.... y por tanto
                         // this hace referencia al propio options
         //  valor=ns.padLeft(Number($(self).text().trim()),options.length); 
         //console.dir(options);
          if (valor && !isNaN(valor)){
              content.value=Number(options.format(valor));
          }
          if (!isNaN(valor) && valor!=="" && valor!==0 ){
             if ("min" in options && "max" in options){
                //console.log(valor);
                if (options.min<=valor && options.max>=valor){
                  //valor=ns.padLeft(Number(elemInput.val()),options.length);
                  content.text=options.formatText(Number(valor),options.length);
                  content.value=Number(valor);
                  //content.text=valor;
                }else{
                  //valor="<div class='no-valid-data'>"+valor+"</div>";
                  content.isValid=false; 
                }
             }else if ("min" in options){
                 if (options.min<=valor){
                    //valor=ns.padLeft(Number(elemInput.val()),options.length);
                   content.text=options.formatText(Number(valor),options.length);
                   content.value=Number(valor);
                    
                 }else{
                  
                   content.isValid=false;
                 }
             }else if ("max" in options){
                 if (options.max>=valor){
                   //valor=ns.padLeft(Number(elemInput.val()),options.length);
                   content.text=options.formatText(Number(valor),options.length);
                   content.value=Number(valor);
                 }else{
                   
                   content.isValid=false;
                 }
             }else{
                    // valor=ns.padLeft(Number(elemInput.val()),options.length);
                   content.text=options.formatText(Number(valor),options.length);
                   content.value=Number(valor);
             }        
          }else{
              if ("require" in options){
                  if (emptyString(valor)){
                   
                    content.isValid=false;
                  }
              }
          }  //if (!isNaN(valor)){...}
          options=null;
          return content;
    };
    
    })(controls=controls||{},jQuery);

    
var UXTable = controls.UXTable;
export {UXTable}

/*
if (!window.controls)
   window.controls={}
      
util.addNameSpace(window.controls,controls);

*/