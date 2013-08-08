/*
@(#)File:           main.js
@(#)Version:        0.1
@(#)Last changed:   2013/08/08
@(#)Purpose:        Visualized resume
@(#)Author:         Miguel Laginha
@(#)License:      	MIT
@(#)Thanks to: 		jsgradients library: http://aurer.co.uk/project/js-color-gradients/
*/

// variables
var canvasElementId = 'c';
var canvas = new fabric.StaticCanvas(canvasElementId);
var horizontalGutter = 30;
var leftPosition = horizontalGutter / 2;
var verticalGutter = 50;
var topPosition = 0 + verticalGutter / 2;
var cellHeight = 50;
var fontSize = 14;
var black = "#2d2d2d";
var year = initialYear;

/*
/* year top corner
*/
var yearText = new fabric.Text("Year", { 
	top: topPosition, 
	left: leftPosition, 
	height: cellHeight, 
	fill: '#fff', 
	backgroundColor: black, 
	fontSize: fontSize, 
	originX: 'left',
	textAlign: 'center',
	fontFamily: 'verdana',
	textAlign: 'center'
});

var yearRect = new fabric.Rect({ 
	top: topPosition, 
	left: yearText.left - horizontalGutter/2, 
	width: yearText.getWidth() + horizontalGutter, 
	height: cellHeight, 
	originX: 'left',
	fill: black 
});

canvas.add(yearRect);
canvas.add(yearText);

/*
/* years until today left column
*/
while(year <= currentYear) {
	topPosition = topPosition + verticalGutter;
	canvas.add( new fabric.Text('\''+year.toString().substring(2,4), { 
		top: topPosition, 
		left: yearRect.left + yearRect.getWidth() - horizontalGutter/2, 
		width: 100, 
		height: cellHeight, 
		fill: '#24282b', 
		fontSize: fontSize, 
		originX: 'right',
		fontFamily: 'verdana',
		textAlign: 'center'
	}));
 	year++;
};

/*
 * Draw the jobs with gradients
 */
var lastPosition = yearRect.left + yearRect.getWidth() + horizontalGutter + horizontalGutter/2;
topPosition = 0 + verticalGutter / 2;

for (var i = 0; i < jobs.length; i++) {
	job = jobs[i];	
	var text = new fabric.Text(job.name, { 
		top: topPosition, 
		left: lastPosition, 
		height: cellHeight, 
		fill: '#fff', 
		originX: 'left',
		fontSize: fontSize, 
		// textAlign: 'center',
		fontFamily: 'verdana'
	});
	
	var rect = new fabric.Rect({ 
		top: topPosition, 
		left: text.left - horizontalGutter/2, 
		width: text.getWidth() + horizontalGutter, 
		height: cellHeight, 
		originX: 'left',
		fill: black 
	});

	// draw stuff
	canvas.add(rect);
	canvas.add(text);
	
	/*
	 * draw the gradient according to occupation percentage
	 */
	
	// get 10 gradients from white to the job mainColor (10% until 100%)
	var gradients = jsgradient.generateGradient('#fff', job.mainColor, 11);
	var year = initialYear;
	var incrementalVPosition = topPosition;
	
	while(year <= currentYear) {				
		incrementalVPosition = incrementalVPosition + verticalGutter;
		canvas.add( new fabric.Rect({ 
			top: incrementalVPosition, 
			left: text.left - horizontalGutter/2, 
			width: text.getWidth() + horizontalGutter,  
			height: cellHeight - 10, 
			fill: gradients[(job.occupation[year-initialYear] / 10) - 1],  
			originX: 'left'
		}));
	 	year++;
	};
	
	// break;
	lastPosition = lastPosition + rect.getWidth() + horizontalGutter;
}
