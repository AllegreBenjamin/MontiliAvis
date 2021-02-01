class Restaurants {

	constructor(idRestaurant, placeId, name, address, lat, lng, userRatingsTotal, rating, formattedPhoneNumber, reviews, openingHours, photos, website, priceLevel){
		this.idRestaurant = idRestaurant;
		this.placeId = placeId;
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.userRatingsTotal = userRatingsTotal;
		this.rating = rating;
		this.formattedPhoneNumber = formattedPhoneNumber;
		this.reviews = reviews;
		this.openingHours = openingHours;
		this.photos = photos;
		this.website = website;
		this.priceLevel = priceLevel;
	}
	/**
	 * @listElement - renvoi l'élément du DOM qui correspond à ta liste de restaurant et qui servira dans les autres méthodes de cette class. 
	 * @static
	 */
	static get listElement(){
		return document.getElementById("list");
	}
	/**
	 * @clearList - vide l'affichage de tout restaurant.
	 * @static
	 */
	static clearList() {
		// On profite de la propriété static listElement qu'on vient de créer.
        Restaurants.listElement.innerHTML = null;
	}

	/**
	 * 
	 * @param {*} newRestaurant 
	 * @param {*} starMin 
	 */
	static displayRestaurants(newRestaurant, starMin){
		console.log(newRestaurant)
		
		 // On efface la liste.
		 let html = '';

			 /**
			  * On ajoute le début du template d'un article en remplaçant ton usage de 'this'
			  * par 'restaurant' (moi je prefère cette synthaxe
			  */

			if(newRestaurant.rating >= starMin){
				addMarker(parseFloat(newRestaurant.lat), parseFloat(newRestaurant.lng));
				html = `<article id="${newRestaurant.idRestaurant}" class="article">
					<div class="col-lg-12">				
						<h5 class="H5">${newRestaurant.name}</h5>${Restaurants.starsHTML(newRestaurant.rating)}
					</div>
					<div class="row">
						<div class="street-view-img col-lg-6">	
							<img class="article-img"
								id="img-${newRestaurant.idRestaurant}"
								src="https://maps.googleapis.com/maps/api/streetview?location=${newRestaurant.lat},${newRestaurant.lng}&size=256x256&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
								alt="image street view" />
						</div>
						<div class="restaurant-info col-lg-6">
							<p>${newRestaurant.address}</p>
							<p>Avis total: ${newRestaurant.userRatingsTotal}</p>
							<p>Téléphone: ${newRestaurant.formattedPhoneNumber}</p>
							<p>
								Lat : <span id="lat-${newRestaurant.idRestaurant}">${newRestaurant.lat}</span>
								Lng : <span id="lng-${newRestaurant.idRestaurant}">${newRestaurant.lng}</span>
							</p>
						</div>
					</div>
					<form id="formAvis-${newRestaurant.idRestaurant}" class="formElementNone form-avis">
						<h6>Donner votre avis</h6>
						<textarea id="comment-${newRestaurant.idRestaurant}" name="comment" rows="5" cols="33">

						</textarea><br /> 
							
						<input type="hidden" name="note" value="" id="note-${newRestaurant.idRestaurant}"/>
  							<img src="img/stars/star_out.gif" id="star_1" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_2" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_3" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_4" class="star"/>
							<img src="img/stars/star_out.gif" id="star_5" class="star"/><br />
							<input type="reset" value="Reset"/>
							<input type="button" id="avis-${newRestaurant.idRestaurant}" value="Envoyer"/>
						
					</form>
					<div id="avis" class="listElementNone">`

				newRestaurant.reviews.forEach(review => {
					
					/*
					 * Pour chaque note du restaurant actuel, on procède
					 * de la même manière avec un template de note :
					*/
					html +=
					`
					<div class="article-${newRestaurant.idRestaurant}">;
						<p>${review.author_name} - ${review.relative_time_description}</p>
						<p>${Restaurants.starsHTML(review.rating)} - ${review.text}</p>
					</div>`
					
				}); 	 
			
				`</div>
				</article>`
				this.listElement.innerHTML += html;
			
			}else if(newRestaurant.rating < starMin){
				html = `<article id="${newRestaurant.idRestaurant}" class="article">

						</article`;
				this.listElement.innerHTML += html;
			}	
		
	}
	
	static displayRestaurant(x){
		// IMG restaurant récup pour modif de la class 'visible'
		let img = document.getElementById('img-'+x);
		img.classList.remove('article-img');
		// afficher le formulaire pour donner sont avis
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
		}
 
		let div = document.getElementById('avis');
	
		div.classList.remove('listElementNone');
		
						
		latitude = document.getElementById('lat-'+x).innerHTML;
		longitude = document.getElementById('lng-'+x).innerHTML;
		addMarkerZoom(parseFloat(latitude), parseFloat(longitude));
	}
	
	static addListenerFormAndComment() {
		const nodeList = document.getElementsByClassName('article');

		for (let x = 0; x < nodeList.length; x++) {
			
			// Affiche restaurant onclick 
			nodeList[x].addEventListener('click', () => {
			// vérifie que le restaurant n'est pas déjà ouvert
				if (document.querySelector('#formAvis-'+x).classList.contains('formElementNone')) {
					Restaurants.displayRestaurant(x)
				}
			});
			const addAvisBtn = document.querySelector('#avis-'+x);
				
			addAvisBtn.addEventListener('click', function(event){
				console.log('click');	
				let comment = document.getElementById('comment-'+x).value;
				if(typeof comment !== 'string'){
					errComment1 = "Not a string!";
					console.log(errComment1); 
				}else if(comment === null || comment === undefined){
					errComment2 = "Le commentaire est important penser à en inscrire";
					console.log(errComment2);
				}else{
					let inputNote = document.getElementById('note-'+x).value;
					let divAvis = document.getElementById('avis');
					let div = document.createElement('div');
					div.setAttribute('class', 'article-'+x);
					li.innerHTML = Restaurants.starsHTML(inputNote) + '-'  + comment;
					ul.appendChild(li);
				}
			});

			const commentList = document.getElementById('ul-'+x);
			if(commentList !== null){
				commentList.addEventListener('mouseleave', function(event){
					// IMG restaurant récup pour modif de la class 'display : none'
					let img = document.getElementById('img-'+x);
					img.classList.add('article-img');
					// cacher le formulaire pour donner sont avis
					let form = document.getElementById('formAvis-'+x);
					form.classList.add('formElementNone');
					// List des commentaires déjà présent pour le restaurant avec leur note modif class 'display : none'
					let les_li = commentList.querySelectorAll('li');
					for(let y = 0; les_li.length > y ; y++) {
						let li = les_li[y];
						li.classList.add('listElementNone');
					}
						deleteMarkerZoom();
				});
			}
		}
	}	
	
	static addNewRestaurant(lat, lng){
		let list = this.listElement.getElementsByClassName('article'),
	 		html = '',
			idNewRestaurant = list.length,
			name = prompt("Quel est le nom du restaurant ?"),
			address = prompt("Renseigner l'adresse ?"),
			description = prompt("Renseigner description ?"),
			stars = parseInt(prompt("Noter le restaurant de 1 à 5 ?")),
			comment = prompt("Ajouter un commentaire ?"),
			ratings = [
				{
				'stars' : stars,
				'comment' : comment
				},
			]
		html = `<article id="${idNewRestaurant}" class="article">
				<h5 class="H5">${name}</h5>
					${Restaurants.starsHTML(Restaurants.starAverage(ratings))}
					<p>${address}</p>
					<img class=""
						id="img-${idNewRestaurant}"
						src="https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=256x256&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
						alt="image street view" />
					<p>${description}</p>
					<p>
						Lat : <span id="lat-${idNewRestaurant}">${lat}</span>
						Lng : <span id="lng-${idNewRestaurant}">${lng}</span>
					</p>
					<form id="formAvis-${idNewRestaurant}" class="form-avis">
						<h5>Donner votre avis</h5>
						<textarea id="comment-${idNewRestaurant}" name="comment" rows="5" cols="33">

						</textarea><br /> 
							
						<input type="hidden" name="note" value="" id="note-${idNewRestaurant}"/>
  							<img src="img/stars/star_out.gif" id="star_1" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_2" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_3" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_4" class="star"/>
							<img src="img/stars/star_out.gif" id="star_5" class="star"/><br />
							<input type="reset" value="Reset"/>
							<input type="button" id="avis-${idNewRestaurant}" value="Envoyer"/>
						
					</form>
					<ul id="ul-${idNewRestaurant}">
					
						<li class="article-${idNewRestaurant}">${Restaurants.starsHTML(stars)}-${comment}</li>
					
					</ul>
				</article>`
		this.listElement.innerHTML += html;
	}
	
	static clearList(){
		 /**
         * Ici, une méthode 'static' c'est ok, puisqu'elle "affecte" entre guillemet
         * toutes les instances de ta class quand tu vide ton affichage de tout
         * restaurant.
         * Je suggère aussi de simplifier le nom en 'clearList' étant donnée que, te
         * trouvant déjà dans la class 'Restaurants', on comprend tout de suite que tu
         * parle de la liste de restaurant. (Bien sûr c'est du détail.)
         */
        Restaurants.listElement.innerHTML = null;
        // On profite de la propriété static listElement qu'on vient de créer.
	}

	
	static starAverage(ratings){
		/*
         * Une écriture alterative plus courte pour faire un moyenne :
		   */
        return ratings.reduce((a, c) => a += c.stars, 0) / ratings.length;
	}

	/**
	 * 
	 * @param {*} stars 
	 */
	static starsHTML(stars){
		     /**
         * Le nom de cette méthode est pas forcément le plus judicieux puisque elle n'affiche rien,
         * mais renvoie simplement une string HTML. Un nom plus adapter serait 'starsHTML' par exemple.
         */
        const roundedStars = Math.round(stars * 2) / 2;
        return `<img class="img-star" src="img/stars/${roundedStars}-stars-gold.png" alt="${roundedStars}-stars-gold.png" />`;
        /**
         * Par besoin d'une séquence logique à ralonge de 'if' / 'else if'.
         * Ici, il suffit de multiplier la note de l'instance courante par 2,
         * d'arrondir le resultat puis de diviser par 2 pour obtenir un résultat
         * étant soit 0, soit 0.5, soit 1, 1.5, 2, 2.5 ... ainsi de suite jusqu'à 5.
         * Ensuite tu peux injecter cette valeur dans ta string en utilisant la syntaxe
         * 'Littéraux de gabarits' par exemple (jettes un oeil sur MDN pour en savoir plus).
        */
	
	}
}  