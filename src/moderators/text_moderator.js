async function moderate(text) {
  const result = await perspective.analyze(text,{attributes: ['spam','profanity','flirtation','insult','threat','sexually_explicit']});
  var data = JSON.parse(JSON.stringify(result, null, 2));
  var attribute=data["attributeScores"]
    predicted_value = {
            'threat':attribute["THREAT"].summaryScore.value,
            'profanity':attribute["PROFANITY"].summaryScore.value,
            'insult':attribute["INSULT"].summaryScore.value,
            // 'unsubstantial':attribute["UNSUBSTANTIAL"].summaryScore.value,
            'spam':attribute["SPAM"].summaryScore.value,
            'flirtation':attribute["FLIRTATION"].summaryScore.value,
            'sexually_explicit':attribute["SEXUALLY_EXPLICIT"].summaryScore.value
    }
    return predicted_value
}

module.exports = {moderate};