import { Make } from 'modules/make.js';


/**
 * @module Card
 */

let Card = {
	title : '',
	content : '',
	tags : null,

	_make : function(){
		this.tags = [];
	},

    clone : function(){
        let newCard = JSON.parse(JSON.stringify(this));
        return Make(newCard, Card).get();
    }
}

export default Card;
