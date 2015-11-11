alert("Ram");
ram={};

// Function to load and evaluate additional JavaScript code
// For example, this page could be loaded from "https://izmaylov.github.io/jsmain/j.js"
ram.loader=function(src){
  x=new XMLHttpRequest();
  str=src+'?randomvalue'+Math.random();
  x.open('GET', str, true); 
  x.onload=function(){clearTimeout(t);eval(x.responseText);};
  x.send();
  t=setTimeout('alert("Bad connection. Failed to load JS code from \""+str+"\"")',3000);
};

// Function to make slashes in JavaScript code strings
ram.make_slashes=function(t){s=t.replace(/\\/g,"\\\\").replace(/\"/g,"\\\""); return s;}

// Function to add nav buttons on page
ram.add_page_book_mode=function(){
  /* Make fixed elements opaque: */
  x=document.getElementsByTagName('*');
  for (var i = 0; i < x.length; i++){ 
    if (window.getComputedStyle(x[i]).position=="fixed" & window.getComputedStyle(x[i]).opacity>0.7) {x[i].style.opacity=0.7;} 
  }; 
  /* And add navigation buttons: */ 
  var d=document.createElement('div'); 
  d.innerHTML='<div style="position:fixed;bottom:3px;left:3px;z-index:99999; width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-bottom: 60px solid gray; opacity: 0.8;"><div style="position:relative;top:7px;left:-25px; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid transparent; border-bottom: 50px solid black; opacity: 0.8;" onclick="document.body.scrollTop=document.body.scrollTop-document.documentElement.clientHeight+20;"></div></div><div style="position:fixed;bottom:3px;right:3px;z-index:99999; width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 60px solid gray; opacity: 0.8;"><div style="position:relative;top:-57px;left:-25px; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid transparent; border-top: 50px solid black; opacity: 0.8;" onclick="document.body.scrollTop=document.body.scrollTop+document.documentElement.clientHeight-20;"></div></div>'; 
  document.body.appendChild(d); 
};

// Function to add direct links on page to grab media files from mobile version of vk.com
ram.add_vk_grabber=function(){
  x=document.getElementsByClassName("audio_item ai_has_btn");
  for (i=0;i<x.length;i++) {
    y=x[i].getElementsByClassName("ai_info")[0].getElementsByClassName("ai_body")[0];    
    str=y.getElementsByTagName("input")[0].value;    
    end=str.indexOf("?");    
    str=str.substr(0,end);    
    if (y.innerHTML.substr(y.innerHTML.length-17,17)!="load link added\">") {
      par=x[i].parentNode;
      nextn=x[i].nextSibling;
      var ad=document.createElement("a");
      ad.href=str; 
      ad.innerHTML="^[download]";
      ad.download=y.getElementsByClassName("ai_label")[0].getElementsByClassName("ai_artist")[0].innerHTML+" - "+y.getElementsByClassName("ai_label")[0].getElementsByClassName("ai_title")[0].innerHTML+".mp3";
      y.innerHTML+="<input type=hidden value=\"load link added\">";
      if (nextn) {par.insertBefore(ad,nextn);} else {par.appendChild(ad);};
    };
  }
  x=document.getElementsByClassName("audio  fl_l");
  x=document.getElementsByClassName("media_view video_view");
  for (i=0;i<x.length;i++) {
    vid_name=x[i].getElementsByClassName("vv_summary")[0].innerHTML;
    y=x[i].getElementsByClassName("vv_body")[0].getElementsByClassName("vv_inline_video")[0];
    z=y.getElementsByTagName("source");
    load_str="";
    for (j=0;j<z.length;j++) {
      str=z[j].src;
      end=str.indexOf("?");
      str=str.substr(0,end);
      vid_quality=" "+str.substr(end-7,3)+"p";
      load_str+="<a href='"+str+"' download='"+vid_name+vid_quality+".mp4'>[download"+vid_quality+"]</a>";
    }
    t=x[i].getElementsByClassName("like_box bl_cont")[0].getElementsByClassName("mv_details")[0];
    if (t.innerHTML.substr(0,7)!="<a href") t.innerHTML=load_str+"<br>"+ t.innerHTML;
  }
};

