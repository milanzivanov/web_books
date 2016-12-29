// Full list of configuration options available at: https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	controls: false,
	progress: true,
	history: true,
	center: true,
	slideNumber: true,

	transition: 'convex', // none/fade/slide/convex/concave/zoom

	// Optional reveal.js plugins
	dependencies: [
		{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
		{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src: 'plugin/zoom-js/zoom.js', async: true },
		{ src: 'plugin/notes/notes.js', async: true }
	]
});

var subsections = {}

$(document).ready(function(e) {
	// Insert the custon dashed border after every element with 'dashed' class
	$(".dashed").each(function() {
		$("<div class='dashes'></div>").insertAfter($(this));
	});

	$("section[data-section]").each(function(e) {
		var sectionName = $(this).attr("data-section");
		if(typeof sectionName != "undefined") {
			var count = $("section[data-section='" + sectionName + "']").length;
			subsections[sectionName] = count;
		}
	});

	// Add subsection number to subsections titles
	for(var sectionName in subsections) {
		var counter = 1;
		$("section[data-section='" + sectionName + "']").each(function() {
			var numberSpan = $("<span class='section_number brackets'></span>");
			numberSpan.text(counter + "/" + subsections[sectionName]);
			$(this).find("h2").append(numberSpan);
			counter++;
		});
	}

	// Eclose the main slide subtitle in brackets
	$(".brackets").each(function(e) {
		var openBracket = $("<span class='brackets'>[</span>");
		var closeBracket = $("<span class='brackets'>]</span>");
		var text = $(this).text()
		$(this).empty();
		$(this).append(openBracket);
		$(this).append(text);
		$(this).append(closeBracket);
	});
});
