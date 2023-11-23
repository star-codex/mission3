async function runCustomVisionScript(imageBuffer) {
	const endpoint =
		'https://mission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/d8f7a9c4-56bb-47a8-a5c0-e54aacf609b4/classify/iterations/Iteration1/image';
	const predictionKey = '50ab9f0209fd4103a5162ba944759145';

	try {
		const formData = new FormData();
		formData.append('file.buffer', new Blob([imageBuffer]));

		const response = await fetch(endpoint, {
			body: formData,
			headers: {
				'Prediction-Key': predictionKey,
			},
		});

		const result = await response.json();

		console.log(result);

		// Extract the tagName and probability fields only
		const predictions = result.predictions.map(({ tagName, probability }) => ({
			tagName,
			probability,
		}));

		return { predictions };
	} catch (error) {
		console.error('Error making API request:', error);

		if (error.response && error.response.body) {
			console.error('API Response:', error.response.body);
		}

		throw new Error('Error making API request');
	}
}

module.exports = runCustomVisionScript;
