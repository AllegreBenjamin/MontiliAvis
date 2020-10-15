// JavaScript Document

displayRestaurants(restaurants){
		
		var divListRestaurants =  document.getElementById("list");
		var articleRestaurant = document.createElement("article");
		var h5 = document.createElement('h5');
		var p_address = document.createElement('p');
		var p_description = document.createElement('p');
		var p_latLng = document.createElement('p');
		var list_ratings = document.createElement('ul');
		
		h5.textContent = restaurants.restaurantName;
		p_address.textContent = restaurants.address;
		p_description.textContent = restaurants.description;
		p_latLng.textContent = "Lat : " + restaurants.lat + " - Lng : " + restaurants.lng;
		
		var ratings = restaurants.ratings;
		
		for(var j=0; j < ratings.length; j++){
			var listElement = document.createElement('li');
			listElement.textContent ="Stars : " + ratings[j].stars + " - Comment : " + ratings[j].comment; 
			listElement.addClass = "listElement";
			console.log(listElement);
			list_ratings.appendChild(listElement);
		}
		
		
		
		
		
		articleRestaurant.appendChild(h5);
		articleRestaurant.appendChild(p_address);
		articleRestaurant.appendChild(p_description);
		articleRestaurant.appendChild(p_latLng);
		articleRestaurant.appendChild(list_ratings);
		
		divListRestaurants.appendChild(articleRestaurant);
		
	}
	