/**
 * Create a restaurant - Créer un restaurant
 * @class Restaurants
 */
class Restaurants {
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
	constructor(idRestaurant, placeId, name, address, lat, lng, userRatingsTotal, rating, formattedPhoneNumber, reviews, photos, website, openingHours, priceLevel){
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
		this.photos = photos;
		this.website = website;
		this.openingHours = openingHours;
		this.priceLevel = priceLevel;
	}

	/**
	 * @listElement - returns the DOM element which corresponds to your restaurant list and which will be used in the other methods of this class.
	 * 			    - renvoi l'élément du DOM qui correspond à ta liste de restaurant et qui servira dans les autres méthodes de cette class. 
	 * @static
	 */
	static get listElement(){
		return document.getElementById("list");
	}

	/**
	 * @getDateAndDisplay - Retrieves the date and returns it for display.
	 * 					  - Récupère la date et la retourne pour affichage.
	 * @returns {string}
	 */
	static getDateAndDisplay(){
		/**
		 * This function allows you to create a new Date object
		 * Cette fonction permet de créer un nouvel objet Date.
		 */
		let now = new Date()
		
		let annee = now.getFullYear();
		let mois = ('0'+now.getMonth()+1).slice(-2);
		let jour = ('0'+now.getDate()).slice(-2);
		let heure = ('0'+now.getHours()).slice(-2);
		let minutes = ('0'+now.getMinutes()).slice(-2);
		let secondes = ('0'+now.getSeconds()).slice(-2);

		return `<p>Date : ${jour} / ${mois} / ${annee}</p>
		<p>Heure : ${heure} : ${minutes} : ${secondes} </p>`

	}



	/**
	 * @clearList - blank display of any restaurant 
	 *            - vide l'affichage de tout restaurant.
	 * @static
	 */
	static clearList() {
		// On profite de la propriété static listElement qu'on vient de créer.
        Restaurants.listElement.innerHTML = null;
	}

	/**
	 * @starsHTML - Allows thanks to the value in stars to retrieve the image then to return it in an html IMG tag
	 * 			  - Permet grâce a la valeur dans stars de récupérer l'image puis de la retourner dans une balise html IMG
	 * @param {number} stars
	 * @returns {string} 
	 */
	static starsHTML(stars){

        const roundedStars = Math.round(stars * 2) / 2;
        return `<img class="img-star" src="img/stars/${roundedStars}-stars-gold.png" alt="${roundedStars}-stars-gold.png" />`;
	
	}

	/**
	 * @displayRestaurants - Display the restaurant in the list
	 * 					   - Afficher le restaurant dans la list 
	 * @param {Object} newRestaurant - Object Restaurants
	 * @param {*} starMin - stars min
	 * 					  - étoiles Min
	 */
	static displayRestaurants(newRestaurant, starMin){
		 console.log(newRestaurant)
		 let html = '';
			
			if(newRestaurant.rating >= starMin){
				addMarker(parseFloat(newRestaurant.lat), parseFloat(newRestaurant.lng));
				html = `<article id="${newRestaurant.idRestaurant}" class="article">
					<div class="starsImg col-lg-12">				
						<h5 class="H5">${newRestaurant.name} - </h5>${Restaurants.starsHTML(newRestaurant.rating)}
						<input class="moyenne" type="hidden" value="${newRestaurant.rating}">
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
							<p>Site: ${newRestaurant.website}</p>
							<p>
								Lat : <span id="lat-${newRestaurant.idRestaurant}">${newRestaurant.lat}</span>
								Lng : <span id="lng-${newRestaurant.idRestaurant}">${newRestaurant.lng}</span>
							</p>
						</div>
						<div class="restaurant-photos col-lg-12"> `
							console.log(newRestaurant.photos.length)
					`	</div>
					</div>
					<form id="formAvis-${newRestaurant.idRestaurant}" class="elementNone form-avis">
						<h6>Donner votre avis</h6>
						<label for="author-name-${newRestaurant.idRestaurant}">Votre nom :</label>
						<input type="text" id="author-name-${newRestaurant.idRestaurant}" name="author-name-${newRestaurant.idRestaurant}">
						${Restaurants.getDateAndDisplay()}
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
					<div id="avis" class="elementNone">`

				newRestaurant.reviews.forEach(review => {
					
					html +=
					`
					<div class="article-${newRestaurant.idRestaurant}">
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

	/**
	 * @displayRestaurant - Show hidden restaurant information (x)
	 * 					  - Afficher les informations masquées du restaurant(x)
	 * @param {number} x  - Numerical reference of the desired restaurant
	 * 					  - Référence numérique du restaurant voulu
	 */
	static displayRestaurant(x){
		// IMG restaurant récup pour modif de la class 'visible'
		let img = document.getElementById('img-'+x);
		img.classList.remove('article-img');
		// afficher le formulaire pour donner sont avis
		let form = document.getElementById('formAvis-'+x);
  		form.classList.remove('elementNone');
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
 
		let divAvis = document.getElementById('avis');
	
		divAvis.classList.remove('elementNone');
					
		latitude = document.getElementById('lat-'+x).innerHTML;
		longitude = document.getElementById('lng-'+x).innerHTML;
		
		addMarkerZoom(parseFloat(latitude), parseFloat(longitude));
	}
	
	/**
	 * @addListenerFormAndComment - Add a listener for adding a restaurant review for processing
	 * 							  - Ajouter un listener pour l'ajout d'un avis restaurant pour traitement
	 */
	static addListenerFormAndComment() {
		const nodeList = document.getElementsByClassName('article');

		for (let x = 0; x < nodeList.length; x++) {
			
			// Affiche restaurant onclick 
			nodeList[x].addEventListener('click', () => {
			// vérifie que le restaurant n'est pas déjà ouvert
				if (document.querySelector('#formAvis-'+x).classList.contains('elementNone')) {
					Restaurants.displayRestaurant(x)
				}
			});
			const addAvisBtn = document.querySelector('#avis-'+x);
				
			addAvisBtn.addEventListener('click', function(event){
				
				let name = document.getElementById('author-name-'+x).value;	
				let comment = document.getElementById('comment-'+x).value;
				let inputNote = document.getElementById('note-'+x).value;

				let divAvis = document.getElementById('avis');
				let div = document.createElement('div');
					div.setAttribute('class', 'article-'+x);
				
					div.innerHTML = `<p>${name} - ${Restaurants.getDateAndDisplay()}</p>
									 <p>${Restaurants.starsHTML(inputNote)} - ${comment}</p>`
					divAvis.appendChild(div);
				
			});

			let divAvis = document.getElementById('avis');
			if(divAvis !== null){
				divAvis.addEventListener('mouseleave', function(event){
					// IMG restaurant récup pour modif de la class 'display : none'
					let img = document.getElementById('img-'+x);
					img.classList.add('article-img');
					// cacher le formulaire pour donner sont avis
					let form = document.getElementById('formAvis-'+x);
					form.classList.add('elementNone');
					// List des commentaires déjà présent pour le restaurant avec leur note modif class 'display : none'
					divAvis.classList.add('elementNone');
					deleteMarkerZoom();
				});
			}
		}
	}	
	
	/**
	 * @addNewRestaurant - Allows the user to add a restaurant to the list already presented.
	 * 					 - Permets à l'utilisateur d'ajouter un restaurant a la list déjà présentée. 
	 * @param {number} lat 
	 * @param {number} lng 
	 */
	static addNewRestaurant(lat, lng){
		let list = this.listElement.getElementsByClassName('article'),
	 		html = '',
			idNewRestaurant = list.length,
			date = Restaurants.getDateAndDisplay(),
			name = prompt("Quel est le nom du restaurant :"),
			address = prompt("Renseigner l'adresse :"),
			userRatingsTotal = 1,
			formattedPhoneNumber = parseInt(prompt("Renseigner le téléphone :")),
			authorName = prompt("Nom de l'auteur :"),
			stars = parseInt(prompt("Noter le restaurant de 1 à 5 :")),
			comment = prompt("Ajouter un commentaire :"),
			ratings = [
				{
				'stars' : stars,
				'comment' : comment
				},
			]
		html = `<article id="${idNewRestaurant}" class="article">
				<div class="starsImg col-lg-12>
					<h5 class="H5">${name} - </h5>  ${Restaurants.starsHTML(Restaurants.starAverage(ratings))}
					<input class="moyenne" type="hidden" value="${stars}">
				</div>
				<div class="row">
					<div class="street-view-img col-lg-6>
						<img class="article-img"
							id="img-${idNewRestaurant}"
							src="https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=256x256&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
							alt="image street view" />
					</div>
					<div class="restaurant-info col-lg-6">
						<p>${address}</p>
						<p>Avis total: ${userRatingsTotal}</p>
						<p>${formattedPhoneNumber}</p>
						<p>
							Lat : <span id="lat-${idNewRestaurant}">${lat}</span>
							Lng : <span id="lng-${idNewRestaurant}">${lng}</span>
						</p>
					</div>
				</div> 
				<form id="formAvis-${idNewRestaurant}" class="elementNone form-avis">
						<h6>Donner votre avis</h6>
						<label for="author-name-${idNewRestaurant}">Votre nom :</label>
						<input type="text" id="autho-name-${idNewRestaurant}" name="author-name-${idNewRestaurants}">
						${Restaurants.getDateAndDisplay()}
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
					<div id="avis" class="elementNone">
						<div class="article-${idNewRestaurant}">
							<p>${authorName} - ${date}</p>
							<p>${Restaurants.starsHTML(ratings.stars)} - ${ratings.comment}</p>
						</div>
					</div>
				</article>`
		this.listElement.innerHTML += html;
	}

/**  A Travailé pour prendre en compte des nouveaux commentaire et réajusté la moyenne star
	static starAverage(ratings){
		/*
         * Une écriture alterative plus courte pour faire un moyenne :
		  
        return ratings.reduce((a, c) => a += c.stars, 0) / ratings.length;
	}
**/	
}  