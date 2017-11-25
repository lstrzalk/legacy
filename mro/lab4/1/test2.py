import numpy as np
import pylab as pl
from sklearn.cluster import KMeans
from scipy.spatial import distance
from PIL import Image
import csv
from operator import itemgetter
from sklearn.metrics import silhouette_samples, silhouette_score

K = 9
H = 195
W = 134
I = 100

def compute_s(i, x, labels, clusters):
    	norm_c= len(clusters)
	s = 0
	for x in clusters:
		# print x
		s += distance.euclidean(x, clusters[i])
	return s

def compute_Rij(i, j, x, labels, clusters, nc):
	Rij = 0
	try:
		# print "h"
		d = distance.euclidean(clusters[i],clusters[j])
		# print d
		Rij = (compute_s(i, x, labels, clusters) + compute_s(j, x, labels, clusters))/d
		# print Rij
	except:
		Rij = 0	
	return Rij

def compute_R(i, x, labels, clusters, nc): 
	list_r = []
	for i in range(nc):
		for j in range(nc):
			if(i!=j):
				temp = compute_Rij(i, j, x, labels, clusters, nc)
				list_r.append(temp)

	return max(list_r)

def compute_DB_index(x, labels, clusters, nc):
	# print x
	sigma_R = 0.0
	for i in range(nc):
		sigma_R = sigma_R + compute_R(i, x, labels, clusters, nc)

	DB_index = float(sigma_R)/float(nc)
	return DB_index

def getRandomPoints():
    cent = np.random.random((K,2))
    cent[:,0] = cent[:,0]*W
    cent[:,1] = cent[:,1]*H
    return cent
def getRandomClasses(points):
    classes = np.random.randint(K, size = (len(points,)))
    newData = np.c_[points, classes]
    # print sorted(newData,key=itemgetter(2))
    # print newData
    tempDict = {};
    for i in range(0, K):
        tempDict[i]=[]
    for i in range(len(newData)-1):
        tempDict[int(newData[i][2])].append(newData[i])
    centers = []
    for i in range(0,K):
        d = np.array(list(tempDict[i]))
        centers.append([np.mean(d.astype(int)[:,0]), np.mean(d.astype(int)[:,1])])
    return np.array(list(centers)).astype(int)

    #     np.array(i)
    #     print(i[:,0])
        # print np.mean(i[:,0])


with open('data', 'rb') as csvfile:
    lines = csv.reader(csvfile)
    dataset = np.array(list(lines))
    for x in range(len(dataset)-1):
        for y in range(len(dataset[x])-1):
            dataset[x][y] = int(dataset[x][y])
    newData = np.c_[dataset[:,0], dataset[:,1]]
    # kMeans = KMeans(n_clusters = K, init = getRandomPoints())
    # kMeans = KMeans(n_clusters = K, init = getRandomClasses(newData))
    # kMeans = KMeans(n_clusters = K, init = 'random')
    # kMeans = KMeans(n_clusters = K, init = 'k-means++')
    # kMeans.fit(newData)
    # ind = compute_DB_index(newData, kMeans.labels_, kMeans.cluster_centers_, K)
    error = []
    mean = []
    for i in range(4):
        cl = 'k-means++'
        if i == 0: cl = 'random'
        elif i == 1: cl = 'k-means++'
        elif i == 2: cl = getRandomPoints()
        elif i == 3: cl = getRandomClasses(newData)
        # print i
        # print cl
        errors = []
        for j in range(I):
            kMeans = KMeans(n_clusters = K, init = cl)
            kMeans.fit(newData)
            errors.append(compute_DB_index(newData, kMeans.labels_, kMeans.cluster_centers_, K))
            kMeans = None
        error.append(np.std(errors))
        mean.append(np.mean(errors))
    print error
    print mean
     # fig = pl.figure()
    f, ((ax1, ax2), (ax3, ax4)) = pl.subplots(2, 2, sharex='col', sharey='row')
    axs = [ax1, ax2, ax3, ax4]
    for a in axs:
        a.set_ylim([0, len(newData) + (K + 1) * 10])
    for i in range(4):
        cl = 'k-means++'
        if i == 0: cl = 'random'
        elif i == 1: cl = 'k-means++'
        elif i == 2: cl = getRandomPoints()
        elif i == 3: cl = getRandomClasses(newData)
        kMeans = KMeans(n_clusters = K, init = cl)
        kMeans.fit(newData)
        silhouette_avg = silhouette_score(newData, kMeans.labels_)
        sample_silhouette_values = silhouette_samples(newData, kMeans.labels_)
        # ax = fig.add_subplot(1, 1, 1)
        y_lower = 10
        # ax.set_ylim([0, len(newData) + (K + 1) * 10])
        colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7','#3F51B5', '#2196F3', '#4CAF50', '#FFC107', '#FF5722']
        for k, col in zip(range(K), colors):
            sample_values = sample_silhouette_values[kMeans.labels_ == k]
            sample_values.sort()
            size_cluster = sample_values.shape[0]
            y_upper = y_lower + size_cluster
            axs[i].fill_betweenx(np.arange(y_lower, y_upper),0, sample_values,facecolor=col, edgecolor=col, alpha=0.7)
            y_lower = y_upper + 10
        axs[i].axvline(x=silhouette_avg, color="red", linestyle="--")
        name = 'forgy'
        if i == 0: name = 'forgy'
        elif i == 1: name = 'k-means++'
        elif i == 2: name = 'random'
        elif i == 3: name = 'random partition'
        axs[i].set_title(name)



    # colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7','#3F51B5', '#2196F3', '#4CAF50', '#FFC107', '#FF5722']
    # fig = pl.figure()
    # ax = fig.add_subplot(1, 1, 1)
    # for k, col in zip(range(K), colors):
    #     my_members = kMeans.labels_ == k
    #     cluster_center = kMeans.cluster_centers_[k]
    #     ax.plot(newData[my_members, 0], newData[my_members, 1], 'w',markerfacecolor=col, marker='.')
    #     ax.plot(cluster_center[0], cluster_center[1], 'o', markerfacecolor=col,markeredgecolor='k', markersize=6)

    pl.show()