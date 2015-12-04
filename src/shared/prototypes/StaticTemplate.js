
let StaticTemplate = {

    templateString : '',

    /**
     * @type {Object}
     */
    fields : null,

    /**
     * @param {string} templateString
     */
    _make : function(templateString){
        this.templateString = templateString;
        this.fields = {};
    },

    /**
     * @param {string} key
     * @param {*} value
     */
    setField : function(key, value){
        this.fields[key] = value;
    },

    /**
     * @return {string}
     */
    bake : function(){
        let template = this.templateString;

        Object.keys(this.fields).forEach(key => {
            let value = (this.fields[key] && this.fields[key].toString) ? this.fields[key].toString() : this.fields[key];

            template = template.replace(`{{${key}}}`, value);
        });

        return template;
    }

};

export default StaticTemplate;
