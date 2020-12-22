class Restaurants {

	constructor(idRestaurant, name, address, description, lat, lng, ratings){
		this.idRestaurant = idRestaurant;
		this.name = name;
		this.address = address;
		this.description = description;
		this.lat = lat;
		this.lng = lng;
		this.ratings = ratings;
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
	* @displayRestaurants - Afficher les restaurants 
	* @param {Object} Restaurant
	* @param {number} starAverage
	*/
	static displayRestaurants(restaurants, starMin){
		
		 // 'restaurants' est un array de restaurant et pas une seule instance.
		Restaurants.clearList();
		 let errNote1 = null, errNote2 = null, errComment1 = null, errComment2 = null; 
		 // On efface la liste.
		 let html = '';
		 	
		 // On initialise la variable sous la forme d'une string
		 restaurants.forEach(restaurant => {
			 /**
			  * On ajoute le début du template d'un article en remplaçant ton usage de 'this'
			  * par 'restaurant' (moi je prefère cette synthaxe
			  */
			if(Restaurants.starAverage(restaurant.ratings) >= starMin){
				addMarkerAll(parseFloat(restaurant.lat), parseFloat(restaurant.lng));
				html = `<article id="${restaurant.idRestaurant}" class="article">
					<h5 class="H5">${restaurant.name}</h5>
					${Restaurants.starsHTML(Restaurants.starAverage(restaurant.ratings))}
					<p>${restaurant.address}</p>
					<img class="article-img"
						id="img-${restaurant.idRestaurant}"
						src="https://maps.googleapis.com/maps/api/streetview?location=${restaurant.lat},${restaurant.lng}&size=456x456&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
						alt="image street view" />
					<p>${restaurant.description}</p>
					<p>
						Lat : <span id="lat-${restaurant.idRestaurant}">${restaurant.lat}</span>
						Lng : <span id="lng-${restaurant.idRestaurant}">${restaurant.lng}</span>
					</p>
					<form id="formAvis-${restaurant.idRestaurant}" class="formElementNone form-avis">
						<h5>Donner votre avis</h5>
						<textarea id="comment-${restaurant.idRestaurant}" name="comment" rows="5" cols="33">

						</textarea><br /> 
							
						<input type="hidden" name="note" value="" id="note-${restaurant.idRestaurant}"/>
  							<img src="img/stars/star_out.gif" id="star_1" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_2" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_3" class="star"/>
  							<img src="img/stars/star_out.gif" id="star_4" class="star"/>
							<img src="img/stars/star_out.gif" id="star_5" class="star"/><br />
							<input type="reset" value="Reset"/>
							<input type="button" id="avis-${restaurant.idRestaurant}" value="Envoyer"/>
						
					</form>
					<ul id="ul-${restaurant.idRestaurant}">
					`
				restaurant.ratings.forEach(rating =>
					/**
					 * Pour chaque note du restaurant actuel, on procède
					 * de la même manière avec un template de note :
					 */
					html +=
					`<li class="listElementNone article-${restaurant.idRestaurant}">${Restaurants.starsHTML(rating.stars)}-${rating.comment}</li>`
					
				);
				html +=
				`   </ul>
				</article>`;
				this.listElement.innerHTML += html;
			
			}else if(Restaurants.starAverage(restaurant.ratings) < starMin){
				html = `<article id="${restaurant.idRestaurant}" class="article">

						</article`;
				this.listElement.innerHTML += html;
			}	
		});	
	}
	
	static addNewRestaurant(latLng){
		let list = this.listElement.getElementsByClassName('article');
		let html = '';
		let idNewRestaurant = list.length;
		console.log(latLng);
		let lat = latLng.d;
		let lng = latLng.e;
		let name = prompt("Quel est le nom du restaurant ?");
		let address = prompt("Renseigner l'adresse ?");
		let description = prompt("Renseigner description ?");
		let stars = parseInt(prompt("Noter le restaurant de 1 à 5 ?"));
		let comment = prompt("Ajouter un commentaire ?");
		let ratings = [
			{
			'stars' : stars,
			'comment' : comment
			},
		]
		html = `article id="${idNewRestaurant}" class="article">
				<h5 class="H5">${name}</h5>
					${Restaurants.starsHTML(Restaurants.starAverage(ratings))}
					<p>${address}</p>
					<img class="article-img"
						id="img-${idNewRestaurant}"
						src="https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=456x456&key=AIzaSyBrzBRzqgXlseZlfmV4R_gxiL1fgKF84Ws"
						alt="image street view" />
					<p>${description}</p>
					<p>
						Lat : <span id="lat-${idNewRestaurant}">${lat}</span>
						Lng : <span id="lng-${idNewRestaurant}">${lng}</span>
					</p>
					<form id="formAvis-${idNewRestaurant}" class="formElementNone form-avis">
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
					
						<li class="listElementNone article-${idNewRestaurant}">${Restaurants.starsHTML(stars)}-${comment}</li>
					
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