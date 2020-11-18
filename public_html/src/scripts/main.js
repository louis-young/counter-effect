/**
 *
 *  Counter Library.
 *
 * @author Louis Young
 *
 */

/**
 * Data object to store configuration etc.
 *
 */

const data = {
  config: {
    min: 0,
    max: 100,
    speed: 100,
    increment: 1,
    delay: 0
  },
  attributes: {
    min: "data-counter-min",
    max: "data-counter-max",
    speed: "data-counter-speed",
    increment: "data-counter-increment",
    delay: "data-counter-delay"
  }
};

/**
 * Screen class.
 *
 * Update the element to display the value passed in to the function.
 */

class Screen {
  /**
   * Render function.
   *
   * @param value
   */

  render(value) {
    this.element.innerHTML = value;
  }
}

/**
 * Counter class.
 *
 * @extends Screen
 */

class Counter extends Screen {
  /**
   *
   * Class constructor with these possible parameters;
   *
   * @param selector
   * @param min
   * @param max
   * @param increment
   * @param speed
   * @param delay
   */

  constructor(selector, min, max, speed, increment, delay) {
    super();
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.min =
      parseInt(this.element.getAttribute(data.attributes.min)) ||
      data.config.min;
    this.max =
      parseInt(this.element.getAttribute(data.attributes.max)) ||
      data.config.max;
    this.speed =
      parseInt(this.element.getAttribute(data.attributes.speed)) ||
      data.config.speed;
    this.increment =
      parseInt(this.element.getAttribute(data.attributes.increment)) ||
      data.config.increment;
    this.delay =
      parseInt(this.element.getAttribute(data.attributes.delay)) ||
      data.config.delay;
    this.current = this.min;
    this.interval;
    this.initialize();
  }

  /**
   * Die function.
   *
   * Clear the current interval.
   */

  die() {
    clearTimeout(this.interval);
    return;
  }

  /**
   * Count function.
   *
   * Increment the counter.
   */

  count() {
    if (this.current < this.max) {
      this.current += this.increment;
      this.render(this.current);
    } else if (this.current > this.max) {
      this.render(this.max);
      this.die();
    }
  }

  /**
   * Initialize function.
   *
   * Start the counter incrementing and render the starting value.
   */

  initialize() {
    if (this.delay > 0) {
      setTimeout(() => {
        this.interval = setInterval(this.count.bind(this), this.speed);
      }, this.delay);
    } else {
      this.interval = setInterval(this.count.bind(this), this.speed);
    }
    this.render(this.min);
  }
}

// Instantiate the Counter class...
const counter = new Counter(".clients");
const counter2 = new Counter(".years");
