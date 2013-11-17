/*****************************************************************************
    Color Scheme Design Interface

    Requires
        ::hzjs/lib/ui_color.js
*****************************************************************************/

function ColorChip( color ) {
    this.color = color;
    this.element = document.createElement( 'span' );
    this.element.className = 'colorchip';
    this.element.appendChild( document.createTextNode( '' ) );
    this.element.style.display = 'inline-block';
    this.element.style.minHeight = '10px';
    this.element.style.minWidth = '10px';
    this.element.style.backgroundColor = this.color.getHex();
}

ColorChip.prototype.update = function() {
    this.element.style.backgroundColor = this.color.getHex();
};


function Schemer() {
    this.element = document.createElement( 'div' );
    this.element.className = 'schemer';
    this.base = new Color( 0.0, 0.0, 1.0 );
    var rgb = this.base.getRGB();
    var hsl = this.base.getHSL();
    this.input = new ColorWidget( this.base );
    var context = this;
    this.input.oninput = function( event ) {
        context.update();
    };
    this.element.appendChild( this.input.element );
    var c_dim = 48;
    var s_dim = 192;
    var div = document.createElement( 'div' );
    div.style.display = 'inline-block';
    div.style.position = 'relative';
    div.style.height = s_dim + 'px';
    div.style.width = s_dim + 'px';
    div.style.border = 'solid 1px red';
    this.wheel = [];
    this.accents = [];
    for( var i = 0; i < 8; ++i ) {
        this.accents[ i ] = new Color( rgb[ 0 ], rgb[ 1 ], rgb[ 2 ] );
        //this.accents[ i ].setHue( Math.abs( hsl[ 0 ] - i / 8 ) );
        this.accents[ i ].setHue( hsl[ 0 ] - i / 8 );
        this.wheel[ i ] = new ColorChip( this.accents[ i ] );
        this.wheel[ i ].element.style.transformOrigin = '50% 96px 0';
        this.wheel[ i ].element.style.transform = 'rotate('
            + ( 360 * i / 8 ) + 'deg)';
        this.wheel[ i ].element.style.top = '0';
        div.appendChild( this.wheel[ i ].element );
    }
    this.element.appendChild( div );
    this.stylesheet = ui.createStyleSheet();
    ui.appendStyles( this.stylesheet, {
        '.colordimensionwidget span:nth-child(3)' : {
            'display' : 'inline-block',
            'margin' : '0 5px 0 0'
        },
        '.colordimensionwidget span:nth-child(3) input' : {
            'border' : 'solid 1px #CCCCCC',
            'border-radius' : '4px 0 0 4px',
            'background-color' : '#F0F0F0',
            'font-weight' : 'bold',
            'font-size' : '90%'
        },
        '.colordimensionwidget span:nth-child(3) input:last-child' : {
            'border-radius' : '0 4px 4px 0'
        },
        '.colorwidget' : {
            'display' : 'inline-block',
            'margin' : '0',
            'padding' : '0.25em 0.5em',
            'border' : 'solid 1px #CCCCCC',
            'border-radius' : '4px'
        },
        '.colorwidget>div:nth-child(2), .colorwidget>div:nth-child(3)' : {
            'display' : 'inline-block'
        },
        '.colorwidget input[type=text]' : {
            'display' : 'inline-block',
            'width' : '8em',
            'margin' : '4px',
            'border' : 'solid 1px #CCCCCC',
            'border-radius' : '2px',
            'text-align' : 'center'
        },
        '.colorwidget div:nth-child(3) input[type=text]' : {
            'width' : '4em'
        },
        '.colorchip' : {
            'position' : 'absolute',
            'top' : 'calc( 50% - ' + ( c_dim / 2 ) + 'px )',
            'left' : 'calc( 50% - ' + ( c_dim / 2 ) + 'px )',
            'width' : c_dim + 'px',
            'height' : c_dim + 'px',
            'border-radius' : ( c_dim / 2 ) + 'px'
        }
    } );
}

Schemer.prototype.update = function() {
    var hsl = this.base.getHSL();
    var hue = hsl[ 0 ];
    for( var i = 0; i < 8; ++i ) {
        hsl[ 0 ] = hue - i / 8;
        Color.prototype.setHSL.apply( this.accents[ i ], hsl );
        this.wheel[ i ].update();
    }
};
