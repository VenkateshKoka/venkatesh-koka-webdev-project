/**
 * Created by venkateshkoka on 6/21/17.
 */

var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    recipeId : String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _createdUser: String,
    name: String,
    totalTimeInSeconds :{type:Number, default:0},
    imageURL :String,
    preparation:String,
    ingredientLines : [{type : String}],
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:"ProjectCommentModel"}],
    //reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "GraduatePageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project_webdev_recipe'});

module.exports = recipeSchema;

// attributes
// course (array)
// cuisine (array)

// flavors (an array of 6)

/*
* Object {yield: null, nutritionEstimates: Array(89), totalTime: "55 min", images: Array(1), name: "Indian Butter Chicken with Basmati Rice"…}
 attributes :
    course : Array(1)
    cuisine: Array(2)

 flavors : Object
    Bitter : 0.1667
    Meaty : 0.1667
    Piquant : 0.6667
     Salty : 0.5
     Sour:0.3333
     Sweet: 0.1667

 id : "Indian-Butter-Chicken-with-Basmati-Rice-1613403"

 images :
        hostedLargeUrl : "https://lh3.googleusercontent.com/2teHUYh2fCPxCMhMJp_uU5tCbPJhxQSf0fEqX3Sv54tHmRHH9Z7nwvjub2krD-OcDXbHzuC1kTXscgvLqnzwQA=s360"
        hostedMediumUrl : "https://lh3.googleusercontent.com/2teHUYh2fCPxCMhMJp_uU5tCbPJhxQSf0fEqX3Sv54tHmRHH9Z7nwvjub2krD-OcDXbHzuC1kTXscgvLqnzwQA=s180"
        hostedSmallUrl : "https://lh3.googleusercontent.com/2teHUYh2fCPxCMhMJp_uU5tCbPJhxQSf0fEqX3Sv54tHmRHH9Z7nwvjub2krD-OcDXbHzuC1kTXscgvLqnzwQA=s90"
         imageUrlsBySize :
            90 : "https://lh3.googleusercontent.com/RjOQLMYRmJkG2mx5XhiD5sVyw23RiqkjcRkO5BabiVeY9InnS2OWObbJwTJERJsNpoHLyNoDW4yABfVI85aGjw=s90-c"
            360 : "https://lh3.googleusercontent.com/RjOQLMYRmJkG2mx5XhiD5sVyw23RiqkjcRkO5BabiVeY9InnS2OWObbJwTJERJsNpoHLyNoDW4yABfVI85aGjw=s360-c"

 ingredientLines : Array(20)
      0 : "1 onion (1/2 lb.), peeled and chopped"
      1 : "2 tablespoons fresh ginger, finely chopped"
      2 : "2 cloves garlic, minced"

 name : "Indian Butter Chicken with Basmati Rice"
 numberOfServings : 4
* */