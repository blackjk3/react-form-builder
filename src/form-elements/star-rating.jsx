import React from 'react';
import PropTypes from 'prop-types';
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

    // Pre-bind methods to avoid creating new functions on each render
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // Create refs properly
    this.rootNode = React.createRef();
    this.ratingContainerNode = React.createRef();

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

  componentDidMount() {
    // Initialize with proper values from props
    if (this.props.rating) {
      this.setState({
        pos: this.getStarRatingPosition(this.props.rating),
        rating: this.props.rating,
      });
    }
  }

  // REMOVED componentWillUnmount as it wasn't doing anything useful

  getPosition(e) {
    if (!this.rootNode.current) return 0;
    return e.pageX - this.rootNode.current.getBoundingClientRect().left;
  }

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  getDecimalPlaces(num) {
    const match = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match
      ? 0
      : Math.max(
          0,
          (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
        );
  }

  getWidthFromValue(val) {
    if (val === null || val === undefined || typeof val !== 'number') return 0;

    const { min } = this;
    const { max } = this;

    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return ((val - min) / (max - min)) * 100;
  }

  getValueFromPosition(pos) {
    if (!this.ratingContainerNode.current) return 0;

    const precision = this.getDecimalPlaces(this.props.step);
    const maxWidth = this.ratingContainerNode.current.offsetWidth;
    if (!maxWidth) return 0;

    const diff = this.max - this.min;
    let factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    let val = this.applyPrecision(
      parseFloat(this.min + factor * this.props.step),
      precision
    );
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  calculate(pos) {
    const val = this.getValueFromPosition(pos);
    const width = `${this.getWidthFromValue(val)}%`;
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
      <svg
        className="react-star-rating__star"
        viewBox="0 0 286 272"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <polygon
            id="star-flat"
            points="143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 "
          ></polygon>
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
    // Only process if editing is enabled
    if (!this.props.disabled && (this.state.editing || this.props.editing)) {
      // get hover position
      const ratingEvent = this.getRatingEvent(e);
      this.setState({
        pos: ratingEvent.width,
        rating: ratingEvent.val,
      });
    }
  }

  // REMOVED updateRating method which was causing issues

  // Fixed shouldComponentUpdate to prevent infinite loops
  shouldComponentUpdate(nextProps, nextState) {
    // Don't trigger a state update from this method!
    if (nextProps.rating !== this.props.rating) {
      return true;
    }

    return (
      nextState.ratingCache.rating !== this.state.ratingCache.rating ||
      nextState.rating !== this.state.rating ||
      nextState.pos !== this.state.pos
    );
  }

  // Handle rating changes in componentDidUpdate instead
  componentDidUpdate(prevProps) {
    // Only update if the rating prop changed
    if (
      prevProps.rating !== this.props.rating &&
      this.props.rating !== this.state.rating
    ) {
      // Update state without causing an infinite loop
      this.setState({
        pos: this.getStarRatingPosition(this.props.rating),
        rating: this.props.rating,
        ratingCache: {
          pos: this.getStarRatingPosition(this.props.rating),
          rating: this.props.rating,
        },
      });
    }
  }

  handleClick(e) {
    // is it disabled?
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    // Get the current rating based on click position
    const ratingEvent = this.getRatingEvent(e);

    const ratingCache = {
      pos: ratingEvent.width,
      rating: ratingEvent.val,
      caption: this.props.caption,
      name: this.props.name,
    };

    // Update the state with new values
    this.setState({
      ratingCache,
      pos: ratingEvent.width,
      rating: ratingEvent.val,
    });

    // Call the callback with the new rating
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
    const classes = cx({
      'react-star-rating__root': true,
      'rating-disabled': this.props.disabled,
      [`react-star-rating__size--${this.props.size}`]: this.props.size,
      'rating-editing': this.state.editing,
    });

    // are we editing this rating?
    let starRating;
    const isEditable =
      !this.props.disabled && (this.state.editing || this.props.editing);

    if (isEditable) {
      starRating = (
        <div
          ref={this.ratingContainerNode}
          className="rating-container rating-gly-star"
          data-content={this.state.glyph}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          <div
            className="rating-stars"
            data-content={this.state.glyph}
            style={{ width: this.state.pos }}
          ></div>
        </div>
      );
    } else {
      starRating = (
        <div
          ref={this.ratingContainerNode}
          className="rating-container rating-gly-star"
          data-content={this.state.glyph}
        >
          <div
            className="rating-stars"
            data-content={this.state.glyph}
            style={{ width: this.state.pos }}
          ></div>
        </div>
      );
    }

    return (
      <span className="react-star-rating">
        <span
          ref={this.rootNode}
          style={{ cursor: isEditable ? 'pointer' : 'default' }}
          className={classes}
        >
          {starRating}
          <input
            type="hidden"
            name={this.props.name}
            value={this.state.rating || 0}
            style={{ display: 'none !important', width: 65 }}
            min={this.min}
            max={this.max}
            readOnly
          />
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
