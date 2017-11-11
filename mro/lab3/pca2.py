import csv
import numpy as np
from sklearn.decomposition import KernelPCA
# from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
with open('iris.data', 'rb') as csvfile:
    lines = csv.reader(csvfile)
    dataset = np.array(list(lines))
    for x in range(len(dataset)-1):
        for y in range(len(dataset[x])-1):
            dataset[x][y] = int(dataset[x][y])
    newData = np.c_[dataset[:,0], dataset[:,1]]
    pca = KernelPCA(n_components=2, kernel='cosine')
    # pca = PCA(n_components=2)
    newData = pca.fit_transform(newData)
    newData = np.c_[newData[:,0], newData[:,1], dataset[:,2]]
    fig = plt.figure()
    ax = fig.add_subplot(111)
    for i in newData:
        marker = 'o'
        color = 'y'
        if i[2] == '0':
            color = 'r'
        elif i[2] == '1':
            color = 'g'
        elif i[2] == '2':
            color = 'b'
        ax.scatter(i[0], i[1], c=color, marker=marker)
        
    # ax.quiver(pca.explained_variance_ratio_, pca.components_[0], pca.components_[1])
    # ax.quiver(pca.components_[0], pca.components_[1], pca.components_[0]*pca.explained_variance_ratio_[0],pca.components_[1]*pca.explained_variance_ratio_[1],color = '#FF29C5')
    plt.show()
    # print pca.X_transformed_fit_
    # print pca.X_fit_
    # print pca.get_params(deep=True)