
					
  

  
      
      
     

      
  }

});

////////////////////////////


  for(let w = 0; les_stars.length > w; w++) {
    if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_in.gif'){
        les_stars[w].setAttribute("src", "img/stars/star_out.gif");
        note--;
        console.log(note);
    }	
  }

});
}