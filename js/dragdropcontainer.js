function DragDrop(props){

    var container = document.getElementById(props && props['container_id'] || 'container');
    var self = this;

    this.run = function(){

        Object.defineProperty(self, 'active', {
            value: true,
            writable: true,
            enumerable: true,
            configurable: true
        });

        container.onmousedown = function(e) {

            if(!self.active){
                return;
            }

            var coords = getCoords(container);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            container.style.position = 'absolute';
            document.body.appendChild(container);
            moveAt(e);

            container.style.zIndex = 999999;

            function moveAt(e) {
                container.style.left = e.pageX - shiftX + 'px';
                container.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            container.onmouseup = function() {
                document.onmousemove = null;
                container.onmouseup = null;
            };

        }

        container.ondragstart = function() {
            return false;
        };
        function getCoords(elem) {

            var box = elem.getBoundingClientRect();

            var body = document.body;
            var docEl = document.documentElement;

            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var top = box.top + scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            return {
                top: top,
                left: left
            };
        }
    }
}


