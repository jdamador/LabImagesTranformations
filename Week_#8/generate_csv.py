import cv2, os
import numpy as np
import csv
import glob

listNames = ['Brandon', 'CarlosC', 'Daniel Amador', 'Danilo', 'Diego', 'Fabian', 'Fabian Zamora', 'Jason', 'Javier', 'Jonathan', 'Kevin S', 'Leo', 'Miguel', 'Randald', 'Rodolfo', 'Rogelio', 'Warner']


label = listNames[16]
dirList = glob.glob("img_src/%s/*.jpeg" % (label))

for img_path in dirList:
      file_name = img_path.split("/")[1]
      print(file_name)

      im = cv2.imread(img_path)
      im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
      im_gray = cv2.GaussianBlur(im_gray, (15, 15), 0)
      roi = cv2.resize(im_gray, (28, 28), interpolation = cv2.INTER_AREA)
      
      data = []
      data.append(label)
      rows, cols = roi.shape

      for i in range(rows) :
            for j in range(cols):
                  k = roi[i, j]
                  if k > 100:
                        k = 1
                  else:
                        k = 0
                  data.append(k)
      # header = ["label"]
      # for i in range(0, 784):
      #       header.append("pixel"+str(i))
      # print(header)

      with open('personas.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(data)
      








