# rolly-scrolly

> Turn a scrollable area of a web page into a timeline of events with a simple API

## Description

rolly-scrolly provides a single function, `rollyScrolly`, which takes an object of configuration options as its only argument.

## Features

* Minimal dependency on jQuery (selector syntax, `.height()`, `.scrollTop()`, `.resize()`)
* divides a scrollable area into a series of discrete `frames`, to which you can bind events
* supports frame-specific events and a stack of functions which can be executed for every frame
* guarantees execution of intermediary frame events at any scroll speed
* tolerates scrollable element resizes

## Usage

```
// declare an object with numeric keys, and objects as values
/*
	these objects must contain two attributes:
		'func': a function literal or function reference
		'label': a description of the function (for debugging purposes)

	The provided function takes two arguments:
		'state': an object representing the current state of the scroller
		'index': the order in which your event is being executed (relative to the stack)

*/

var events={
	0:{ 
		func: function(state,index){
			console.log("This is the first frame!");
		},
		label:'first frame'
	},
	50:{
		func: function(state,index){
			console.log("Keep going!");

		},
		label:'halfway done'
	},
	99:{
		func: function(state,index){
			console.log("You're done!");
		},
		label:'last frame'
	}
};

/*
	The events in the scrollstack are executed one after another.
	They are guaranteed to fire for every frame you scroll through.
	Stacked events only fire when the current frame changes to a new frame.
	Stacked events follow the same format as indexed events.
*/

var scrollStack=[
	{
		func:function(state,index){
			console.log(state);
		},
		label:'to be executed for once for every frame'
	},
	{
		func: someFunctionReference,
		label: 'your predefined function'
	}
];

var rollyScrolled=rollyScrolly({
	container:'body',
	frames:100,
	events:events,
	stack:scrollStack
});

```

## Credits

Written by [Williams New York](http://williamsnewyork.com

### Authors 

* [Aaron MacSween](https://github.com/ansuz)

## LICENSE

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

