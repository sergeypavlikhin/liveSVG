/**
 Token from https://github.com/yoksel/url-encoder/

 **/
function LiveSVG(props){
    var doc = document;

    var self = this;
    var resCssTar = doc.querySelector('body');
    var initTar = null;
    var dragToggler = null;

    var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;

    this.reload = function (props) {
        resCssTar   = doc.querySelector(props.target) || resCssTar;

        initTar = props.input || doc.querySelector("#input-area");
        dragToggler = props.dragToggler || doc.querySelector('button');
        var dd = new DragDrop;
        dd.run();

        $(dragToggler).on('click', function(){
            dd.active = !dd.active;
        });
        resCssTar.setAttribute( "style", self.print());
    };

    this.print = function () {
        var namespaced = addNameSpace( initTar.value );
        var escaped = encodeSVG( namespaced );
        var resultCss = 'background-image: url("data:image/svg+xml,' + escaped + '");';
        return resultCss;
    };

    this.run = function(){


        self.render();

        self.reload({});
        console.log(initTar);
        initTar.onkeyup = function() {
            resCssTar.setAttribute( "style", self.print());
        };



    };

    this.render = function () {
        var container = document.createElement('DIV');
        $(container).attr('id', 'container');

        var textarea = document.createElement('textarea');
        $(textarea).attr('id', 'input-area');
        $(textarea).attr('disable', 'true');
        $(textarea).html('<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red"/></svg>');

        var button = document.createElement('button');
        $(button).html('Focus');

        $(container).append(textarea).append(button);
        $(resCssTar).prepend(container);
    };

    // Namespace
    //----------------------------------------

    function addNameSpace( data ) {
        if ( data.indexOf( "http://www.w3.org/2000/svg" ) < 0 ) {
            data = data.replace( /<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'" );
        }
        return data;
    }

    // Encoding
    //----------------------------------------

    function encodeSVG( data ) {
        // Use single quotes instead of double to avoid encoding.
        if ( data.indexOf( '"' ) >= 0 ) {
            data = data.replace( /"/g, "'" );
        }

        data = data.replace( />\s{1,}</g, "><" );
        data = data.replace( /\s{2,}/g, " " );

        return data.replace( symbols, escape );
    }
}