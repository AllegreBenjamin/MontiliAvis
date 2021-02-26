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
	 * @param {array} photos
	 * @param {string} website
	 * @param {number} priceLevel 
	 */
	constructor(idRestaurant, placeId, nameRestaurant, address, userRatingsTotal, rating, lat, lng, formattedPhoneNumber, reviews, website, openingHours, priceLevel){
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
		this.priceLevel = priceLevel;
	
    }
	static clearFicheRestaurant(){
		FicheRestaurant.ficheRestaurantElement.innerHTML = null;
		
	}

	static get ficheRestaurantElement(){
		return document.getElementById("ficheRestaurant")
	}

	static openFicheRestaurant(ficheRestaurant){
		document.getElementById("overlay").style.display = "block"
		
		let afficheFicheRestaurant = ''
		// affichage fiche
		afficheFicheRestaurant = `<article id="${ficheRestaurant.idRestaurant}" class="articleFiche">
									<div class="row">
										<div class="starsImg col-lg-6">				
											<h5 class="H5">${ficheRestaurant.nameRestaurant}  - </h5>${Restaurants.starsHTML(ficheRestaurant.rating)}
									 		<p>${ficheRestaurant.address}</p>
											<p>Nombre d'avis: ${ficheRestaurant.userRatingsTotal} </p>
											<p>Téléphone: ${ficheRestaurant.formattedPhoneNumber}</p>
											<p>Site:<a> ${ficheRestaurant.website}</a></p>
										</div>
										<div class="street-view-img col-lg-6">	
											<img class=" "
												id="img-${ficheRestaurant.idRestaurant}"
												src="https://maps.googleapis.com/maps/api/streetview?location=${ficheRestaurant.lat},${ficheRestaurant.lng}&size=256x256&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
												alt="image street view" />
										</div>
									</div>
									<div id="avis" class="row">
										<form id="formAvis-${ficheRestaurant.idRestaurant}" class="col-lg-6 form-avis">
											<h6>Donner votre avis</h6>
											<label for="author-name-${ficheRestaurant.idRestaurant}">Votre nom :</label>
											<input type="text" id="author-name-${ficheRestaurant.idRestaurant}" name="author-name-${ficheRestaurant.idRestaurant}">
											${Restaurants.getDateAndDisplay()}
											<textarea id="comment-${ficheRestaurant.idRestaurant}" name="comment" rows="5" cols="33">

											</textarea><br /> 
							
											<input type="hidden" name="note" value="" id="note-${ficheRestaurant.idRestaurant}"/>
												<img src="img/stars/star_out.gif" id="star_1" class="star"/>
												<img src="img/stars/star_out.gif" id="star_2" class="star"/>
												<img src="img/stars/star_out.gif" id="star_3" class="star"/>
												<img src="img/stars/star_out.gif" id="star_4" class="star"/>
												<img src="img/stars/star_out.gif" id="star_5" class="star"/><br />
											<input type="reset" value="Reset"/>
											<input type="button" id="avis-${ficheRestaurant.idRestaurant}" value="Envoyer"/>
						
								</form> `
								ficheRestaurant.reviews.forEach(review => {
								
									afficheFicheRestaurant +=
									`
									<div class="col-lg-6 article-${ficheRestaurant.idRestaurant}">
										<p>${review.author_name} - ${review.relative_time_description}</p>
										<p>${Restaurants.starsHTML(review.rating)} - ${review.text}</p>
									</div>`
								
								}); 	 
								`</div>
								</article>`	
		this.ficheRestaurantElement.innerHTML += afficheFicheRestaurant;
	}
	
    static closeFicheRestaurant(){
        document.getElementById("overlay").style.display = "none";
		FicheRestaurant.clearFicheRestaurant()
    }
}



	

