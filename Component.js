sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	'sap/m/Dialog',
	'sap/m/Text'
], function(Component, Button, Dialog, Text) {

	return Component.extend("com.kpit.FLPReload.Component", {

		init: function() {
			window.idleTime = 0;
			//Zero the idle timer on mouse movement.
		    $(this).mousemove(function (e) {
		        window.idleTime = 0;
		    });
		    $(this).keypress(function (e) {
		        window.idleTime = 0;
		    });
		    document.onclick = function() {
			    window.idleTime = 0;
			};
			document.onmousemove = function() {
			    window.idleTime = 0;
			};
			document.onkeypress = function() {
			    window.idleTime = 0;
			};
		    var idleInterval = setInterval(this._timerIncrement, 60000); // increment the time count every 1 minute
		},

		_timerIncrement: function() {
			window.idleTime = window.idleTime + 1;
			if(window.idleTime === 2) {
				var dialog = new Dialog({
					title: 'Warning',
					type: 'Message',
					state: 'Warning',
						content: new Text({
							text: 'Your session has been idle for a while. \nPlease press the OK button to continue working.'
						}),
					beginButton: new Button({
						text: 'OK',
						press: function () {
							dialog.close();
							window.location.reload(true);
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
			dialog.open();
			}
		}
	});
});