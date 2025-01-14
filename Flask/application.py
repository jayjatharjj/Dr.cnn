from flask import Flask
from flask_cors import CORS
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
from keras.applications import InceptionV3
from keras.applications import ResNet50
import glob
import cv2
import numpy as np
from keras import optimizers
from sklearn.utils import class_weight
from sklearn.metrics import confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
from keras.models import model_from_json
import argparse

application = Flask(__name__)
CORS(application)
init_g = tf.compat.v1.global_variables_initializer()
init_l = tf.compat.v1.local_variables_initializer()
parser = argparse.ArgumentParser()
parser.add_argument('-a', '--all', help='Run algorithm on all images', action = 'store_true')
parser.add_argument('-i', '--image', help='Run algorithm on single image')
args = parser.parse_args()


@application.route("/single")
def single_predict():
    img = cv2.imread('/home/jay/Downloads/image.png')
    wd, ht = 100, 100
    im = cv2.resize(img, (wd, ht))
    X_new = []
    X_new.append(im)
    X_new = np.array(X_new)

    print('Started Loading AI models')
    json_file = open('ResNet50_SEG_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model1 = model_from_json(loaded_model_json)
    base_model1.load_weights('ResNet50_SEG_E50.h5')
    print('Loaded Model 1 of 3')

    json_file = open('ResNet50_SEG134_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model2 = model_from_json(loaded_model_json)
    base_model2.load_weights('ResNet50_SEG134_E50.h5')
    print('Loaded Model 2 of 3')

    json_file = open('ResNet50_SEG34_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model3 = model_from_json(loaded_model_json)
    base_model3.load_weights('ResNet50_SEG34_E50.h5')
    print('Loaded Model 3 of 3')

    vr_indices1p = base_model1.predict(X_new, verbose = 0)
    vr_indices1 = np.argmax(vr_indices1p, axis = 1)

    vr_indices2p = base_model2.predict(X_new, verbose = 0)
    vr_indices2 = np.argmax(vr_indices2p, axis = 1)

    vr_indices3p = base_model3.predict(X_new, verbose = 0)
    vr_indices3 = np.argmax(vr_indices3p, axis = 1)

    indices = np.argmax(vr_indices1p, axis = 1)
    for i in range(len(vr_indices1)):
        if vr_indices2[i] == 0:
            if vr_indices1[i] == 0:
                indices[i] = 0
            elif vr_indices1[i] == 1:
                indices[i] = 1
            else:
                indices[i] = 2
        else:
            if vr_indices3[i] == 0:
                indices[i] = 3
            else:
                indices[i] = 4
    os.remove('/home/jay/Downloads/image.png')

    if indices[0] == 0:
        return {"result" : "No DR"}
    elif indices[0] == 1:
        return {"result" : "Mild DR"}
    elif indices[0] == 2:
        return {"result" : "Moderate DR"}
    elif indices[0] == 3:
        return {"result" : "Severe DR"}
    else:
        return {"result" : "Proliferative DR"}
    

def datasetCreate(TR_0_folder, TR_1_folder, TR_2_folder, TR_3_folder, TR_4_folder):
    
    wd, ht = 100, 100
    X_train =[]
    Y_train =[]
    
    for image_file in glob.iglob(TR_0_folder+  "*.png"):
        im = cv2.resize(cv2.imread(image_file),(wd, ht))
        #im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        X_train.append(im)
        Y_train.append([1, 0, 0, 0, 0])
        #print(image_file)
    
    for image_file in glob.iglob(TR_1_folder+  "*.png"):
        im = cv2.resize(cv2.imread(image_file),(wd, ht))
        #im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        X_train.append(im)
        Y_train.append([0, 1, 0, 0, 0])
        #print(image_file)
        
    for image_file in glob.iglob(TR_2_folder+  "*.png"):
        im = cv2.resize(cv2.imread(image_file),(wd, ht))
        #im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        X_train.append(im)
        Y_train.append([0, 0, 1, 0, 0])
        #print(image_file)
		
    for image_file in glob.iglob(TR_3_folder+  "*.png"):
        im = cv2.resize(cv2.imread(image_file),(wd, ht))
        #im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        X_train.append(im)
        Y_train.append([0, 0, 0, 1, 0])
        #print(image_file)
		
    for image_file in glob.iglob(TR_4_folder+  "*.png"):
        im = cv2.resize(cv2.imread(image_file),(wd, ht))
        #im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        X_train.append(im)
        Y_train.append([0, 0, 0, 0, 1])
        #print(image_file)
        
    return X_train, Y_train

@application.route("/all")
def predict_all():
    TR_0_folder = "training/0/"
    TR_1_folder = "training/1/"
    TR_2_folder = "training/2/"
    TR_3_folder = "training/3/"
    TR_4_folder = "training/4/"

    print('Started Loading all Images...')
    X_train, labels = datasetCreate(TR_0_folder, TR_1_folder, TR_2_folder, TR_3_folder, TR_4_folder)
    X_train = np.array(X_train)
    labels = np.array(labels)
    tr_indices = np.argmax(labels, axis = 1)
    print('Successfully Loaded All Images')

    print('Started Loading AI models')
    json_file = open('ResNet50_SEG_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model1 = model_from_json(loaded_model_json)
    base_model1.load_weights('ResNet50_SEG_E50.h5')
    print('Loaded Model 1 of 3')

    json_file = open('ResNet50_SEG134_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model2 = model_from_json(loaded_model_json)
    base_model2.load_weights('ResNet50_SEG134_E50.h5')
    print('Loaded Model 2 of 3')

    json_file = open('ResNet50_SEG34_E50.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    base_model3 = model_from_json(loaded_model_json)
    base_model3.load_weights('ResNet50_SEG34_E50.h5')
    print('Loaded Model 3 of 3')

    vr_indices1p = base_model1.predict(X_train, verbose = 0)
    vr_indices1 = np.argmax(vr_indices1p, axis = 1)

    vr_indices2p = base_model2.predict(X_train, verbose = 0)
    vr_indices2 = np.argmax(vr_indices2p, axis = 1)

    vr_indices3p = base_model3.predict(X_train, verbose = 0)
    vr_indices3 = np.argmax(vr_indices3p, axis = 1)

    indices = np.argmax(vr_indices1p, axis = 1)
    for i in range(len(vr_indices1)):
        if vr_indices2[i] == 0:
            if vr_indices1[i] == 0:
                indices[i] = 0
            elif vr_indices1[i] == 1:
                indices[i] = 1
            else:
                indices[i] = 2
        else:
            if vr_indices3[i] == 0:
                indices[i] = 3
            else:
                indices[i] = 4

    cm = confusion_matrix(tr_indices, indices)
    print('CONFUSION MATRIX : ')
    print(cm)
    dict = {}
    dict["c1"] = str(cm[0])
    dict["c2"] = str(cm[1])
    dict["c3"] = str(cm[2])
    dict["c4"] = str(cm[3])
    dict["c5"] = str(cm[4])
    acc_tr = accuracy_score(tr_indices, indices)
    dict["acc"] = acc_tr*100
    print('ACCURACY : ', acc_tr)
    res = "Confusion Matrix : " + str(cm) + " Accuracy : " + str(acc_tr)
    return dict

if __name__ == "__main__":
    application.run(debug=False)
