(function () {
	$.fn.scrollNav = function (options) {
		options = $.extend({ offset: 0 }, options);
		
		var scrollTimer, $window, scrollTop, windowHeight, positions, loaded,
			$menuItems = this, $window = $(window);
		
		$window.load(load);
		$window.scroll(function () {
			if (loaded && !scrollTimer) {
				scrollTimer = setTimeout(function () {
					scrollTimer = null;
					update();
				}, 200);
			}
		});
		
		return this;
		
		function load() {
			positions = [];
			loaded = false;
			
			// Loop through every menu item and add the section their anchor link is pointing to
			$menuItems.each(function () {
				var $a = $(this), $section = $($a.attr('href'));
				//$sections = $sections.add($section);
				positions.push({ top: $section.offset().top + options.offset, $a: $a });
			});
			
			positions.sort(function (a, b) {
				return a.positon - b.position;
			});
			
			loaded = true;
			update();
		}
		
		function update() {
			windowHeight = $window.height();
			scrollTop = $window.scrollTop();
			$menuItems.removeClass('active');
			$.each(positions, function (i) {
				if (scrollTop + windowHeight / 2 >= positions[i].top // Center of window is below section top
				// Last element, or center of window is above next section's top, or this and next section lay on each other
				&& (!positions[i + 1] || scrollTop + windowHeight / 2 < positions[i + 1].top || positions[i].top == positions[i + 1].top)) {
					positions[i].$a.addClass('active');
				}
			});
		}
	};
}());