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
	
	 */
	constructor(idRestaurant, placeId, name, address, lat, lng, userRatingsTotal, rating){
		this.idRestaurant = idRestaurant;
		this.placeId = placeId;
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.userRatingsTotal = userRatingsTotal;
		this.rating = rating;

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
	 * @displayRestaurantsBase - Used to display the basic list of restaurants with simplistic display.
	 * 						   - Permets d'afficher la liste de bases des restaurants affichage simpliste. 
	 * @param {Object} restaurantsBases - Table containing Restaurant objects found near the user location
	 * 									- Tableau contenant les Objets restaurants trouvé à proximité de la localisation utilisateur
	 */
	static displayRestaurantsBases(restaurantBase){
		
		// voir avec MENTOR pour faire autrement
		
		let html = '';
		addMarker(parseFloat(restaurantBase.lat), parseFloat(restaurantBase.lng))
		html = `<article id="${restaurantBase.idRestaurant}" value="${restaurantBase.idRestaurant}" class="article">
					<div class="inputInfo">
						<input class="idRestaurant" type="hidden" value="${restaurantBase.idRestaurant}">
						<input class="H5input" type="hidden" value="${restaurantBase.name}">
						<input class="moyenne" type="hidden" value="${restaurantBase.rating}">
						<input class="placeId" type="hidden" value="${restaurantBase.placeId}">
						<input class="adresse" type="hidden" value="${restaurantBase.address}">
						<input class="nbrAvis" type="hidden" value="${restaurantBase.userRatingsTotal}">
						<input class="lat" type="hidden" value="${parseFloat(restaurantBase.lat)}">
						<input class="lng" type="hidden" value="${parseFloat(restaurantBase.lng)}">
					</div>
					<div class="starsImg col-lg-12">				
						<h5 class="H5">${restaurantBase.name} - </h5>${Restaurants.starsHTML(restaurantBase.rating)}
					</div>
					<div class="restaurant-info col-lg-12">
						<p class="adresse">${restaurantBase.address}</p>
						<p class="nbrAvis elementNone">Nombre d'avis: ${restaurantBase.userRatingsTotal}</p>
					</div>
				</article>
				`
				this.listElement.innerHTML += html;
		
		handleSearchForm()
	
	}

	/**
	 * @function
	 * @name addEventListenerListsRestaurants - Listening event functions on the restaurant list. If clicked,
	 * 											retrieved basic restaurant information. Then display the restaurant
	 * 											file with the details corresponding to the selected restaurant (getDetail).
	 *										  - Fonctions d'écoute d'événement sur la liste des restaurants. Si clic, 
	 *											récupéré les informations de base restaurant. Puis affiche la fiche
	 *											restaurant avec les détails correspondant au restaurant sélectionné (getDetail).
	 */
	static addEventListenerListsRestaurants(){

			let listsRestaurants = this.listElement.getElementsByClassName('article')
			
			
			for(let x = 0; x < listsRestaurants.length; x++) {
				
				// Affiche restaurant onclick 
				listsRestaurants[x].addEventListener('click', () => {
					console.log(listsRestaurants[x])
					// get place_id pour recherche detail
					

					// Récupère les informations du restaurant sans rêquete
					let divInputInfo = listsRestaurants[x].getElementsByClassName("inputInfo")
						let idRestaurant = divInputInfo[0].getElementsByClassName("idRestaurant")
						let h5 = divInputInfo[0].getElementsByClassName("H5input")
						let inputMoyenne = divInputInfo[0].getElementsByClassName("moyenne")
						let inputPlaceId = divInputInfo[0].getElementsByClassName("placeId")
						let pAdresse = divInputInfo[0].getElementsByClassName("adresse")
						let pNbrAvis = divInputInfo[0].getElementsByClassName("nbrAvis")
						let lat = divInputInfo[0].getElementsByClassName("lat")
						let lng = divInputInfo[0].getElementsByClassName("lng")
					
				
					tabInfoBase = [
						idRestaurant[0].value,
						h5[0].value,
						inputMoyenne[0].value,
						inputPlaceId[0].value,
						pAdresse[0].value,
						pNbrAvis[0].value,
						lat[0].value,
						lng [0].value,
					]
					getDetail(tabInfoBase[3], tabInfoBase);
					
				});


			}			
		
	}

	/**
	 * @function
	 * @name addNewRestaurant - Allows the user to add a restaurant to the list already presented.
	 * 					 - Permets à l'utilisateur d'ajouter un restaurant a la list déjà présentée. 
	 * @param {number} lat 
	 * @param {number} lng 
	 */
	static addNewRestaurant(lat, lng){
		let list = this.listElement.getElementsByClassName('article'),
	 		html = '',
			idNewRestaurant = list.length,
			date = Restaurants.getDateAndDisplay(),
			nameRestaurant = prompt("Quel est le nom du restaurant :"),
			address = prompt("Renseigner l'adresse :"),
			userRatingsTotal = 1,
			formattedPhoneNumber = parseInt(prompt("Renseigner le téléphone :")),
			website = prompt("Site web :"),
			openingHours = prompt("Heure d'ouverture"),
			authorName = prompt("Nom de l'auteur :"),
			rating = parseInt(prompt("Noter le restaurant de 1 à 5 :")),
			comment = prompt("Ajouter un commentaire :"),
			reviews = [
				{
					'relative_time_description' : date,
					'author_name' : authorName,
					'rating' : rating,
					'text' : comment
				},
			]

		html = `<article id="${idNewRestaurant}" value="${idNewRestaurant}" class="article">
					<div class="inputInfo">
						<input class="idRestaurant" type="hidden" value="${idNewRestaurant}">
						<input class="H5input" type="hidden" value="${nameRestaurant}">
						<input class="moyenne" type="hidden" value="${rating}">
						<input class="placeId" type="hidden" value="">
						<input class="adresse" type="hidden" value="${address}">
						<input class="nbrAvis" type="hidden" value="${userRatingsTotal}">
						<input class="lat" type="hidden" value="${parseFloat(lat)}">
						<input class="lng" type="hidden" value="${parseFloat(lng)}">
					</div>
					<div class="starsImg col-lg-12">				
						<h5 class="H5">${nameRestaurant} - </h5>${Restaurants.starsHTML(rating)}
					</div>
					<div class="restaurant-info col-lg-12">
						<p class="adresse">${address}</p>
						<p class="nbrAvis elementNone">Nombre d'avis: ${userRatingsTotal}</p>
					</div>
				</article>`
		this.listElement.innerHTML += html;
		this.addEventListenerListsRestaurants()
		// préparation de la fiche restaurants
		let placeId = undefined;
		let ficheRestaurant = new FicheRestaurant (
			idNewRestaurant,
			placeId,
			nameRestaurant,
			address,
			userRatingsTotal,
			rating,
			lat,
			lng,
			formattedPhoneNumber,
			reviews,
			website,
			openingHours
		)
		console.log(ficheRestaurant)
		ficheRestaurant.openFicheRestaurant()
	}

	
/**  A Travailé pour prendre en compte des nouveaux commentaire et réajusté la moyenne star
	static starAverage(ratings){
		/*
         * Une écriture alterative plus courte pour faire un moyenne :
		  
        return ratings.reduce((a, c) => a += c.stars, 0) / ratings.length;
	}
**/	
} 

