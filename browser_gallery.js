javascript:(function() {
  function is_image(u) {
    var t = u.split('.') ;
    var e = t[t.length-1].toLowerCase();
    return {gif:1,jpg:1,jpeg:1,png:1,mng:1}[e] ;
  }
  
  var z = open().document ;
  
  z.write('
    <style type="text/css">
      img.hidden_image{
        display: none
      }
    </style>
  ');

  z.write('<p>Images linked to by ' + encodeURI(location.href) + ':</p><hr>\n');
  
  var h ;
  var seen = [] ;

  for each( var i in document.links ) {
    h = i.href ;
    if( h && is_image(h) && seen.indexOf(h) == -1 ) {
      seen.push(h) ;
      z.write('<img class="hidden_image" src="' + encodeURI(h) + '">\n') ;
    }
  }
  
  z.write('
  <script type="text/javascript">
    window.current_index = 0 ;
    
    function next() {
      if( window.current_index + 1 == document.images.length )
        return ;
      change_image( 1 ) ;
    }

    function prev() {
      if( window.current_index == 0 )
        return ;
      change_image( -1 ) ;
    }

    function change_image( dir ) {
      index = window.current_index ;
      new_index = index + dir ;
      document.images[ index ].className = "hidden_image" ;
      document.images[ new_index ].className = "image" ;
      window.current_index = new_index ;
    }

    document.onclick = function(e) {
      if( e.button == 0 ) 
        next();
      else
        prev();
    } ;

    document.onkeypress = function(e) { 
      if( e.charCode == 32 || e.charCode == 122 )
        next();
      
      if( e.charCode == 120 )
        prev();
    } ;
    </script>
  ');
  z.close() ;
  
  for each( var img in z.images ) {
    if( img.width > window.innerWidth ) {
      img.width = ( window.innerWidth * 0.98 ) ;
    }
    if( img.height > window.innerHeight ) {
      img.height = ( window.innerHeight * 0.98 ) ;
    }
  }
  z.images[0].className = "image" ;
}
)()
