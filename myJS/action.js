$(document).ready(function() {
	var megaSize = 0;
	var saveImgType = "uncolor";
	function resize1000(){
		megaSize = 1000;
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size680');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size304');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').addClass('size1000');

		$('.gameTable').css({'width':'0','height':'0'});
		$('.gameTable').css({'width': '1000px', 'height': '1000px', 'margin':'0 auto'});
	}

	function resize680(){
		megaSize = 680;
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size1000');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size304');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').addClass('size680');

		$('.gameTable').css({'width':'0','height':'0'});
		$('.gameTable').css({'width': '680px', 'height': '680px', 'margin':'0 auto'});
	}

	function resize304(){
		megaSize = 304;
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size1000');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').removeClass('size680');
		$('.cell, .chess, .ches, .legend, .legend>div, .arrow').addClass('size304');

		$('.gameTable').css({'width':'0','height':'0'});
		$('.gameTable').css({'width': '304px', 'height': '304px', 'margin':'0 auto'});
	}

	function resize(){
		switch (megaSize) {
			case 304:
				resize304();
			break;
			case 680:
				resize680();
			break;
			case 1000:
				resize1000();
			break;
		}
	}

	function get_gameTable(){
		var defaultLegend = ["a", "b", "c", "d", "e", "f", "g", "h"];
		var dynamicTable = "";
		var colorFlag = true; 
		for (var i = 10; i >= 1; i--) {
			colorFlag = inverse(colorFlag);
			rowline = i-1;
			dynamicTable = dynamicTable + 
				'<tr class="tRow_'+rowline+'">';
				for ( var j = 1; j <= 10; j++) {
					if((j == 10) || (j == 1)){
						if(i==10 && j==1){
							dynamicTable = dynamicTable +
								'<td class="left_top legend"><div class="marker_empty size680"></div></td>';
						}else if(i==1 && j==1){
							dynamicTable = dynamicTable +
								'<td class="left_bottom legend"><div id="markerBottom" class="marker_white size680"></div></td>';
						}else if(i==10 && j==10){
							dynamicTable = dynamicTable +
								'<td class="right_top legend"><div class="marker_empty size680"></div></td>';
						}else if(i==1 && j==10){
							dynamicTable = dynamicTable +
								'<td class="right_bottom legend"><div class="marker_empty size680"></div></td>';
						}else{
							var l = i-1;
							if(j == 10){
								dynamicTable = dynamicTable +
									'<td class="legend right verticalLegend size680 B_WStyle"><div class="#">'+ l +'</div></td>';
							}else {
								dynamicTable = dynamicTable +
									'<td class="legend left verticalLegend size680 B_WStyle"><div class="#">'+ l +'</div></td>';
							}
						}
					}else if((i == 10) || (i == 1)){
						if(i == 10){
							dynamicTable = dynamicTable +
								'<td class="legend top horizontalLegend size680 B_WStyle"><div class="#">'+ defaultLegend[j-2] +'</div></td>';
						}else{
							dynamicTable = dynamicTable +
								'<td class="legend bottom horizontalLegend size680 B_WStyle"><div class="#">'+ defaultLegend[j-2] +'</div></td>';
						}
					}
					else{
						if(colorFlag == true){
							dynamicTable = dynamicTable +
								'<td class="white td B_WStyle">'+
									'<div class="cell cDroppable" id="crdnt_'+l+'_'+defaultLegend[j-2]+'"></div>'+
								'</td>';
						}else{
							dynamicTable = dynamicTable +
								'<td class="black td B_WStyle">'+
									'<div class="cell cDroppable"  id="crdnt_'+l+'_'+defaultLegend[j-2]+'"></div>'+
								'</td>';
						}
						colorFlag = inverse(colorFlag);
					}
				}
			dynamicTable = dynamicTable +'</tr>';
		}
		return dynamicTable;
	}
	
	function inverse(flag){
		if (flag == true) {
			return flag = false;
		}else{
			return flag = true;
		}
	}

	function getChesSandArrows(){
		var Content = '';
		$.ajax({
				url:'myPHP/action.php',
				type:'POST',
				data:{'getChess':'true'},
		}).done(function (data){
			if(data != '"err"' && data != ''){
				var res = $.parseJSON(data);
				$.each(res, function(item){
					Content = Content + 
						'<div class="col-md-2 col-sm-2 col-xs-2 chessItem">'+
							'<img src="./img/chess/'+this.item+'">'+
						'</div>';
				});
				$('.chess').append(Content);
				$('.chessItem img').draggable({
					helper:'clone',
					tolerance:'pointer',
				});
			}
			else{
				console.log('error for get chess');
			}
		});
		var Content = '';
		$.ajax({
				url:'myPHP/action.php',
				type:'POST',
				data:{'getArrows':'true'},
		}).done(function (data){
			if(data != '"err"' && data != ''){
				var Content = '';
				var res = $.parseJSON(data);
				$.each(res, function(item){
					Content = Content + 
						'<div class="col-md-2 col-sm-2 col-xs-2 arrowItem">'+
							'<img src="./img/arrows/'+this.item+'">'+
						'</div>';
				});
				$('.chess').append(Content);
				$('.arrowItem img').draggable({
					helper:'clone',
					tolerance:'pointer',
				});
			}
			else{
				console.log('error for get arrows');
			}
		});
	}

	$('.gameTable').append(get_gameTable());
	getChesSandArrows();
	$('.chessItem img').draggable({
		helper:'clone',
		tolerance:'pointer'
	});

	function getChessSortedArr(type){
		var chessArr = {
			kor: new Array(),
			fer: new Array(),
			lad: new Array(),
			off: new Array(),
			kon: new Array(),
			pes: new Array()
		};
		var theRows = $("[class^='tRow_']").get().reverse();
		$(theRows).each(function(i){
			$($(this).children('td')).each(function(j){
				if(($(this).hasClass('white') || $(this).hasClass('black'))){
					if($(this).children('div').children().hasClass('ches')){
						flist = $(this).children().children().attr('src').split('/')[3].split('.')[0].split('_');
						adres = $(this).children().attr('id').split('_');
						if(flist[1] == type){
							switch (flist[0]) {
								case 'kor':
									chessArr.kor.push(adres[2]+''+adres[1]);
									break;
								case 'fer':
									chessArr.fer.push(adres[2]+''+adres[1]);
									break;
								case 'lad':
									chessArr.lad.push(adres[2]+''+adres[1]);
									break;
								case 'off':
									chessArr.off.push(adres[2]+''+adres[1]);
									break;
								case 'kon':
									chessArr.kon.push(adres[2]+''+adres[1]);
									break;
								case 'pes':
									chessArr.pes.push(adres[2]+''+adres[1]);
									break;
							}
						}
					}
				}
			});
		});
		return chessArr;
	}

	function makeString(sortedArr){
		var theString = '';
		if(sortedArr['kor'].length !=0)
			theString += 'Kр'+sortedArr['kor']+', ';

		if(sortedArr['fer'].length !=0)
			sortedArr['fer'].forEach(function(theArg){
				theString += 'Ф'+sortedArr['fer']+', ';
			});
		
		if(sortedArr['lad'].length !=0)
			sortedArr['lad'].forEach(function(theArg){
				theString += 'Л'+theArg+', ';
			});
			
		if(sortedArr['off'].length !=0)
			sortedArr['off'].forEach(function(theArg){
				theString += 'C'+theArg+', ';
			});

		if(sortedArr['kon'].length !=0)
			sortedArr['kon'].forEach(function(theArg){
				theString += 'K'+theArg+', ';
			});

		if(sortedArr['pes'].length !=0 && sortedArr['pes'].length == 1)
			theString += 'п. '+sortedArr['pes']+'; ';
		
		if(sortedArr['pes'].length > 1){
			theString += 'пп. ';
			sortedArr['pes'].forEach(function(theArg){
				theString += theArg+', ';
			});
		}

		if(theString.slice(-2) == ', '){
			theString = theString.slice(0, theString.length-2);
			theString += '; ';
		}
		return theString;
	}

	function getIncodedStr(){
		var theString = 'Белые — '+ makeString(getChessSortedArr('w'));
		
		theString += 'черные — '+ makeString(getChessSortedArr('b'))

		if(theString.slice(-2) == '; '){
			theString = theString.slice(0, theString.length-2);
			theString += '.';
		}

		$('.myTextarea').val(theString);
	}

	var success = true;
	$('.cDroppable').droppable({
		drop: function(event,ui){
			if($(ui.draggable).parent().hasClass('chessItem')){
				$(this).find('img').remove('.ches');
				$(this).prepend('<img src="'+$(ui.draggable).attr('src')+'" class="ches" id="chessClone">');
				resize();
				$(this).find('img.ches').draggable({
					tolerance:'pointer',
					revert: function(event,ui){
						if($(this).parent().attr('id')){
							temp1 = $('#'+$(this).parent().attr('id')).parent().parent().attr('class');
							$(this).parent().find('img').remove('.ches');
							setTimeout(function() {
								editFen(temp1);
								getIncodedStr();
							}, 0);
						}
						return true;
					}
				}); 
					temp2 = $(this).parent().parent().attr('class');
					setTimeout(function() {
						editFen(temp2);
						getIncodedStr();
					}, 0);
			}else if(($(ui.draggable).parent().hasClass('cell')) && ($(ui.draggable).hasClass('ches'))){
				$(this).find('img').remove('.ches');
				$(this).prepend('<img src="'+$(ui.draggable).attr('src')+'" class="ches" id="chessClone">');
				resize();
				$(this).find('img.ches').draggable({
					tolerance:'pointer',
					revert: function(event,ui){
						if($(this).parent().attr('id')){
							temp3 = $('#'+$(this).parent().attr('id')).parent().parent().attr('class');
							$(this).parent().find('img').remove('.ches');
							setTimeout(function() {
								editFen(temp3);
								getIncodedStr();
							}, 0); 
						}
						return true;
					}
				});
				temp4 = $(this).parent().parent().attr('class');
				setTimeout(function() {
					editFen(temp4);
					getIncodedStr();
				}, 0);
			}else if($(ui.draggable).parent().hasClass('arrowItem')){
				$(this).find('img').remove('.arrow');
				$(this).append('<img src="'+$(ui.draggable).attr('src')+'" class="arrow" id="arrowClone">');
				resize();
				$(this).find('img.arrow').draggable({
					helper:'clone',
					tolerance:'pointer',
					revert: function(event,ui){
						if($(this).parent().attr('id')){
							$(this).parent().find('img').remove('.arrow');
						}
						return true;
					}
				});
			}else if(($(ui.draggable).parent().hasClass('cell')) && ($(ui.draggable).hasClass('arrow'))){
				$(this).find('img').remove('.arrow');
				$(this).append('<img src="'+$(ui.draggable).attr('src')+'" class="arrow" id="arrowClone">');
				resize();
				$(this).find('img.arrow').draggable({
					helper:'clone',
					tolerance:'pointer',
					revert: function(event,ui){
						if($(this).parent().attr('id')){
							$(this).parent().find('img').remove('.arrow');
						}
						return true;
					}
				});
			}
		}
	});

	function getChessCode(name,color){
		key = '';
		switch (name) {
			case "lad": key = "r"; break;
			case "kon": key = "n"; break;
			case "off": key = "b"; break;
			case "kor": key = "k"; break;
			case "fer": key = "q"; break;
			case "pes": key = "p"; break;
			default: key = "p";
		}
		if(color=='w'){
			key = key.toUpperCase();
		}
		return key;
	}

	function getChessNameByCode(code) {
		switch (code) {
			case "R": case "r" : return "lad"; break;
			case "N": case "n" : return "kon"; break;
			case "B": case "b" : return "off"; break;
			case "K": case "k" : return "kor"; break;
			case "Q": case "q" : return "fer"; break;
			case "P": case "p" : return "pes"; break;
			default: return "0";
		}
	};

	function getDeathStr(num){
		deahtStr = '';
		for ( var j = 1; j <= num; j++) {
			deahtStr += '1';
		}
		return deahtStr;
	}

	function editFen(editableRow){
		fenList = $('#FEN').val().split(' ');
		fenRows = fenList[0].split('/');
		emptyCllsCnt = 1;
		stringres = '';
		$("[class^='"+editableRow+"'] > td > div").each(function(i){
			if(i>=1 && i<=8){
				if($(this).children().hasClass('ches')){
					if(emptyCllsCnt != 0){
						emptyCllsCnt--;
						if(emptyCllsCnt != 0){
							stringres += emptyCllsCnt;
							emptyCllsCnt = 0;
						}
					}
					flist = '';
					flist = $(this).children().attr('src').split('/')[3].split('.')[0].split('_');
					stringres += getChessCode(flist[0],flist[1]);
				}
				if(emptyCllsCnt != 0 && i==8){
					stringres += emptyCllsCnt;
				}
				emptyCllsCnt++;
			}
		});
		if($('#markerBottom').hasClass('marker_black')){
			fenList[1] = 'b';
		}else{
			fenList[1] = 'w';
		}
		fenRows[Math.abs(Number(editableRow.split('_')[1])-9)-1] = stringres;
		fTemp1 = [fenRows[0],fenRows[1],fenRows[2],fenRows[3],fenRows[4],fenRows[5],fenRows[6],fenRows[7]].join('/');
		fTemp2 = [fenList[1],fenList[2],fenList[3],fenList[4],fenList[5]].join(' ');
		newFEN = [fTemp1,fTemp2].join(' ');
		$('#FEN').attr('value',newFEN);
		$('#FEN').val(newFEN);
	}

	function executeFEN(FEN){
		fenList = FEN.split(' ')[0].split('/');
		$("[class^='tRow_']").each(function(i){
			$($(this).children('td')).each(function(j){
				if(($(this).hasClass('white') || $(this).hasClass('black'))){
					rowCounter = Math.abs(i)-1;
					myCounter = j-1;
					if(typeof(fenList[rowCounter][myCounter]) != 'undefined'){
						if(fenList[rowCounter][myCounter].toLowerCase() === fenList[rowCounter][myCounter].toUpperCase()){
							$(this).find('div').find('img').remove('.ches');
							fenList[rowCounter] = fenList[rowCounter].replace(fenList[rowCounter][myCounter], getDeathStr(Number(fenList[rowCounter][myCounter])));
						}else if(fenList[rowCounter][myCounter] === fenList[rowCounter][myCounter].toUpperCase()){
							chessPath = './img/chess/'+ getChessNameByCode(fenList[rowCounter][myCounter])+'_w.png';
							$(this).find('div').append('<img src="'+chessPath+'" class="ches" id="chessClone">');
							resize();
							$('.cell img').draggable({
								tolerance:'pointer',
								revert: function(event,ui){
									if($(this).parent().attr('id')){
										temp5 = $('#'+$(this).parent().attr('id')).parent().parent().attr('class');
										$(this).parent().find('img').remove('.ches');
										setTimeout(function() {
											editFen(temp5);
											getIncodedStr();
										}, 0); 
									}
									return true;
								}
							});
						}else{
							chessPath = './img/chess/'+ getChessNameByCode(fenList[rowCounter][myCounter])+'_b.png';
							$(this).find('div').append('<img src="'+chessPath+'" class="ches" id="chessClone">');
							resize();
							$('.cell img').draggable({
								tolerance:'pointer',
								revert: function(event,ui){
									if($(this).parent().attr('id')){
										temp6 = $('#'+$(this).parent().attr('id')).parent().parent().attr('class');
										$(this).parent().find('img').remove('.ches');
										setTimeout(function() {
											editFen(temp6);
											getIncodedStr();
										}, 0); 
									}
									return true;
								}
							});
						}
					}
				}
			});
		});
	}

	$("body").contextmenu(function(){return false;});

	var colorable;
	$('tr').mousedown(function(e){
		e.preventDefault();
		if(e.button == 0){
			$('.colors').css({'display':'none'});
		}else if(e.button == 1){
			//'Колесо'
		}else if(e.button == 2){
			if($(e.target).hasClass('cell')) {
				colorable = $(e.target);
				var top = e.pageY-25+'px';
				var left = e.pageX+5+'px';
				$('.colors').css({'display':'block'});
				$('.colors').css({'top': top});
				$('.colors').css({'left':left});
			}else if($(e.target).hasClass('ches')) {
				colorable = $(e.target).parent();
				var top = e.pageY-25+'px';
				var left = e.pageX+5+'px';
				$('.colors').css({'display':'block'});
				$('.colors').css({'top': top});
				$('.colors').css({'left':left});
			}else{
				$('.colors').css({'display':'none'});
			}
		}
	});

	$('.color').mousedown(function(e){
		switch ($(this).attr('id')) {
			case 'none':
				$(colorable).css({'background': ''});
				$(colorable).css({'border': 'none'});
				$('.colors').css({'display':'none'});
				break;
			case 'red':
				$(colorable).css({'background-color': 'rgba(229, 57, 50, 0.7)'});
				$('.colors').css({'display':'none'});
				break;
			case 'green':
				$(colorable).css({'background-color': 'rgba(0, 128, 0, 0.5)'});
				$('.colors').css({'display':'none'});
				break;
			case 'blue':
				$(colorable).css({'background-color': 'rgba(0, 0, 255, 0.5)'});
				$('.colors').css({'display':'none'});
				break;
			case 'yellow':
				$(colorable).css({'background-color': 'rgba(216, 203, 80, 0.6);'});
				$('.colors').css({'display':'none'});
				break;
			case 'board':
				$(colorable).css({'background-image': 'url(./img/pieces_2/border1.png)'});
				$(colorable).css({'background-size': '100% 100%'});
				$('.colors').css({'display':'none'});
				break;
		}
	});

	function printTable(prefix,type,size){
		if(type == 'color'){
			nameIMG = 'color_'+prefix+'_'+size;
		}else{
			nameIMG = prefix+'_'+size;
		}
		html2canvas($('.gameTable'), {
			onrendered: function (canvas) {
				var newCanvas = document.createElement("canvas");
				newCanvas.setAttribute('width',size);
				newCanvas.setAttribute('height',size);
				var ctx = newCanvas.getContext('2d');
				ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,size,size);
				$('#download').attr('href', newCanvas.toDataURL("image/png",1));
				$('#download').attr('download',	nameIMG+'.png');
				$('#download')[0].click();
			}
		});
		return true;
	}

	function colorstyle(){
		saveImgType = "color";
		$('td, table, .legend').removeClass('B_WStyle');
		$('td, table, .legend').addClass('coloredStyle');
	}
	
	function uncolorstyle(){
		saveImgType = "uncolor";
		$('td, table, .legend').removeClass('coloredStyle');
		$('td, table, .legend').addClass('B_WStyle');
	}

	$('#Colored').on('click',function(){
		colorstyle();
	});

	$('#bUncolored').on('click',function(){
		uncolorstyle();
	});
	
	$('.navbar-header').css({'width':$('.navbar-header').width()+2, 'margin':'0 auto', 'float':'inherit'});
	$('.navbar').css({'margin-bottom': '5px'});

	resize680();
	uncolorstyle();

	$('#px680').on('click',function(){
		resize680();
		nameFILE = 'FEN_'+$('#prefix').val()+'.txt';
		$('#downloadFEN').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#FEN').val()));
		$('#downloadFEN').attr('download',	nameFILE);
		$('#downloadFEN')[0].click();

		printTable($('#prefix').val(),saveImgType,680); 

		setTimeout(function() {
			colorstyle();
		}, 500);
		setTimeout(function() {
			printTable($('#prefix').val(),saveImgType,680); 
		}, 1000);
		setTimeout(function() {
			uncolorstyle();
			resize680();
		}, 2000);
		nameFILE1 = 'incode_'+$('#prefix').val()+'.txt';
		$('#downloadIncode').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#myTextarea').val()));
		$('#downloadIncode').attr('download',	nameFILE1);
		$('#downloadIncode')[0].click();
	});

	$('#px1000').on('click',function(){
		resize1000();
		nameFILE = 'FEN_'+$('#prefix').val()+'.txt';
		$('#downloadFEN').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#FEN').val()));
		$('#downloadFEN').attr('download',	nameFILE);
		$('#downloadFEN')[0].click();

		printTable($('#prefix').val(),saveImgType,1000); 

		setTimeout(function() {
			colorstyle();
		}, 500);
		setTimeout(function() {
			printTable($('#prefix').val(),saveImgType,1000); 
		}, 1000);
		setTimeout(function() {
			uncolorstyle();
			resize1000();
		}, 2000);
		nameFILE1 = 'incode_'+$('#prefix').val()+'.txt';
		$('#downloadIncode').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#myTextarea').val()));
		$('#downloadIncode').attr('download',	nameFILE1);
		$('#downloadIncode')[0].click();
	});

	$('#px304').on('click',function(){
		resize304();
		nameFILE = 'FEN_'+$('#prefix').val()+'.txt';
		$('#downloadFEN').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#FEN').val()));
		$('#downloadFEN').attr('download',	nameFILE);
		$('#downloadFEN')[0].click();
		printTable($('#prefix').val(),saveImgType,304); 

		setTimeout(function() {
			colorstyle();
		}, 500);
		setTimeout(function() {
			printTable($('#prefix').val(),saveImgType,304); 
		}, 1000);
		setTimeout(function() {
			uncolorstyle();
			resize304();
		}, 2000);
		nameFILE1 = 'incode_'+$('#prefix').val()+'.txt';
		$('#downloadIncode').attr('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent($('#myTextarea').val()));
		$('#downloadIncode').attr('download',	nameFILE1);
		$('#downloadIncode')[0].click();
	});

	$('#newFen').on('click',function(){
		executeFEN('8/8/8/8/8/8/8/8 w KQkq - 0 1');
		executeFEN($('#FEN').val());
		getIncodedStr();
		
	});

	$('#fullTable').on('click',function(){
		$('div.cell').empty();
		initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
		executeFEN(initialFEN);
		getIncodedStr();
		$('#FEN').attr('value',initialFEN);
		$('#FEN').val(initialFEN);
		resize();
	});

	$('#emptyTable').on('click',function(){
		$('.cell').css({'background': ''});
		$('.cell').css({'border': 'none'});
		$('.colors').css({'display':'none'});
		$('div.cell').empty();
		initialFEN = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
		executeFEN(initialFEN);
		$('.myTextarea').val('');
		$('#FEN').attr('value',initialFEN);
		$('#FEN').val(initialFEN);
		resize();
	});

	$('.left_bottom').click(function() {
		if($('#markerBottom').hasClass('marker_white') || $('#markerBottom').hasClass('marker_black')){
			if($('#markerBottom').hasClass('marker_white')){
				$('#markerBottom').removeClass('marker_white');
				$('#markerBottom').removeClass('marker_empty');
				$('#markerBottom').addClass('marker_black');
			}else {
				$('#markerBottom').removeClass('marker_black');
				$('#markerBottom').removeClass('marker_empty');
				$('#markerBottom').addClass('marker_white');
			}
		}else {
			$('#markerBottom').removeClass('marker_empty');
			$('#markerBottom').addClass('marker_white');
		}
	}).hover(function(){ 
	},function(){
	}).dblclick(function() {
		if($('#markerBottom').hasClass('marker_white') || $('#markerBottom').hasClass('marker_black')){
			$('#markerBottom').removeClass('marker_white');
			$('#markerBottom').removeClass('marker_black');
			$('#markerBottom').addClass('marker_empty');
		}
	});
});
