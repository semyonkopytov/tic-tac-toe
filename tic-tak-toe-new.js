//init
let fieldSize = 5;
let field = [];
let step = 0;
let mode = 0;
for (let i = 0; i <= fieldSize; i++)
{
	field[i] = [];
}



function change()
{
	
	switch(Number(mode))
	{
		case 0:
			PvP(this);
			break;

		case 1:
		case 2:
			playerVsBot(this);
			break;

		case 3:
			demo();
			break;
	}
}


function PvP(btn){
	step++;
	btn.disabled = true; 
	btn.value = document.getElementById('selec').value;
	field[Number(btn.id[0])][Number(btn.id[1])] = document.getElementById('selec').value;
	//console.log(this.id);
	changer(document.getElementById('selec').value);
	step++;
	btn.disabled = true; 
	btn.value = document.getElementById('selec').value;
	field[Number(btn.id[0])][Number(btn.id[1])] = document.getElementById('selec').value;

}

function changer(sign)
{
	if(sign == 'o')
	{
		document.getElementById('selec').value = 'x';
	} else{
		document.getElementById('selec').value = 'o';
	}
}

function playerVsBot(btn)
{
	step++;
	btn.disabled = true; 
	btn.value = document.getElementById('selec').value;
	field[Number(btn.id[0])][Number(btn.id[1])] = document.getElementById('selec').value;
	step++;
	logic(document.getElementById('selec').value);
	priority = [];
	steps = [];
}

function again()
{
	window.location.reload(true);
}

function demo()
{
	
	step++;
	logic('o');
	priority = [];
	steps = [];

	step++;
	logic('x');
	priority = [];
	steps = [];
	demo();
}

function init()
{

	fieldSize = Number(document.getElementById("field").value);
	mode = Number(document.getElementById("mode").value);
	if(mode == 2)
	{
		step++;
		logic('o');
		changer();
	}
		if(mode == 3)
	{
		demo();
	}
	console.log(mode);
}

let priority = [];
let steps = [];

function fillVecs(cntOp, cntSi, k)
{
	//console.log(k);
	console.log(step%2);
	if(cntOp == 1 && cntSi ==0)
	{
		priority.push(2);
		steps.push(k);
	}
	if(cntOp == fieldSize-1 && cntSi ==0 && cntOp >1)
	{
		priority.push(6);
		steps.push(k);
	}
	if(cntOp >= 1 && cntSi >=1)
	{
		priority.push(0);
		steps.push(k);
	}
	if(cntSi == fieldSize-1 && cntOp ==0 && cntSi >1)
	{
		priority.push(7);
		steps.push(k);
	}
	if(cntSi == fieldSize-2 && cntOp ==0 && cntSi >1)
	{
		priority.push(5);
		steps.push(k);
	}
	if(cntSi == fieldSize-3 && cntOp == 0 && cntSi >1)
	{
		priority.push(4);
		steps.push(k);
	}
	if(cntSi == 1 && cntOp ==0)
	{
		priority.push(3);
		steps.push(k);
	}
	if(cntSi == 0 && cntOp ==0)
	{
		priority.push(1);
		steps.push(k);
	}
}


//first
function logic(oppositeSign)
{
	//console.log(step);
	let check=0;

	console.log("im here");
	let sign;

	if(oppositeSign == 'x')
	{
		sign = 'o'
	} else {
		sign = 'x'
	}

	let mid = Math.ceil(fieldSize/2)-1;
	let midmid = '' + mid + mid;
	//first or second step
	if(step == 1)
	{
		document.getElementById(midmid).value = sign;
		field[mid][mid] = sign;
		document.getElementById(midmid).disabled = true;
		return;
	}
	
	if(step == 2)
	{
		if(field[mid][mid] != oppositeSign)
		{
			document.getElementById(midmid).value = sign;
			field[mid][mid] = sign;
			document.getElementById(midmid).disabled = true;
		} else {
			
			document.getElementById("00").value = sign;
			field[0][0] = sign;
			document.getElementById("00").disabled = true;
		}

		return;
	}

	let doStep = '';
	let cntOp = 0;
	let cntSi = 0;
	let k = '';
	//let counter = 0;

	//cols
	for(let i = 0; i < fieldSize; i++)
	{
		cntOp = 0;
		cntSi = 0;
		//k = '';
		for(let j = 0; j < fieldSize; j++)
		{
			//k = '';
			if(field[i][j] == oppositeSign)
				cntOp++;
			if(field[i][j] == sign)
			{
				cntSi++;
			}
			if(field[i][j] != sign && field[i][j] != oppositeSign)
				k = '' + i + j;
		}	
		fillVecs(cntOp, cntSi, k);
	}

	//rows
	for(let i = 0; i < fieldSize; i++)
	{
		cntOp = 0;
		cntSi = 0;
		for(let j = 0; j < fieldSize; j++)
		{
			if(field[j][i] == oppositeSign)
				cntOp++;
			if(field[j][i] == sign)
			{
				cntSi++;
			}
			if(field[j][i] != sign && field[j][i] != oppositeSign)
				k = '' + j + i;
		}
		fillVecs(cntOp, cntSi, k);
	}

	//diag1
	for(let i = 0; i < fieldSize; i++)
	{
		if(field[i][i] == oppositeSign)
			cntOp++;
		if(field[i][i] == sign)
			cntSi++;
		if(field[i][i] != sign && field[i][i] != oppositeSign)
			k = '' + i + i;
	}
	
	fillVecs(cntOp, cntSi, k);;

	//diag2
	for(let i = 0; i < fieldSize; i++)
	{
		cntOp = 0;
		cntSi = 0;
		//k = '';
		for(let j = 0; j < fieldSize; j++)
		{
			//k = '';
			if(i+j==fieldSize-1)
			{
				if(field[i][j] == oppositeSign)
					cntOp++;
				if(field[i][j] == sign)
					cntSi++;
				if(field[i][j] != sign && field[i][j] != oppositeSign)
					k = '' + i + j;
			}
		}
	}
	fillVecs(cntOp, cntSi, k);

	let max = Math.max(...priority);
	doStep = steps[priority.indexOf(max)];
	let tst = '';
	for(let i=0; i < 2*fieldSize+2; i++)
	{
		tst += priority[i] + ' ';
	}
	console.log(tst);
	document.getElementById(doStep).value = sign;
	field[Number(doStep[0])][Number(doStep[1])] = sign;
	document.getElementById(doStep).disabled = true;
	k = '';

}


//listener
document.getElementById('agn').addEventListener('click', again);

document.getElementById('acpt').addEventListener('click', init);

document.getElementById("00").addEventListener('click', change);
document.getElementById("01").addEventListener('click', change);
document.getElementById("02").addEventListener('click', change);
document.getElementById("03").addEventListener('click', change);
document.getElementById("04").addEventListener('click', change);

document.getElementById("10").addEventListener('click', change);
document.getElementById("11").addEventListener('click', change);
document.getElementById("12").addEventListener('click', change);
document.getElementById("13").addEventListener('click', change);
document.getElementById("14").addEventListener('click', change);

document.getElementById("20").addEventListener('click', change);
document.getElementById("21").addEventListener('click', change);
document.getElementById("22").addEventListener('click', change);
document.getElementById("23").addEventListener('click', change);
document.getElementById("24").addEventListener('click', change);

document.getElementById("30").addEventListener('click', change);
document.getElementById("31").addEventListener('click', change);
document.getElementById("32").addEventListener('click', change);
document.getElementById("33").addEventListener('click', change);
document.getElementById("34").addEventListener('click', change);

document.getElementById("40").addEventListener('click', change);
document.getElementById("41").addEventListener('click', change);
document.getElementById("42").addEventListener('click', change);
document.getElementById("43").addEventListener('click', change);
document.getElementById("44").addEventListener('click', change);