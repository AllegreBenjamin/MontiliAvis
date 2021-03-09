/**
 * Create a restaurant file - Créer une fiche restaurant
 */
class FicheRestaurant {
    /**
	 * @constructor
	 * @param {number} idRestaurant 
	 * @param {string} placeId 
	 * @param {string} name 
	 * @param {string} address 
	 * @param {number} lat 
	 * @param {number} lng 
	 * @param {number} userRatingsTotal 
	 * @param {number} rating 
	 * @param {sting} formattedPhoneNumber 
	 * @param {array} reviews 
	 * @param {array} openingHours 
	 * @param {string} website
	 * 
	 */
	constructor(idRestaurant, placeId, nameRestaurant, address, userRatingsTotal, rating, lat, lng, formattedPhoneNumber, reviews, website, openingHours){
		this.idRestaurant = idRestaurant;
		this.placeId = placeId;
		this.nameRestaurant = nameRestaurant;
		this.address = address;
		this.userRatingsTotal = userRatingsTotal;
		this.rating = rating;
		this.lat = lat;
		this.lng = lng;
		this.formattedPhoneNumber = formattedPhoneNumber;
		this.reviews = reviews;
		this.website = website;
		this.openingHours = openingHours;	
	
    }

	/**
	 * @name clearFicheRestaurant - Function that allows you to clean the restaurant file
	 * 						 - Fonction qui permet de nettoyer la fiche restaurant
	 */
	clearFicheRestaurant(){
		console.log(this.ficheRestaurantElement)
		this.ficheRestaurantElement.innerHTML = null;
		
	}

	/**
	 * @ficheRestaurantElement - Function that retrieves the dom element by id and returns it
	 * 						   - Fonction qui récupère l'élément du dom par l'id et la retourne
	 * @return {string}
	 */
	get ficheRestaurantElement(){
		return document.getElementById("ficheRestaurant")
	}

	/**
	 * @closeFicheRestaurant - Function that will close the restaurant file by cleaning it.
	 * 						 - Fonction qui va fermer la fiche restaurant en la nettoyant.
	 */
	closeFicheRestaurant(){
		document.getElementById("overlay").style.display = "none";
		this.clearFicheRestaurant()
	}

	/**
	 * @openFicheRestaurant - Function used to display a restaurant file.
	 * 						- Fonction permettent d'affiche une fiche restaurant.
	 */
	openFicheRestaurant(){
		document.getElementById("overlay").style.display = "block"
		
		let afficheFicheRestaurant = ''
		// affichage fiche
		afficheFicheRestaurant = `<article id="${this.idRestaurant}" class="articleFiche">
									<div class="row">
										<div class="starsImg col-lg-6">				
											<h5 class="H5">${this.nameRestaurant}  - </h5>${Restaurants.starsHTML(this.rating)}
									 		<p>${this.address}</p>
											<p>Nombre d'avis: ${this.userRatingsTotal} </p>
											<p>Téléphone: ${this.formattedPhoneNumber}</p>
											<p>Site:<a> ${this.website}</a></p>
										</div>
										<div class="street-view-img col-lg-6">	
											<img class=" "
												id="img-${this.idRestaurant}"
												src="https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=256x256&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
												alt="image street view" />
										</div>
									</div>
									<div id="avis" class="row">
										<div class="col-lg-6">
											<div class="row">
												<div class="col-lg-12">
													<form id="formAvis-${this.idRestaurant}" class="form-avis">
														<h6>Donner votre avis</h6>
														
														<label for="author-name">Votre nom : </label>
														<input type="text" id="author-name" name="author-name"><br>

														<label class="comment" for="comment" name="comment">Commentaire : </label>
														<textarea id="comment" name="comment" rows="5" cols="33">

														</textarea>
														<br>
														<label class="note" for="note" name="note">Note : </label>
														<input type="hidden" name="note" value="" id="note"/>
															<div class="starsAlign">
																<img src="img/stars/star_out.gif" id="star_1" class="star"/>
																<img src="img/stars/star_out.gif" id="star_2" class="star"/>
																<img src="img/stars/star_out.gif" id="star_3" class="star"/>
																<img src="img/stars/star_out.gif" id="star_4" class="star"/>
																<img src="img/stars/star_out.gif" id="star_5" class="star"/>
															</div>
														<br>
														<input class="button" type="reset" value="Reset"/>
														<input class="button" type="button" id="avisBtn" value="Envoyer"/>
													</form>
												</div>
												<div class="col-lg-12">
													<button class="btnClose" id="btnClose">Fermer Fiche</button>
												</div>
											</div>
										</div>
										<div id="comUtil" class="com-util col-lg-6">
										 `
										 
											this.reviews.forEach(review => {
												
												afficheFicheRestaurant +=
												`
												<div class="article-${this.idRestaurant}">
													<p>${review.author_name} - ${review.relative_time_description}</p>
													<p>${Restaurants.starsHTML(review.rating)} - ${review.text}</p>
												</div>`
											
											});
									`	</div> 	 
									</div>
									
								</article>`
		this.ficheRestaurantElement.innerHTML += afficheFicheRestaurant;
		this.addEventListenerHoverStars()
		this.eventListenerFormAvis()
		this.eventListenerBtnFiche()
	}

	/**
	 * @function
	 * @name eventListenerFormAvis - Allows via a click on the send button of the notice addition form.
	 * 							   - Permet via un clic sur le bouton d'envoyé du formulaire d'ajout d'avis.
	 */
	eventListenerFormAvis(){
		const avisBtn = document.querySelector('#avisBtn')

		avisBtn.addEventListener('click', function(event) {
			let authorName = document.getElementById('author-name').value;
			let comment = document.getElementById('comment').value;
			let note = document.getElementById('note').value;
			
			let comUtil = document.getElementById('comUtil');
			let div = document.createElement('div');
				div.innerHTML = `<p>${authorName} - ${Restaurants.getDateAndDisplay()}</p>
								<p>${Restaurants.starsHTML(note)} - ${comment}</p>`
				comUtil.appendChild(div)
		})

	}

	/**
	 * @function
	 * @name eventListenerBtnFiche - Allows you to close the restaurant file using the button
	 * 							   - Permet de ferme la fiche restaurant via le bouton
	 */
	eventListenerBtnFiche(){
		const btnFiche = document.querySelector('#btnClose');
		btnFiche.addEventListener('click', (event) => {
			this.closeFicheRestaurant()
			
		})
	}


	/**
	 * @function
	 * @name addEventListenerHoverStars - management of events on the stars form add review (hover & click)
	 * 							   - gestion des events sur les etoiles formulaire ajouter avis (survol&clic)
	 */
	addEventListenerHoverStars(){

	  	let les_stars = document.querySelectorAll('img');
	  	let note = 0;
		for(let w = 0; les_stars.length > w; w++) {
							
			// SI survol etoile alors ajouter a note et changer l'image star
			les_stars[w].addEventListener('mouseover', function(event) {
									
				if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_out.gif'){
					les_stars[w].setAttribute("src", "img/stars/star_in.gif");
					note++;
					let inputNote = document.getElementById('note');
					inputNote.setAttribute("value", note);
				}
			});
			// si click si etoile alors supprimer de note et changer l'image
			les_stars[w].addEventListener('click', function(event) {
				if(les_stars[w].src == 'http://127.0.0.1/MontiliAvis/img/stars/star_in.gif'){
					les_stars[w].setAttribute("src", "img/stars/star_out.gif");
					note--;
					let inputNote = document.getElementById('note');
					inputNote.setAttribute("value", note);
				}
			});
		}
	}

   
}



	

