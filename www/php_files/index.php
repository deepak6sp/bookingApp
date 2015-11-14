<?php
/** 
 * Google Showtime grabber 
 *  
 * This file will grab the last showtimes of theatres nearby your zipcode. 
 * Please make the URL your own! You can also add parameters to this URL:  
 * &date=0|1|2|3 => today|1 day|2 days|etc..  
 *  
 * Please download the latest version of simple_html_dom.php on sourceForge: 
 * http://sourceforge.net/projects/simplehtmldom/files/ 
 *  
 * @author Bas van Dorst <info@basvandorst.nl> 
 * @version 0.1  
 * @package ShowtimeAPI 
 */ 


// highlight this file 
//highlight_file(__FILE__);print '<hr>'; 
//echo $_POST["selected_place_name"];
$data = array();
$_POST = json_decode(file_get_contents('php://input'), true);
//echo "place name is ".$_POST["selected_place_name"];

require_once('simple_html_dom.php'); 

$html = new simple_html_dom();
$html->load_file("http://www.google.com.au/movies?near=".$_POST["selected_place_name"]."&start=0");


foreach($html->find('#movie_results .theater') as $div) {
  	$data[] = $div->find('h2 a',0)->innertext;
  	$data[] = $div->find('.info',0)->innertext;
  	//address = array_push($data,$div->find('.info',0)->innertext);
  	//array_push($data,$div->find('h2 a',0)->innertext); 
  	array_push($response,$data);
}
echo json_encode($response);
/*
print '<pre>'; 
foreach($html->find('#movie_results .theater') as $div) { 

    print "Theate:  ".$div->find('h2 a',0)->innertext."\n"; 
    print "Address: ". $div->find('.info',0)->innertext."\n"; 

 
    foreach($div->find('.movie') as $movie) { 
        print "\tMovie:    ".$movie->find('.name a',0)->innertext.'<br />'; 
        print "\tTime:    ".$movie->find('.times',0)->innertext.'<br />'; 
    } 
    print "\n\n"; 
} 
         
$html->clear(); 
*/


?>