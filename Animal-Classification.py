import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix , classification_report
import numpy as np
import os

directory = "images"
test_directory = "images_test"

image_height = 180
image_width = 180

ds_train, ds_validation = keras.preprocessing.image_dataset_from_directory(
    directory,
    labels = 'inferred',
    label_mode = 'int',
    class_names = ['bald_eagle', 'bighorn_sheep', 'bison', 'black_bear', 'burrowing_owl', 'canada_goose_bird', 'caribou', 'cougar',
                    'elk', 'golden_eagle', 'great_horned_owl', 'grizzly_bear', 'lynx', 'moose', 'mountain_goat', 'mule_deer', 
                    'pine_marten', 'river_otter', 'snow_goose', 'white_tail_deer', 'wolf' ],
    batch_size = 32,
    image_size = (image_height, image_width),
    shuffle = True,
    seed = 50,
    validation_split = 0.20,
    subset = "both"
)

class_names = ds_train.class_names
plt.figure()
for images, labels in ds_train.take(1):
    for i in range(30):
        plt.subplot(5,6, i+1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")
plt.show()

test_labels = []
for label in class_names:
    for i in range(5):
        test_labels.append(label)

AUTOTUNE = tf.data.AUTOTUNE

ds_train = ds_train.cache().shuffle(2200).prefetch(buffer_size=AUTOTUNE)
ds_validation = ds_validation.cache().prefetch(buffer_size=AUTOTUNE)

num_classes = len(class_names)

model = tf.keras.models.Sequential([
    tf.keras.layers.Rescaling(1./255, input_shape=(image_height, image_length, 3)),
    tf.keras.layers.Conv2D(32, (4,4), strides=(2,2), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (4,4), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(128, (4,4), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(256, (4,4), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Dropout(0.50),
    tf.keras.layers.Flatten(input_shape=(image_height, image_length)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(num_classes)
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(0.001),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
)
model.summary()

history = model.fit(
    ds_train,
    epochs=40,
    validation_data=ds_validation,
)

plt.plot(history.history['sparse_categorical_accuracy'])
plt.plot(history.history['val_sparse_categorical_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(["Training", "Validation"])
plt.show()

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(["Training", "Validation"])
plt.show()

test_images = []
for index, file in enumerate(os.listdir(test_directory)):
    image = os.path.join(test_directory, file)
    image = tf.keras.utils.load_img(image, target_size=(image_height, image_length))
    img_array = tf.keras.utils.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)
    test_images.append(img_array)

classified = 0
for index, image in enumerate(test_images):
    prediction = model.predict(image)
    target = test_labels[index]
    actual = class_names[np.argmax(prediction)]
    print("Target:", target)
    print("Actual:", actual)
    if target == actual:
        classified += 1
accuracy = (classified/105)*100
print("Accuracy:", accuracy, "%")

