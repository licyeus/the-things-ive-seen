/**
 * Created by rineharj on 3/11/15.
 */
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.upvote = function (cb) {
    this.upvotes += 1;
    this.save(cb);
};

PostSchema.methods.downvote = function (cb) {
    if(this.upvotes > 0) { this.upvotes -= 1; }
    this.save(cb);
};

mongoose.model('Post', PostSchema);