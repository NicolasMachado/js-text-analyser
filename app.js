function listenSubmit(){
	$('#js-analyzer-form').submit(function(e){
        e.preventDefault();
		var textToAnalyze = $('#js-analyzer-text-area').val();
		var resultsObj = processText(textToAnalyze);
		displayResult(resultsObj);
	});
}

function displayResult(resultObj) {
	// show report section
	$('.text-report').removeClass('hidden');
	// insert results text
	$('.js-word-count').text(resultObj.wordCount);
	$('.js-unique-word-count').text(resultObj.uniqueWordCount);
	$('.js-average-word-length').text(resultObj.avgWordLength.toFixed(2));
	$('.js-average-sentence-length').text(resultObj.avgSentenceLength.toFixed(2));
}

function processText(text) {
	var uniqueWords = {};
	var wordCount = 0;
	var letterCount = 0;
	var sentenceCount = 0;
	var uniqueWordCount = 0;

	// remove all punctuations, linebreaks and trailing spaces and add "#punc#" instead of punctuation
	var strippedText = text.replace(/[,\/#$%\^&\*:{}=\_`~()]/g,"").replace(/[.!;?]/g," #punc#").replace(/\s{2,}/g," ").replace(/(\r\n|\n|\r)/gm," ").trim();
	var wordArray = strippedText.split(' ');

	// loops through array and get counts
	for (var i=0; i < wordArray.length; i++) {
		var word = wordArray[i];
		// count sentences
		if (word === "#punc#") {
			sentenceCount++;
			continue;
		}
		// total word count
		wordCount++;
		// total char length count
		letterCount+=word.length;
		// unique word count
		if (!uniqueWords[word]){
			uniqueWords[word] = 1;
			uniqueWordCount++;
		}
	}
	// enter results in return object
	return {
		'wordCount' : wordCount,
		'avgWordLength' : letterCount/wordCount,
		'uniqueWordCount' : uniqueWordCount,
		'avgSentenceLength' : sentenceCount > 0 ? wordCount/sentenceCount : wordCount/1
	};
}

$(function() {
	listenSubmit();
});