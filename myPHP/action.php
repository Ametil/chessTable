<?php
	$ress = array();
	if(isset($_POST['getChess'])){
		$defaultChessList = glob("../img/chess/*.png");
		foreach($defaultChessList as $clone){
			$babax = explode('/', $clone);
			$ress[] = array("item"=>$babax[3]);
		}
	}

	if(isset($_POST['getArrows'])){
		$defaultArrowList = glob("../img/arrows/*.png");
		foreach($defaultArrowList as $clone){
			$babax = explode('/', $clone);
			$ress[] = array("item"=>$babax[3]);
		}
	}
	
	echo json_encode($ress,256);
?>