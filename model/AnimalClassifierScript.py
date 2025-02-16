import base64
import cv2
import numpy as np
import tensorflow as tf

def make_prediction(encoded_image):
    # Load the trained model
    loaded_model = tf.keras.models.load_model("animal_classification_model.keras")
    decoded_image = base64.b64decode(encoded_image)
    # Convert the decoded byte data back into an image
    nparr = np.frombuffer(decoded_image, np.uint8)
    decoded_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    decoded_image = cv2.resize(decoded_image, (128, 128))
    decoded_image = decoded_image / 255.0  # Rescale pixel values

    # Expand dimensions to match the batch format expected by TensorFlow
    decoded_image = np.expand_dims(decoded_image, axis=0)  # Shape becomes (1, 128, 128, 3)

    # Show the image
    pred_img = loaded_model.predict(decoded_image)

    predicted_class = np.argmax(pred_img)  # Index of the highest probability class

    # Map index to class name
    class_names = ['bald_eagle', 'bighorn_sheep', 'bison', 'black_bear', 'burrowing_owl', 'canada_goose_bird', 'caribou', 
                'cougar', 'elk', 'golden_eagle', 'great_horned_owl', 'grizzly_bear', 'lynx', 'moose', 'mountain_goat', 
                'mule_deer', 'pine_marten', 'river_otter', 'snow_goose', 'white_tail_deer', 'wolf']

    predicted_label = class_names[predicted_class]
    return predicted_label
