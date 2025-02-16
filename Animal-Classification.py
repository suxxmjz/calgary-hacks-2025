import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix , classification_report
import numpy as np
import os
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense



directory = "images_train"
test_directory = "images_test"

image_height = 64
image_width = 64

ds_train, ds_validation = keras.preprocessing.image_dataset_from_directory(
    directory,
    labels = 'inferred',
    label_mode = 'int',
    class_names = ['bald_eagle', 'bighorn_sheep', 'bison', 'black_bear', 'burrowing_owl', 'canada_goose_bird', 'caribou', 'cougar',
                    'elk', 'golden_eagle' ],
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
for subfolder in os.listdir(test_directory):
    for i in range(len(subfolder)):
        test_labels.append(str(subfolder))

test_images = []
for subfolder in os.listdir(test_directory):
    for image in subfolder:
        test_labels.append(image)

AUTOTUNE = tf.data.AUTOTUNE

ds_train = ds_train.cache().shuffle(2200).prefetch(buffer_size=AUTOTUNE)
ds_validation = ds_validation.cache().prefetch(buffer_size=AUTOTUNE)

num_classes = len(class_names)

import tensorflow as tf

# Set parameters for your 180x180 images
num_classes = 21

data_augmentation = tf.keras.models.Sequential(
  [
    tf.keras.layers.RandomFlip("horizontal",
    input_shape=(image_height,image_width,3)),
    tf.keras.layers.RandomRotation(0.3),
    tf.keras.layers.RandomZoom(0.3),
  ]
)

model = tf.keras.models.Sequential([
    # data_augmentation,
    # Conv2D(32, (3,3), activation='relu', input_shape=(128, 128, 3)),
    # MaxPooling2D((2,2)),

    # Conv2D(64, (3,3), activation='relu'),
    # MaxPooling2D((2,2)),

    # Conv2D(128, (3,3), activation='relu'),
    # MaxPooling2D((2,2)),

    # Flatten(),
    # Dense(128, activation='relu'),  # Match to the output of Flatten
    # Dense(10, activation='softmax')
    # Input preprocessing
    # tf.keras.layers.Rescaling(1./255, input_shape=(image_height, image_width, 3)),
    
    # # Architecture adjusted for 180x180 input
    # tf.keras.layers.Conv2D(32, (4,4), strides=(2,2), padding='same', activation='relu'),
    # tf.keras.layers.MaxPooling2D((2, 2)),
    
    # tf.keras.layers.Conv2D(64, (4,4), padding='same', activation='relu'),
    # tf.keras.layers.MaxPooling2D((2, 2)),
    
    # # Regularization
    # tf.keras.layers.Dropout(0.60),
    
    # # Classification head
    # tf.keras.layers.Flatten(),
    # tf.keras.layers.Dense(128, activation='relu'),
    # tf.keras.layers.Dense(num_classes)
])
data_augmentation = tf.keras.models.Sequential(
  [
    tf.keras.layers.RandomFlip("horizontal",
    input_shape=(image_height,image_width,3)),
    tf.keras.layers.RandomRotation(0.5),
    tf.keras.layers.RandomZoom(0.5),
  ]
)


model = tf.keras.models.Sequential([
    data_augmentation,
    tf.keras.layers.Rescaling(1./255, input_shape=(image_height, image_width, 3)),
    tf.keras.layers.Conv2D(16, (4,4), padding='same', activation='relu'),
    tf.keras.layers.Conv2D(32, (4,4), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (4,4), padding='same', activation='relu'),
    tf.keras.layers.Conv2D(64, (4,4), padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Dropout(0.10),
    tf.keras.layers.Flatten(input_shape=(image_height, image_width)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.10),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    metrics=['sparse_categorical_accuracy']
)

model.summary()


# early_stopping = EarlyStopping(
#     monitor='val_loss',          # Monitor validation loss (you could also monitor 'val_accuracy')
#     patience=5,                  # Stop after 5 epochs without improvement
#     restore_best_weights=True    # Restore the model weights from the best epoch
# )

# # Compile the model
# model.compile(
#     optimizer=tf.keras.optimizers.Adam(0.001),
#     loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
#     metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
# )

# Train the model with EarlyStopping callback
history = model.fit(
    ds_train,
    epochs=90,
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

