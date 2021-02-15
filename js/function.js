let map, infoWindow, latitude, longitude;
let restaurants= [], restaurantsPlaces = [], restaurantsPlacesGetDetail = [], markerRestaurantAll = [], markerRestaurantZoom = [];
let starMin = 0;
let montelimar = {lat: 44.557939, lng: 4.750318};
const POS = {};

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
		
	function nearbySearch(POS){
		let placesServiceRequest = {
			location: POS,
			radius: '250',
			type: ['restaurant']
		};

		let service = new google.maps.places.PlacesService(map);
		service.nearbySearch(placesServiceRequest, callbackNearbySearch);
	}

	// gere le filtre
	// appelé quand on a tous les restaurants (fin de l'appel récursif)
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
				var divStars = listRestaurants[x].getElementsByClassName('starsImg');
				var input = divStars[0].getElementsByClassName('moyenne')
				console.log(input[0].value)
				if(starMin.value > input[0].value){
					// afficher le restaurant de la	liste
					console.log(listRestaurants[x])
					listRestaurants[x].classList.add('elementNone')		
				
				}else{
					listRestaurants[x].classList.remove('elementNone')
					latitude = document.getElementById('lat-'+x).innerHTML;
					longitude = document.getElementById('lng-'+x).innerHTML;
					addMarker(parseFloat(latitude), parseFloat(longitude));
				}
		
			}
			
		})
	}
	
	function getDetailRecursive(array) {

		if (!array[0]) {
			console.log('fin appel recursif');
			handleSearchForm()
			return 0
		}
		let element = array.shift()
	
		let getDetailsRequest = {
			placeId: element.placeId,
			fields: ['place_id', 'formatted_phone_number', 'opening_hours', 'photos', 'website', 'price_level', 'reviews']
		}
		let serviceII = new google.maps.places.PlacesService(map);
		serviceII.getDetails(getDetailsRequest, (place, status) => {
			
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				// TODO: ajouter le resto au DOM
				console.log(place)
				// Appel récursif
				window.setTimeout(() => {
					
					// Ajout nouveau restaurant
					let newRestaurant = new Restaurants (
						element.idRestaurant,
						element.placeId,
						element.name,
						element.address,
						element.lat,
						element.lng,
						element.userRatingsTotal,
						element.rating,
						place.formatted_phone_number,
			            place.reviews,
						place.photos,
						place.website,
						place.opening_hours,
						place.price_level
					)
					const searchBtn = document.querySelector('#search');
					// Tu récupère le bouton de recherche.
					const starMin = document.querySelector('#starMin');
				
					Restaurants.displayRestaurants(newRestaurant, starMin.value || 0)
			
					Restaurants.addListenerFormAndComment();

					getDetailRecursive(array)

				}, 300)
				
			} else {
				console.log(status);
			}
			
		})
	}
	
	function callbackNearbySearch(placesServiceRequest, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < placesServiceRequest.length; i++) {
				idRestaurantGooglePlace = i;
				arrayRestaurantsPlaces(placesServiceRequest[i], idRestaurantGooglePlace)
			}
		}
		let array = restaurantsPlaces;
		
		getDetailRecursive(array)
		
	}
	
	function arrayRestaurantsPlaces(placesServiceRequest, idRestaurantGooglePlace){

		let restaurantPlace = {
			'idRestaurant' : idRestaurantGooglePlace,
			'placeId' : placesServiceRequest.place_id,
			'name' : placesServiceRequest.name,
			'address' : placesServiceRequest.vicinity,
			'lat': placesServiceRequest.geometry.location.lat(),
			'lng': placesServiceRequest.geometry.location.lng(),
			'userRatingsTotal' : placesServiceRequest.user_ratings_total,
			'rating' : placesServiceRequest.rating

		}
		restaurantsPlaces.push(restaurantPlace)
	}
	

	map.addListener("click", (e) => {
		placeMarkerNewRestaurant(e.latLng, map);
		Restaurants.addNewRestaurant(e.latLng.lat(), e.latLng.lng());
	});
		
}

	function addMarker(lat, lng){
		let marker = new google.maps.Marker({
			position: {lat, lng},
			map,
			icon: 'img/icons/restaurant.png'
		});
		markerRestaurantAll.push(marker);
	}
	
	function addMarkerZoom(lat, lng){
		let marker = new google.maps.Marker({
			position: {lat, lng},
			map,
			icon: 'img/icons/restaurant-zoom.png'
		});
		markerRestaurantZoom.push(marker);
		map.setCenter({lat, lng});
	}
	
	function placeMarkerNewRestaurant(latLng, map){
		let marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: 'img/icons/restaurant-zoom.png'
		});
		markerRestaurantZoom.push(marker);
		map.panTo(latLng);
	}
	
	function deleteMarker(){
		for(i= 0; i < markerRestaurantAll.length; i++){
			markerRestaurantAll[i].setMap(null);
		}
		markerRestaurantAll = [];
	}
	function deleteMarkerZoom(){
		for(i=0; i < markerRestaurantZoom.length; i++){
			markerRestaurantZoom[i].setMap(null);
		}
		markerRestaurantZoom = [];
	}

	function handleLocationError(browserHasGeolocation, infoWindow, POS) {
  		infoWindow.setPosition(POS);
  		infoWindow.setContent(
			browserHasGeolocation
				? "Error: The Geolocation service failed."
				: "Error: Your browser doesn't support geolocation."
  		);
  		infoWindow.open(map);
	}