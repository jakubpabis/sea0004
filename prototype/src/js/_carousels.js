
function siemaAutoplay($time, $siema, $carousel) 
{
	var timer = setInterval(function() {
		$siema.next();
	}, $time);
	$carousel.addEventListener('mouseenter', function() {
		clearInterval(timer);
	});
	$carousel.addEventListener('mouseleave', function() {
		timer = setInterval(function() {
			$siema.next();
		}, $time);
	});
}

function loadCarousel() 
{
	var siema = document.getElementById('siema-carousel');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next').addEventListener('click', function() {
			mySiema.next()
		});
		siemaAutoplay(5000, mySiema, siema);
	}
}

function loadClientsCarousel() 
{
	var siema = document.getElementById('siema-carousel-clients');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel-clients',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev-clients').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next-clients').addEventListener('click', function() {
			mySiema.next()
		});
		// siemaAutoplay(5000, mySiema, siema);
	}
}

function loadCandidatesCarousel() 
{
	var siema = document.getElementById('siema-carousel-candidates');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel-candidates',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev-candidates').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next-candidates').addEventListener('click', function() {
			mySiema.next()
		});
		// siemaAutoplay(5000, mySiema, siema);
	}
}