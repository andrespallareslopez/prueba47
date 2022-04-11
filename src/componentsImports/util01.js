
import jQuery from './import-jquery.js'

//import jquery from './import-jquery.js'

var util;
;(function(ns,$){
    
    ns.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    ns.mobileAndTabletcheck = function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
    };
    ns.detectmob=function() { 
          if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
          ){
              return true;
          }
          else {
              return false;
          }
    };
  
    ns.detectmob=function() {
     if(window.innerWidth <= 800 && window.innerHeight <= 600) {
       return true;
     } else {
       return false;
     }
    };
  
     ns.isMobile = {
          Android: function() {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function() {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function() {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function() {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function() {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function() {
              return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
          }
     };
  
      ns.arrayofhash=(function(){
          return function(cadena){
             var myarray=cadena.split("/");
             //console.dir(myarray);
             return myarray;
          };
      })();
      
      ns.extend=function(base,extension){
          for (var property in base){
              extension[property]=base[property];
          }
      };
      
      ns.get=(function(){
      
          return function(url,values){
             var promise= new Promise(function(resolve,reject){
                 //console.log(url);
                //jQuery.support.cors = true;
                $.getJSON(values.pathDataConfig+url,function(results,textstatus,jqXHR){
                    //console.log("estoy dentro de get");
                     //console.log(results);
                     resolve(results);
                }).fail(function(jqxhr,settings,exception){
                    //console.log("hay un error");
                    reject("error en el get");
                });
             });
             return promise;
          }; 
      
      })();
      ns.http={};
      ns.http.get=(function(){
           
           return function(url){
           var promise= new Promise(function(resolve,reject){
                   
                  jQuery.support.cors = true;
                  $.ajax({
                      type: "GET",
                      url: url,
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (response) {
                          //alert(JSON.stringify(response));
                          //$('#texto').text(JSON.stringify(response.value));
                          //response1 = response;
                          //$('#texto').text(JSON.stringify(response));
                          //$('#Status').text("");
  
                          //$.each(response, function (i, item) {
                          //    $('#ListaGrupos').append("<li>" + item.Descripcion + "</li>");
                          //});
                          //console.dir(response);
                          resolve(response);
                      },
                      failure: function (response) {
                          //alert(response);
                          console.log("error en el get");
                          reject("error en el get");
                      },error:function(error){
                          //console.log(error);
                          reject(error);
                      },timeout:10000
                  });
             });
             return promise;
          };
           
      })();
      
      ns.getTemplate=(function(){
          return function(path,template){
             var promise=new Promise(function(resolve,reject){
                 $.ajax({
                     type:"GET",
                     url:path+template+".html",
                     timeout:30000
                 }).done(function(data,textstatus){
                     //console.log("getTemplate  ************************");
                     //console.log(data);
                     
                     resolve(data); 
                     
                 }).fail(function(jqxhr,settings,exception){
                     console.log(exception);
                     console.log(path+template+".html");
                     reject(exception);
                 });            
             });
             return promise;
          };
      })();
      /*
      ns.buildtemplate=(function(){
          return function(params){
              
              var template=Handlebars.compile(params.source);
              var context=params.data;
              if (!context){
                 //console.log("el data esta vacio en buildtemplate "+params.container)
                 
              }
              var html=template(context);
                
                switch(params.typeInsertHTML){
                    case 1:  //before
                       $(html).insertBefore(params.container);
                    break;
                    case 2:  //normal
                       if (params.clearContainer==true)
                           $(params.container).empty();
                       
                           $(html).appendTo(params.container);
                    break; 
                    case 3:  //after
                    
                    break;
                    case 4:  //customElement
                    //$(html).appendTo(params.selector);
                    return html;
                    break;
                    default:
                        
                }
                
          };
      })();
      */
        ns.is_touch_device=function() {
            return 'ontouchstart' in window || navigator.maxTouchPoints;       // works on IE10/11 and Surface
        };
        //********************************************************** */
        ns.renderTemplateRaw=function(datatemplate,textTemplate,state){
            var self=this;
            var p1,p2;
            p1=datatemplate;
            p2=textTemplate;
            console.log("estoy dentro de renderTemplateRaw");
            //console.dir(p1)
            //console.dir(p2)
            ns.promiseTemplate.apply(self,[p1,p2,state]);  
        };
        //************************************************** */
        ns.renderTemplateHtml=function(dataTemplate,textTemplate){
            console.log("estoy en renderTemplateHtml")
            var self=this;
            var params={};
            (function(params){
                params.id=self.options.nameid;
                params.data=dataTemplate;
                params.source=textTemplate;     
                params.container=self.options.container;
                params.typeInsertHTML=self.options.typeInsertHTML;
                params.clearContainer=self.options.clearContainer;
             })(params);
             
             //console.dir(params);
             ns.buildtemplate(params);
        }
        //**********************************************************
        ns.rendertemplate=function(datatemplate,nametemplate,state){
               var self=this;
             
               var p1,p2;
              
               p1=datatemplate;
              
               //console.log("estoy dentro de rendertemplate:"+nametemplate);
               p2=ns.getTemplate(self.options.pathTemplate,nametemplate);
               ns.promiseTemplate.apply(self,[p1,p2,state]);      
               
        };
        ns.renderTemplateCustomElement=function(datatemplate,nametemplate,state){
            var self=this;
             
            var p1,p2;
           
            p1=datatemplate;
            
            //console.log("estoy dentro de rendertemplateCustomElement:"+nametemplate);
            p2=ns.getTemplate(self.options.pathTemplate,nametemplate);
           return ns.promiseTemplateCustomElement.apply(self,[p1,p2,state]);      
        }
        ns.renderTemplateCustomElementRaw = function(datatemplate,textTemplate,state){
            var self=this;
            var p1,p2;
            p1=datatemplate;
            p2=textTemplate;
            //console.log("estoy dentro de renderTemplateCustomElementRaw");
            return ns.promiseTemplateCustomElement.apply(self,[p1,p2,state]); 
        }
        ns.renderTemplateCustomElementReact=function(dataTemplate,templateReact,state){
            var self=this
            ///console.dir(self)
            //console.dir(dataTemplate)
            //console.dir(self.options.ReactDOM)
            //self.renderReactTemplate();
            //console.log("estoy en el estado "+state)
            
            return Promise.resolve(templateReact,state)
            
            
        }
        ns.promiseTemplateCustomElement=function(p1,p2,state){
         var self=this;
         var promise=Promise.all([p1,p2]).then(function(values){
            var params={};
            var elementos;
            elementos=values[0];      
            (function(params){
               params.id=self.options.nameid;
               params.data=elementos;
               params.source=values[1];     
               params.container=self.options.container;
               params.typeInsertHTML=self.options.typeInsertHTML;
               params.clearContainer=self.options.clearContainer;
            })(params);
            
            //console.dir(params);
            self.rawTemplate=ns.buildtemplate(params);
            //console.log(self.rawTemplate);
            return Promise.resolve(self.rawTemplate);
         });
         return promise;
        }
       //*************************************************/
       ns.promiseTemplate=function(p1,p2,state){
         var self=this;
         Promise.all([p1,p2]).then(function(values){
                  //console.dir(values);
                  //console.dir(self.options.fetchTransform);
                  var elementos;
                  if (self.options.fetchTransform){
                      elementos=self.options.fetchTransform(values[0]);
                  }else{
                      elementos=values[0];
                  }
                  
                  //console.dir(elementos);
                  var params={};
                  
                  (function(params){
                     params.id=self.options.nameid;
                     params.data=elementos;
                     params.source=values[1];     
                     params.container=self.options.container;
                     params.typeInsertHTML=self.options.typeInsertHTML;
                     params.clearContainer=self.options.clearContainer;
                  })(params);
                  
                  //console.dir(params);
                  ns.buildtemplate(params);
                  return self.promise;
               }).then(function(mutation){
                 
                  ns.manageStateComponent.apply(self,[state,mutation]);
                
               });
               //.catch(function(error){
               //    console.log("estoy dentro de error");
               //    console.log(error);
               //});  
       };
       ns.manageStateComponent=function(state,mutation){
           var self=this;
           //console.log("manageStateComponent tiene la variable state "+state)
           switch (state){
            case "resize":
               if ("resize" in self){
                   console.log("estoy dentro de resize");
                   self.resize.apply(self,[]);
                     self.observer.disconnect();
                     self.options.conected=false;
               }
               break;
            case "reload":
              if ("reload" in self){
                  console.log("estoy dentro de reload");
                  self.reload.apply(self,[]);
                    self.observer.disconnect();
                    self.options.conected=false;
              }
              break;  
            default:
              //console.log("eestoy en defaul en "+self.options.nametemplate);
              if ('bind' in self){
                  self.bind.apply(self,[self.options]);
              }
              if ("initevent" in self){
                 //console.log("tiene la propiedad initevent"); 
                 //console.dir(self.options)
                 self.initevent.apply(self,[self.options]);
           
              }
             if (self.options.fnbehavior){
                 self.options.fnbehavior.apply(self,[self.options]);
              }
              
              self.options.callbackObserver(mutation); 
              
             
              //if ("create" in self){
              if ("create" in self){
                self.observer.disconnect();
                self.options.conected=false;
                if (self.options.fncreate){
                  self.options.fncreate(self.options);
                }else if (self.create){
                  self.create();
                }
              }
        }

       }
       //*************************************************
       ns.rippleEffect=function(){
           
            $(document).on('click','.ripple', function (event) {
              event.preventDefault();
              
              var $div = $('<div/>'),
                  btnOffset = $(this).offset(),
                      xPos = event.pageX - btnOffset.left,
                      yPos = event.pageY - btnOffset.top;
              
  
              
              $div.addClass('ripple-effect');
              var $ripple = $(".ripple-effect");
              
              $ripple.css("height", $(this).height());
              $ripple.css("width", $(this).height());
              $div
                  .css({
                  top: yPos - ($ripple.height()/2),
                  left: xPos - ($ripple.width()/2),
                  background: $(this).data("ripple-color")
                  }) 
                  .appendTo($(this));
  
              window.setTimeout(function(){
                  $div.remove();
              }, 600);
            });
              
       };
       ns.resizeDebounce=function(fnAltura,values){
              var rtime;
              var timeout=false;
              var delta=300;
              var mytimer;
              var alturaMain;
              function resizeEnd(){
                  if (new Date()-rtime<delta){
                  mytimer= setTimeout(resizeEnd, delta);
                  }else{
                      timeout=false;
                  
                      //alert("done resizing")
                      //values.screenHeight=$(values.containerMain).height();
                      values.screenWidth=$(values.containerMain).width();
                      console.log(window.innerHeight);
                      if (fnAltura){
                          alturaMain=fnAltura();
                      }else{
                           alturaMain=window.innerHeight-47-47;
                           console.log(alturaMain);
                           values.screenHeight=alturaMain;
                           //console.log(values.screenWidth);
                           $(".menu-vertical-01").css({height:(values.screenHeight)+"px"});
                           $(".menu-vertical01").css({height:(values.screenHeight)+"px"});
                           $(".slide-container").css({height:(values.screenHeight-20)+"px"});
                      }
                      clearTimeout(mytimer);
                  }
              }
              $(window).on("resize",function(event){
                rtime=new Date();
                if (timeout===false){
                  timeout=true;
                  mytimer=setTimeout(resizeEnd, delta);
                }
              }); 
       };
       ns.debounce=function debounce(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
       };
  ns.pagination=function pagination(c, m) {
  
      // este ejemplo viene de 
      //https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
      var current = c,
          last = m,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;
  
      for (var i = 1; i <= last; i++) {
          if (i == 1 || i == last || i >= left && i < right) {
              range.push(i);
          }
      }
  
      //for (var i of range) {
      range.forEach(function(i){ 
          if (l) {
              if (i - l === 2) {
                  rangeWithDots.push(l + 1);
              } else if (i - l !== 1) {
                  rangeWithDots.push('...');
              }
          }
          rangeWithDots.push(i);
          l = i;
      });
      
      return rangeWithDots;
  };
  //************************************************** 
  ns.generateButtons=function(currentPage, pageCount, surroundingPageLinkSize){
     function appendTruncateButtons(buttons, pageCount) {
       buttons.push("...");
       buttons.push(pageCount - 1);
       buttons.push(pageCount);
     }
     function prependTruncateButtons(buttons) {
       buttons.push(1);
       buttons.push(2);
       buttons.push("...");
     }
     var buttons = [];
  
     if (currentPage > 1) {
       buttons.push("<");
     }
  
     var truncate = pageCount > (7 + (surroundingPageLinkSize * 2));
     if (!truncate) {
      for (var i = 1; i <= pageCount; i++) {
        buttons.push(i);
      }
     }
     else {
      var truncateEnd = currentPage < (1 + (surroundingPageLinkSize * 2)),
          truncateBoth = (pageCount - (surroundingPageLinkSize * 2)) > currentPage && currentPage > (surroundingPageLinkSize * 2);
     
      if (truncateEnd) {
        for (var j = 1; j < (4 + (surroundingPageLinkSize * 2)); j++) {
          buttons.push(j);
        }
        appendTruncateButtons(buttons, pageCount);
      }
      else if (truncateBoth) {
        prependTruncateButtons(buttons);
        for (var k = (currentPage - surroundingPageLinkSize); k <= (currentPage + surroundingPageLinkSize); k++) {
          buttons.push(k);
        }
        appendTruncateButtons(buttons, pageCount);
      }
      else { // Truncate start
        prependTruncateButtons(buttons);
        for (var l = pageCount - (2 + (surroundingPageLinkSize * 2)); l <= pageCount; l++) {
          buttons.push(l);
        }
      }
     }
  
    if (currentPage < pageCount) {
      buttons.push(">");
    }
    
    return buttons;
  
  };
  //****************************************************************** 
  ns.pagelinks=function(current,allPages){
      //este ejemplo viene de
      //http://jsfiddle.net/885SQ/
      //y esta adaptado para guardarlo en un array
      var pages=[];   
      if(allPages===0) return;
      //if(current>1)print("<");
      if(current>1)pages.push("<");
      //print(1);
      pages.push("1");
      if(current>2) {
          //print("...");
          pages.push("...");
          if(current===allPages&&allPages>3){
            //print(current-2);
            pages.push((current-2).toString());
          }
          pages.push((current-1).toString());
          //print(current-1);
      }
      if(current!=1&&current!=allPages){
         //print(current);
         pages.push(current.toString());  
      }
      if(current<allPages-1) {
          //print(current+1);
          pages.push((current+1).toString());
          if(current==1&&allPages>3){
            //print(current+2);
            pages.push((current+2).toString());
          }  
          //print("...");
          pages.push("...");
      }
      //print(allPages);
      pages.push(allPages.toString()); 
      if(current<allPages){
           //print(">");
           pages.push(">");
      }
      return pages;  
  };
  ns.isNumberKey=function(evt) {
        
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
        
        return true;
         
    };
    ns.addNameSpace=function addNameSpace (ns, newclass) {
      if (!ns){
        ns={}
      }
      if (newclass){
        for (var name in newclass) {
          //console.log(name)
          //console.log(!(name in ns))
          if (name && name!=undefined){
            if (!(name in ns))
              ns[name] = newclass[name]
          }
        
        }
      }
    }
    
    
    
    
    
    
    
  })(util={},jQuery);
    
  export {util}
  