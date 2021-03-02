let mongoose =require("../node_modules/mongoose");
let Schema = mongoose.Schema;

const calendarModel = new Schema({
    dte_event: {type:Date},
    type_event: { type:String, enum : ["Fete","Evenement"] },
    title_event  : { type :String},
    comment_event :{type:String}
});

module.exports = mongoose.model('rdv',calendarModel);
