import os
import tempfile
from flask import Flask, request, jsonify
import AnimalClassifierScript  # Import your script that processes the image

app = Flask(__name__)

@app.route('/get-prediction', methods=['POST'])
def make_prediction():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'error': 'No image provided in JSON data'}), 400

    image_base64 = data['image']
    try:
        # Pass the temporary file's path to your script for processing
        result = AnimalClassifierScript.make_prediction(image_base64)
    except:
        return jsonify({'error': 'Prediction failed'}), 400
    # Return the result as a JSON response
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')