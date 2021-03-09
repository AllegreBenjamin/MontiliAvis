/**
 * @var map {Object} - Variable used in initMap to contain the map object - Variable utilisé dans initMap pour contenir l'objet map
 * @var infoWindow {Object} - Classe InfoWindow
 * @var latitude {string} - Latitude used in nearbySearch (POS) - Latitude utilisée dans nearbySearch(POS)
 * @var longitude {string} - Longitude used in nearbySearch (POS) - Longitude utilisée dans nearbySearch(POS)
 */
let map, infoWindow, latitude, longitude;
/**
 * @var tabInfoBase {array} -
 * @var markerRestaurantAll {array} -
 * @var markerRestaurantZoom {array} -
 */
let tabInfoBase=[], markerRestaurantAll = [], markerRestaurantZoom = [];

/**
 * @var montelimar {Object} - 
 */
let montelimar = {lat: 44.557939, lng: 4.750318};
/**
 * @constant
 * @type {Object} - Used to store the user's current Position - Utilisé pour stock le Position actuel de l'utilisateur
 */
const POS = {};


    	/**
    	 * @function 
    	 * @name initMap - Allows you to initialize the Google map and the corresponding functions
     	*               - Permet d'initialiser la Google map et les fonctions correspondantes
     	*/
	function initMap() {
		// Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
		map = new google.maps.Map(document.getElementById("map"), {
			// Nous plaçons le centre de la carte avec les coordonnées ci-dessus-
			center: new google.maps.LatLng(montelimar),
			// Nous définissons le zoom par défaut
			zoom: 17, 
			// Nous définissons le type de carte (ici carte routière)
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			// Nous activons les options de contrôle de la carte (plan, satellite...)
			mapTypeControl:  true,
			// Nous désactivons la roulette de souris
			scrollwheel: false, 
			mapTypeControlOptions: {
				// Cette option sert à définir comment les options se placent
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
			},
			// Activation des options de navigation dans la carte (zoom...)
			navigationControl: true, 
			navigationControlOptions: {
				// Comment ces options doivent-elles s'afficher
				style: google.maps.NavigationControlStyle.ZOOM_PAN 
			},
			styles : [
				{
					"featureType": "all",
                	"elementType": "labels.icon",
                	"stylers": [
						{
							"visibility": "off"
						}
                	]
				},
			]
		});

		new google.maps.Marker({
				position: montelimar,
				map,
				icon: 'img/icons/panneau-ville-montelimar.png'
		});

		infoWindow = new google.maps.InfoWindow();
		
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						POS.lat = position.coords.latitude,
						POS.lng = position.coords.longitude;
						
						let markerYourPos = new google.maps.Marker({
							position: POS,
							map: map,
							icon: 'img/icons/vous-etes-ici.png'
						});

						map.setCenter(POS);
						nearbySearch(POS);
						
					}
				);
		} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
		}
		/**
		 * @function
		 * @name nearbySearch - Allows to retrieve in a radius of 250 around the user position the restaurant thanks to google.maps.places.PlacesService 
		 * 					  - Permet de récupérer dans un radius de 250 autour de la position utilisateur les restaurant grâce a google.maps.places.PlacesService
		 * @param {*} POS - Contains the user's current position.
		 * 				  - Contiens la position actuelle de l'utilisateur.
		 */
		function nearbySearch(POS){
			let placesServiceRequest = {
				location: POS,
				radius: '250',
				type: ['restaurant']
			};

			let service = new google.maps.places.PlacesService(map);
			service.nearbySearch(placesServiceRequest, callbackNearbySearch);
		}
		
		/**
		 * @function
		 * @name callbackNearbySearch - callback allow to Create the Restaurants object,
		 *  then pass it to the displayRestaurantsBases (restaurantBase) function. Addition
		 *  of event listener on each restaurant with the function addEventListenerListsRestaurants (i)
		 * 							  - callback permettent de Créer l'objet Restaurants,
		 *  puis le passe a la fonction displayRestaurantsBases(restaurantBase). Ajout des
		 *  event listener sur chaque restaurant avec la fonction addEventListenerListsRestaurants(i)
		 * @param {*} placesServiceRequest - Return from nearbySearch contains the basic information of each restaurant found by the API
		 * 								   - Retour de nearbySearch contient les informations de base de chaque restaurant trouver par l'api
		 * @param {*} status - status request
		 * 					 - status requête
		 */
		function callbackNearbySearch(placesServiceRequest, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < placesServiceRequest.length; i++) {
					idRestaurant = i;
					let restaurantBase = new Restaurants (
						idRestaurant,
						placesServiceRequest[i].place_id,
						placesServiceRequest[i].name,
						placesServiceRequest[i].vicinity,
						placesServiceRequest[i].geometry.location.lat(),
						placesServiceRequest[i].geometry.location.lng(),
						placesServiceRequest[i].user_ratings_total,
						placesServiceRequest[i].rating
						
					)
					Restaurants.displayRestaurantsBases(restaurantBase)
					Restaurants.addEventListenerListsRestaurants(i);
				}
			}
		}
			

		map.addListener("click", (e) => {
			placeMarkerNewRestaurant(e.latLng, map);
			Restaurants.addNewRestaurant(e.latLng.lat(), e.latLng.lng());
		});
			
	}
	/**
	 * @function
	 * @name handleSearchForm - Function that filters restaurants according to their star average
	 * 						  - Fonction qui permet de filtre les restaurants en fonction de leur moyenne d'étoile
	 */
	function handleSearchForm() {

		const searchBtn = document.querySelector('.search');
		// Tu récupère le bouton de recherche.
		const starMin = document.querySelector('#starMin');
		
		// Tu récupère le champs de notation minimum.
		searchBtn.addEventListener('click', function handler(event) {
			//restaurants afficher a filtré
			let listRestaurants = document.querySelectorAll('article')
			deleteMarker();
			for(var x = 0; x < listRestaurants.length; x++){
				
				// en fonction de le moyenne dans la listRestaurants si > starMin afficher
				var divStars = listRestaurants[x].getElementsByClassName('inputInfo');
				var input = divStars[0].getElementsByClassName('moyenne')
				console.log(input[0].value)
				if(starMin.value > input[0].value){
					// afficher le restaurant de la	liste
					console.log(listRestaurants[x])
					listRestaurants[x].classList.add('elementNone')		
				
				}else{
					listRestaurants[x].classList.remove('elementNone')
					latitude = divStars[0].getElementsByClassName("lat");
					longitude = divStars[0].getElementsByClassName("lng");
					addMarker(parseFloat(latitude[0].value), parseFloat(longitude[0].value));
				}
		
			}
			
		})
	}

	/**
	 * @function
	 * @name getDetail - function allow you to retrieve and create the restaurant file. Once done we called the opening of the restaurant file.
	 * 			  	   - fonction permettent de récupérer et créer la fiche restaurant. Une fois fait on appelé l'ouverture de la fiche restaurant.
	 * @param {*} placeID - Contains the place_id to do the detail search with the google api
	 * 					  - Contiens le place_id pour faire la recherche de détail avec l'api google
	 * @param {*} tabInfoBase - Table containing basic restaurant information
	 * 						  - Table containing basic restaurant information
	 */
	function getDetail(placeID, tabInfoBase){
		
		let getDetailsRequest = {
			placeId: placeID,
			fields: ['place_id', 'formatted_phone_number', 'opening_hours', 'website', 'price_level', 'reviews']
		}
		let serviceII = new google.maps.places.PlacesService(map);
			serviceII.getDetails(getDetailsRequest, (place, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					let ficheRestaurant = new FicheRestaurant (
						tabInfoBase[0],
						tabInfoBase[3],
						tabInfoBase[1], 
						tabInfoBase[4],
						tabInfoBase[5],
						tabInfoBase[2],
						tabInfoBase[6],
						tabInfoBase[7],
						place.formatted_phone_number,
						place.reviews,
						place.website,
						place.opening_hours,
						place.price_level
						)
				
					ficheRestaurant.openFicheRestaurant(ficheRestaurant)
				}
			})
	}


		/** 
		 * @function
		 * @name handleLocationError - display of the position of the user or the device on the maps
		 * 							 - Affichage de la position de l'utilisateur ou de l'appareil sur les cartes
		 * @param {*} browserHasGeolocation 
		 * @param {*} infoWindow 
		 * @param {*} POS 
		 */
	function handleLocationError(browserHasGeolocation, infoWindow, POS) {
			infoWindow.setPosition(POS);
			infoWindow.setContent(
			browserHasGeolocation
				? "Error: The Geolocation service failed."
				: "Error: Your browser doesn't support geolocation."
			);
			infoWindow.open(map);
	}

		/**
		 * @function
		 * @addMarker - Add a marker in the markerRestaurantAll array and display it on the Google map.
		 *            - Ajouter un marker dans le tableau markerRestaurantAll et l'afficher sur la Google map.
		 * @param {*} lat 
		 * @param {*} lng 
		 */
	function addMarker(lat, lng){
			let marker = new google.maps.Marker({
				position: {lat, lng},
				map,
				icon: 'img/icons/restaurant.png'
			});
			markerRestaurantAll.push(marker);
	}
		
		/**
		 * @function
		 * @addMarkerZoom - Add a zoom marker in the markerRestaurantZoom table and display it on the Google map.
		 *                - Ajouter un marker zoom dans le tableau markerRestaurantZoom et l'afficher sur la Google map.
		 * @param {number} lat 
		 * @param {number} lng  
		 */
	function addMarkerZoom(lat, lng){
			let marker = new google.maps.Marker({
				position: {lat, lng},
				map,
				icon: 'img/icons/restaurant-zoom.png'
			});
			markerRestaurantZoom.push(marker);
			map.setCenter({lat, lng});
	}
		
		/**
		 * @function
		 * @placeMarkerNewRestaurant - Allows you to add a new marker in the markerRestaurantAll table and then place it on the Google map.
		 *                           - Permet d'ajouter un nouveau marker dans le tableau markerRestaurantAll puis de le placer sur la carte Google map.
		 * @param {Array} latLng 
		 * @param {*} map 
		 */
	function placeMarkerNewRestaurant(latLng, map){
			let marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: 'img/icons/restaurant.png'
			});
			markerRestaurantAll.push(marker);
			map.panTo(latLng);
	}

		/**
		 * @function
		 * @deleteMarker - Remove zoom markers (corresponds to the markers displayed for each restaurant found.)
		 *               - Supprimer les markers zoom (corresponds aux markers affiché pour chaque restaurant trouver.)
		 * @static
		 */
	function deleteMarker(){
			for(i= 0; i < markerRestaurantAll.length; i++){
				markerRestaurantAll[i].setMap(null);
			}
			markerRestaurantAll = [];
	}

		/**
		 * @function
		 * @deleteMarkerZoom - Remove the zoom marker (corresponds to the marker displayed when the user clicked on a restaurant.)
		 *                   - Supprimer le marker zoom (corresponds au marker affiché quand l'utilisateur a cliqué sur un restaurant.)
		 * @static
		 */
	function deleteMarkerZoom(){
			for(i=0; i < markerRestaurantZoom.length; i++){
				markerRestaurantZoom[i].setMap(null);
			}
			markerRestaurantZoom = [];
	
	}

     