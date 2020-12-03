class Restaurants {
	/**
	 * 
	 * @param {*} idRestaurant 
	 * @param {*} name 
	 * @param {*} address 
	 * @param {*} description 
	 * @param {*} lat 
	 * @param {*} lng 
	 * @param {*} ratings 
	 */
	constructor(idRestaurant, name, address, description, lat, lng, ratings){
		this.idRestaurant = idRestaurant;
		this.name = name;
		this.address = address;
		this.description = description;
		this.lat = lat;
		this.lng = lng;
		this.ratings = ratings
	}
	
	static get listElement(){
		/**
		 *  renvoi l'élément du DOM
		 * qui correspond à ta liste de restaurant et qui servira dans les autres méthodes
		 * de cette class. 
		 **/
		return document.getElementById("list");
	}
	
	static clearListRestaurants() {
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

	/**
	* @displayRestaurants - Afficher les restaurants 
	* @param {Object} Restaurant
	* @param {number} starAverage
	*/
	static displayRestaurants(restaurants, starMin){
		
		 // 'restaurants' est un array de restaurant et pas une seule instance.
		Restaurants.clearList();
		 // On efface la liste.
		 let html = '';

		 // On initialise la variable sous la forme d'une string
		 restaurants.forEach(restaurant => {
			 /**
			  * On ajoute le début du template d'un article en remplaçant ton usage de 'this'
			  * par 'restaurant' (moi je prefère cette synthaxe
			  */
			if(Restaurants.starAverage(restaurant.ratings) >= starMin){
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
					<ul id="ul-${restaurant.idRestaurant}">`;
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
			
			}	
		});	
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
        return `<img src="img/stars/${roundedStars}-stars-gold.png" alt="${roundedStars}-stars-gold.png" />`;
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