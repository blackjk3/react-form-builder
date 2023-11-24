import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   ratingAmount={number} - the rating amount (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

export default class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.min = 0;
    this.max = props.ratingAmount || 5;

    const ratingVal = props.rating;
    const ratingCache = {
      pos: ratingVal ? this.getStarRatingPosition(ratingVal) : 0,
      rating: props.rating,
    };

    this.state = {
      ratingCache,
      editing: props.editing || !props.rating,
      stars: 5,
      rating: ratingCache.rating,
      pos: ratingCache.pos,
      glyph: this.getStars(),
    };
  }

  /**
   * Gets the stars based on ratingAmount
   * @return {string} stars
   */
  getStars() {
    let stars = '';
    const numRating = this.props.ratingAmount;
    for (let i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  }

  // componentWillMount() {
  //   this.min = 0;
  //   this.max = this.props.ratingAmount || 5;
  //   if (this.props.rating) {
  //     this.state.editing = this.props.editing || false;
  //     const ratingVal = this.props.rating;
  //     this.state.ratingCache.pos = this.getStarRatingPosition(ratingVal);
  //     this.state.ratingCache.rating = ratingVal;

  //     this.setState({
  //       ratingCache: this.state.ratingCache,
  //       rating: ratingVal,
  //       pos: this.getStarRatingPosition(ratingVal),
  //     });
  //   }
  // }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this.rootNode);
    this.ratingContainer = ReactDOM.findDOMNode(this.node);
  }

  componentWillUnmount() {
    delete this.root;
    delete this.ratingContainer;
  }

  getPosition(e) {
    return e.pageX - this.root.getBoundingClientRect().left;
  }

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  getDecimalPlaces(num) {
    const match = (`${num}`).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  getWidthFromValue(val) {
    const min = this.min;
    const max = this.max;

    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return (val / (max - min)) * 100;
  }

  getValueFromPosition(pos) {
    const precision = this.getDecimalPlaces(this.props.step);
    const maxWidth = this.ratingContainer.offsetWidth;
    const diff = this.max - this.min;
    let factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    let val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  calculate(pos) {
    const val = this.getValueFromPosition(pos);
    let width = this.getWidthFromValue(val);

    width += '%';
    return { width, val };
  }

  getStarRatingPosition(val) {
    const width = `${this.getWidthFromValue(val)}%`;
    return width;
  }

  getRatingEvent(e) {
    const pos = this.getPosition(e);
    return this.calculate(pos);
  }

  getSvg() {
    return (
      <svg className="react-star-rating__star" viewBox="0 0 286 272" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="star-flat" points="143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 "></polygon>
        </g>
      </svg>
    );
  }

  handleMouseLeave() {
    this.setState({
      pos: this.state.ratingCache.pos,
      rating: this.state.ratingCache.rating,
    });
  }

  handleMouseMove(e) {
    // get hover position
    const ratingEvent = this.getRatingEvent(e);
    this.updateRating(
      ratingEvent.width,
      ratingEvent.val,
    );
  }

  updateRating(width, val) {
    this.setState({
      pos: width,
      rating: val,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.updateRating(
        this.getStarRatingPosition(nextProps.rating),
        nextProps.rating,
      );
      return true;
    }
    return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
  }

  handleClick(e) {
    // is it disabled?
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    const ratingCache = {
      pos: this.state.pos,
      rating: this.state.rating,
      caption: this.props.caption,
      name: this.props.name,
    };

    this.setState({
      ratingCache,
    });

    this.props.onRatingClick(e, ratingCache);
    return true;
  }

  treatName(title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_');
    }
    return null;
  }

  render() {
    // let caption = null;
    const classes = cx({
      'react-star-rating__root': true,
      'rating-disabled': this.props.disabled,
      [`react-star-rating__size--${this.props.size}`]: this.props.size,
      'rating-editing': this.state.editing,
    });

    // is there a caption?
    // if (this.props.caption) {
    //   caption = (<span className="react-rating-caption">{this.props.caption}</span>);
    // }

    // are we editing this rating?
    let starRating;
    if (this.state.editing) {
      starRating = (
        <div ref={c => this.node = c}
          className="rating-container rating-gly-star"
          data-content={this.state.glyph}
          onMouseMove={this.handleMouseMove.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
          onClick={this.handleClick.bind(this)}>
          <div className="rating-stars" data-content={this.state.glyph} style={{ width: this.state.pos }}></div>
        </div>
      );
    } else {
      starRating = (
        <div ref={c => this.node = c} className="rating-container rating-gly-star" data-content={this.state.glyph}>
          <div className="rating-stars" data-content={this.state.glyph} style={{ width: this.state.pos }}></div>
        </div>
      );
    }

    return (
      <span className="react-star-rating">
        <span ref={c => this.rootNode = c} style={{ cursor: 'pointer' }} className={classes}>
          {starRating}
          <input type="hidden" name={this.props.name} value={this.state.ratingCache.rating} style={{ display: 'none !important' }} min={this.min} max={this.max} readOnly style={{
            width: 65,
          }}/>
        </span>
      </span>
    );
  }
}

StarRating.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string,
  ratingAmount: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onRatingClick: PropTypes.func,
  disabled: PropTypes.bool,
  editing: PropTypes.bool,
  size: PropTypes.string,
};

StarRating.defaultProps = {
  step: 0.5,
  ratingAmount: 5,
  onRatingClick() {},
  disabled: false,
};
