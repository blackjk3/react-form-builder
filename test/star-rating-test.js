require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

import StarRating from 'react-star-rating';

describe('Testing StarRating', function() {

  jsdom({ skipWindowCheck: true });

  it('should be able to set the amount of stars based on a rating', function() {
    var starRating = TestUtils.renderIntoDocument(
      <StarRating rating={2.5} name="star-test" />
    );
    var element = React.findDOMNode(starRating);
    var starDiv = element.querySelector('.rating-stars');
    var input = element.querySelector('input');
    
    assert.equal(starDiv.style.width, '50%');
    assert.equal(input.value, '2.5');
  });

  it('should be able to set default amount of stars to 0', function() {
    var starRating = TestUtils.renderIntoDocument(
      <StarRating name="star-test" />
    );
    var element = React.findDOMNode(starRating);
    var starDiv = element.querySelector('.rating-stars');
    
    assert.equal(starDiv.style.width, '0px');
  });
});