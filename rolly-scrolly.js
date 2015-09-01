function rollyScrolly(opt){
	/* 
        rollyScrolly tracks what percentage of the screen's real estate you've scrolled through 
        and executes functions for discrete frames of that scrollable area
        see https://github.com/WilliamsNY/rolly-scrolly/blob/master/README.md for instructions on its usage
    */

	var $window=$(window);
	var $container=$(opt.container||'body');

	var state={
		position:0,
		range:$container.height(),
		frames:opt.frames||1000,
		container:$container,
		scrolltop:0,
	};

	var events=opt.events||{};
	var stack=opt.stack||[];

	updateViewportHeight();

	// make sure this is the first function in the stack, so you can focus on actions
	// this updates which 'frame' is active
	// entering a frame triggers an event, if the frame has an event associated
	stack.unshift({
		func:function(state,index){
			var top=state.scrollTop=$window.scrollTop();
			var temp=Math.floor((top/state.range)*state.frames);
			if(state.position !== temp){
				// make sure intermediary events get called...
				(function(){
					if(temp > state.position){
						while(state.position < temp){
							state.position++;
							if(events[state.position]){
								events[state.position].func(state,index);
							}
						}
					}else{
						while(state.position > temp){
							state.position--;
							if(events[state.position]){
								events[state.position].func();
							}
						}
					}
				}());
				state.position=temp;
			}
		},
		label:'calculate position',
	});

	// execute every function within the stack when you scroll
	// functions receive the 'state' object as an argument
	// as well as an integer representing their position in the stack (probably useless)
	$window.scroll(function(){
		stack.forEach(function(item,index){
			item.func(state,index);
		});
	});

	// we're tracking how far we can scroll, so we need to know what amount
	// of the document is visible within the viewport
	$window.resize(updateViewportHeight);

	// purely for side effects
	function updateViewportHeight(){
		state.viewportHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		state.range=$container.height()-state.viewportHeight;
	};

	// objects are passed by reference, so return a reference to anything
	// that you might want to alter after initialization
	return {
		state:state,
		$container:$container,
		events:events,
		stack:stack,
	};
}

