const $ = require('jquery');

module.exports = {

    bindEvents: function(events) {
        if (!this._bEvents) {
            this._bEvents = [];
        }

        for (var i=0,evt; evt=events[i]; i++) {
            if (evt.length < 2 || !evt[0] || !evt[1] || !evt[2]) {
                continue;
            }

            var eventObject = {
                bound: evt[2].bind(this),
                evt: evt
            };

            if (typeof evt[0] === 'string') {
                this.$ && this.$(evt[0]).on(evt[1], eventObject.bound);
            } else {
                evt[0].on(evt[1], eventObject.bound);
            }

            this._bEvents.push(eventObject);
        }
    },

    unbindEvents: function() {
        while(this._bEvents && this._bEvents.length){
            var eventObject = this._bEvents[this._bEvents.length-1],
                evt = eventObject.evt;

            if (evt) {
                if (typeof evt[0] === "string") {
                    this.$ && this.$(evt[0]).off(evt[1], eventObject.bound);
                } else {
                    evt[0].off(evt[1], eventObject.bound);
                }
            }

            this._bEvents.pop();
        }

        this._bEvents = null;
    }

};
