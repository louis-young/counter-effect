# Counter

A lightweight (~1kb) vanilla JavaScript library for counter effects.

## Setup

#### Data Attributes

You can either configure the counter by setting data attributes on the element you want to target or by passing in parameters when you instantiate the counter.

- `data-counter-min`
- `data-counter-max`
- `data-counter-speed`
- `data-counter-interval`
- `data-counter-delay`

See the configuration section for more details.

## Usage

#### JavaScript

Simply instantiate a new instance of the Counter object:

`const counter = new Counter('.counter');`

You can also pass in any configuration options in this order - `selector, min, max, speed, increment, delay`.

`const counter = new Counter('.counter', 1, 100, 2, 50, 1000);`

## Configuration 

### Options

- Minimum value (also the starting value) - `data-counter-min` - Default - `0`
- Maximum value - `data-counter-max` - Default - `100`
- Speed (the speed between each increment of the counter in milliseconds) - `data-counter-speed` - Default - `100`
- Increment (how much the counter will increase by every interval) - `data-counter-interval` - Default - `1`
- Delay (the amount of time in ms before the counter will increment) - `data-counter-delay` - Default - `0`
