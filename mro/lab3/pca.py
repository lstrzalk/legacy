import numpy as np
from mpl_toolkits.mplot3d import Axes3D
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from random import uniform
dims = 13
series = 2000
pointA = np.array([[0.5]*dims])
r = 0.5
def eucLen(a):
    return np.sqrt(np.sum((a - pointA)**2))
def printPlot(data, dim,classes):
    fig = plt.figure()
    ax = fig.add_subplot(111)
    if dim is False:
        ax = fig.add_subplot(111, projection='3d')
        ax.set_zlim([0, 1])
        ax.set_zlabel('Z Label')
    # ax.set_xlim([0, 1])
    # ax.set_ylim([0, 1])
    for i in range(len(data)-1):
        color = 'r'
        marker = 'o'
        if classes[i] == 0:
            color = 'g'
            marker = 'o'
        elif classes[i] == 1:
            color = 'b'
            marker = 'o'
        if dim:
            ax.scatter(data[i][0], data[i][1], c=color, marker=marker)
        else:
            ax.scatter(i[0], i[1], i[2], c=color, marker=marker)
    ax.set_xlabel('X Label')
    ax.set_ylabel('Y Label')
    plt.show()
# X = np.array([[-1, -1, -1], [-2, -1, 0], [-3, -2, -1], [1, 1, 1], [2, 1, 0], [3, 2, 1]])
pca = PCA(n_components=2)
# print ipca.fit_transform(X)
classes = []
data = np.random.random((series,dims))
for i in range(len(data)-1):
    el = eucLen(data[i])
    if el <= r:
        classes.append(0)
    elif el > r and el < 0.6:
        classes.append(1)
    else:
        classes.append(2)
data = pca.fit_transform(data)
pointA = pca.transform(pointA)
# print data
printPlot(data, True,classes)