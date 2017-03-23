'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Shoppinglist Schema
 */
var ShoppinglistSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Shoppinglist name',
    trim: true
  },
  color: {
    type: String,
    default: '',
    required: 'Please enter a color',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date
    // default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // content: {
  //   type: String,
  //   default: ''
  // },
  contents: {
    type: [],
    default: [],
    // required: 'Please enter content'
  }
  // priority: {
  //   type: String,
  //   default: '',
  //   // required: 'Please select a priority',
  //   trim: true
  // },
  // ischecked: {
  //   type: Boolean,
  //   default: false
  // }
});

ShoppinglistSchema.pre('save', function(next){
  var now = new Date();
  this.modified = now;
  if (this.created !== now) {
    this.created = now;
  }
  next();
});

mongoose.model('Shoppinglist', ShoppinglistSchema);
