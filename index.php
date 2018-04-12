<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Chess table 1.0</title>
		<script type='text/javascript' src="./libs/jQuery/jquery.js"></script>
		<script type='text/javascript' src="./libs/jQuery/jquery-ui.js"></script>
		<script type='text/javascript' src="./libs/selectionDisable/selectionDisable.js"></script>
		<script type='text/javascript' src="./libs/html2canvas/html2canvas.js"></script>
		<script type='text/javascript' src="./libs/html2canvas/jquery.plugin.html2canvas.js"></script>
		<link href="./style/style.css" rel="stylesheet"/>
		<link href="./libs/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
		<script type='text/javascript' src="./myJS/action.js"></script>
	</head>

	<body>
		<div class="container-fluid">
			<div class="row">
				<nav class="navbar navbar-default" role="navigation">
					<div class="navbar-header">
						<div class="btn-group">
							<input type="text" class="btn btn-default" id="prefix" placeholder="prefix">
							<button type="button" class="btn btn-default" id="Colored">Colored</button>
							<button type="button" class="btn btn-default" id="bUncolored">B & W</button>
							<!-- <button type="button" class="btn btn-default" id="downloading">Вкл\Выкл скачивание</button> -->
							<button type="button" class="btn btn-default" id="px1000">Save in 1000px</button>
							<button type="button" class="btn btn-default" id="px680">Save in 680px</button>
							<button type="button" class="btn btn-default" id="px304">Save in 304px</button>
							<button type="button" class="btn btn-default" id="fullTable">Initial settings</button>
							<button type="button" class="btn btn-default" id="emptyTable">Empty board</button>
						</div>
						<a id='download' href="#" ></a>
						<a id='downloadFEN' href="#" ></a>
						<a id='downloadIncode' href="#" ></a>
					</div>
				</nav>
			</div>
			<div class="game">
				<table class="gameTable B_WStyle" id="gameTable" cellspacing=0 cellpadding=0 border="0">	</table>

				<div class="row chess defaultChessContainer">	</div>
				<div class="btn-group fen">
					<p>
						<input type="text" value="8/8/8/8/8/8/8/8 w KQkq - 0 1" class="btn btn-default" id="FEN" placeholder="FEN">
						<button type="button" class="btn btn-default" id="newFen">Загрузить FEN</button>
					</p>
				</div>
				<textarea rows="3" name="text" class="myTextarea" id="myTextarea"></textarea>
			</div>
			
		</div>
		<ul class="dropdown-menu colors" role="menu">
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#" class="color" id="red">Красный фон</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#" class="color" id="green">Зеленый фон</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#" class="color" id="blue">Синий фон</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#" class="color" id="yellow">Желтый фон</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#"  class="color" id="board">Рамка</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#" class="color" id="none">Без цвета</a>
			</li>
		</ul>
	</body>
</html>