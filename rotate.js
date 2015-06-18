(function() {

	var rotateUrls = function(sites) {

		var iframes = {};

		function _getTime() {
			var date = new Date();
			return {
				hours: date.getHours(),
				mins: date.getMinutes()
			}
		}

		function _parseTime(time) {
			return {
				hours: time.split(":")[0],
				mins: time.split(":")[1]
			}
		}

		function _addStyles() {
			var css = 'iframe.RotateUrl { transition: opacity 1s ease; }'
				css += 'html, body {width: 100%; height: 100%}';
			
			var styleElem = document.createElement('style');
			styleElem.type = 'text/css';
			styleElem.appendChild(document.createTextNode(css));
		
			document.head.appendChild(styleElem);
		}

		function _afterOrEqual(time1, time2) {
			return (time1.hours >= time2.hours && time1.mins >= time2.mins);
		}

		function _getCurrentSite() {
			var currentTime = _getTime();
			var currentSite = null;

			sites.forEach(function(site, index) {
				var time = _parseTime(site.start);
				if (_afterOrEqual(currentTime, time)) {
					currentSite = site;
				}
			});

			return currentSite;
		}

		function _initFrames() {

			sites.forEach(function(site, index) {
				var frame = document.createElement("iframe");
				frame.className = "RotateUrl";
				iframes[site.url] = frame;

				frame.src = site.url;
				frame.width = "100%;";
				frame.height = "100%";
				frame.style.cssText = "position:absolute;top:0;left:0;";

				document.body.appendChild(frame);
			});
		}

		function _showCurrentSite() {
			var currentSite = _getCurrentSite();

			if (!currentSite) {
				throw new Error("No current site found");
			}

			console.log(currentSite)

			sites.forEach(function(site, index) {
				var iframe = iframes[site.url];
				iframe.style.opacity = (site.url === currentSite.url) ? "1" : "0";
			});
		};

		function _startTimer() {
			_showCurrentSite();
			window.setInterval(_showCurrentSite, 30000);
		}

		_addStyles();
		_initFrames();
		_startTimer();
	};

	window.rotateUrls = rotateUrls;

})();