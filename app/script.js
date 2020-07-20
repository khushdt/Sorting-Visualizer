//============ BASIC SETUP =================//
let bars=[];
const def ="#3282b8",chng="#431f91", finished="#79d70f", selected="#f6f578";

window.onload = setup();
async function setup() {
	let b = document.getElementById("bars");
	let d = document.getElementById("delay");
	document.getElementById("b").innerText = b.value;
	document.getElementById("d").innerText = d.value + "ms";
	
	if(bars.length!=parseInt(b.value)) {
		generateBars(parseInt(b.value));
	}
}


function reset() {
	location.reload();
}


function Disable_The_Input() { 
		let x = document.getElementsByTagName("input");
		for(let i=0;i<x.length;i++)
			x[i].disabled=true;
		return parseInt(document.getElementById("delay").value);
}


function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for(let i=0;i<x.length;i++)
		x[i].style.backgroundColor=finished;
	x=document.getElementsByTagName("input");
	for(let i=0;i<x.length;i++)
		x[i].disabled=false;
	
}


function generateBars(n=-1) { 
	bars=[];
	let container=document.getElementById("container");
	n=n<0?Math.random()*20:n;
	for(let i=0;i<n;i++) {
		bars.push('<div class="bar" id="'+i+'" style="height:'+Math.floor(2+Math.random()*98)+'%"></div>');
	}
	container.innerHTML= bars.join('');
}


function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


//============= SORTING ALGOS ============== //

// BubbleSort() : Implementation of bubble sort algorithm. O(n^2)
async function BubbleSort() {
	let delay=Disable_The_Input();
	let container=document.getElementById("container");
	
	for(let i=0;i < bars.length-1;i++) {
		let has_swap = false;
		for(let j=0; j < bars.length-i-1;j++) {
			let curr_id = bars[j].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j+1].split('id="')[1].split('"')[0];
			
			document.getElementById(curr_id).style.backgroundColor=selected;
			document.getElementById(nxt_ele).style.backgroundColor=chng;
			await Sleep(delay/2);
			let a = parseInt(bars[j].split(/[:%]/)[1]);
			let b = parseInt(bars[j+1].split(/[:%]/)[1]);
			if(a > b) {
				has_swap = true;
				
				let t=bars[j];
				bars[j]=bars[j+1];
				bars[j+1]=t;
				
				container.innerHTML=bars.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay/2.0);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if(has_swap == false) break;
	}
	Finished_Sorting();
}


// InsertionSort() : Implementation of inserion sort algorithm. O(n^2) 
async function InsertionSort() {
	let delay = Disable_The_Input();
	let container=document.getElementById("container");
	for(let i=1; i < bars.length; i++){
		let j=i-1;
		let key = bars[i];
		let curr_id=key.split('id="')[1].split('"')[0];
		let nxt_ele=bars[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		
		while(j >= 0 && parseInt(bars[j].split(/[:%]/)[1])>parseInt(key.split(/[:%]/)[1])){
			document.getElementById(nxt_ele).style.backgroundColor=def;
			nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay);
			bars[j+1]=bars[j];
			j--;
		}

		bars[j+1]=key;
		container.innerHTML=bars.join('');
		document.getElementById(curr_id).style.backgroundColor=selected;
		document.getElementById(nxt_ele).style.backgroundColor=chng;
		await Sleep(delay*3.0/5);
		document.getElementById(curr_id).style.backgroundColor=def;
		document.getElementById(nxt_ele).style.backgroundColor=def;
	}
	Finished_Sorting();
}
