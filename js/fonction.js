
						

  let img = document.getElementById('img-'+x);
  img.classList.remove('article-img');
  let form = document.getElementById('formAvis-'+x);
  form.classList.remove('formElementNone');
  let les_stars = form.querySelectorAll('img');
  let note = 0;
  for(let w = 0; les_stars.length > w; w++) {
    // SI survol etoile alors ajouter a note et changer l'image star
    les_stars[w].addEventListener('mouseover', function(event) {
      if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_out.gif'){
          les_stars[w].setAttribute("src", "img/stars/star_in.gif");
          note++;
          let inputNote = document.getElementById('note-'+x);
          inputNote.setAttribute("value", note);
          
        }
      
    });
    // si click si etoile alors supprimer de note et changer l'image
    les_stars[w].addEventListener('click', function(event) {
      if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_in.gif'){
        les_stars[w].setAttribute("src", "img/stars/star_out.gif");
        note--;
        let inputNote = document.getElementById('note-'+x);
        inputNote.setAttribute("value", note);
        
      }
          
    });
      
      const addAvisBtn = document.querySelector('#avis-'+x);
      console.log(addAvisBtn);
      addAvisBtn.addEventListener('click', function(event){
        let comment = document.getElementById('comment-'+x).innerHTML;
        let note = document.getElementById('note-'+x).innerHTML;
        console.log(note);console.log(comment);
      })

      
  }

});

////////////////////////////


let les_stars = form.querySelectorAll('img');
  
  


  for(let w = 0; les_stars.length > w; w++) {
    if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_in.gif'){
        les_stars[w].setAttribute("src", "img/stars/star_out.gif");
        note--;
        console.log(note);
    }	
  }

});
}