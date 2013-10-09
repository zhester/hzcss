<?php

require dirname( dirname( __DIR__ ) ) . '/hzphp/tools/loader.php';

header( 'Content-Type: text/css' );

if( isset( $_GET[ 'id' ] ) == true ) {

    if( $_GET[ 'id' ] == 'ui' ) {
        if( isset( $_GET[ 'size' ] ) == true ) {
            $config = [ 'size' => intval( $_GET[ 'size' ] ) ];
        }
        else {
            $config = [ 'size' => 16 ];
        }
        echo hzphp\Icon\Tools::getCSS( 'Iconic', $config );
    }

}
else {
    echo '/* generated CSS error: unspecified ruleset id */';
}

?>