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
	
	/**
	* @displayRestaurants - Afficher les restaurants 
	*
	*/
	
	displayRestaurants(restaurant){

			let html = '<article id="' + this.idRestaurant + '" class="article"><h5 class="H5">' + this.name + '</h5><p>' + this.address + '</p>' + '<p>' + this.description + '</p><ul id="ul-' + this.idRestaurant + '">';
              
            for(let rating of this.ratings){
                html += '<li class="listElementNone article-'+this.idRestaurant+' ">' + rating.stars + '-' + rating.comment + '</li>';
            }
              
            html += '</ul></article>';
            document.getElementById("list").innerHTML += html;
	}
	
	
} 