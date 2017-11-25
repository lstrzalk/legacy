# Copyright Mathieu Blondel December 2011
# License: BSD 3 clause

import numpy as np
import pylab as pl

from sklearn.base import BaseEstimator
from sklearn.utils import check_random_state
from sklearn.cluster import MiniBatchKMeans
from sklearn.cluster import KMeans as KMeansGood
from sklearn.metrics.pairwise import euclidean_distances, manhattan_distances
from sklearn.decomposition import PCA
from sklearn.datasets.samples_generator import make_blobs
from PIL import Image

##############################################################################
# Generate sample data
# np.random.seed(0)

img = Image.open('assets/wood4.jpg')
arr = np.array(img) 
X =  np.reshape(arr, (len(arr)*len(arr[0]), 3))

batch_size = 45
K = 5
dim = 3
centers = np.random.random((dim,K))
n_clusters = len(centers)
# X, labels_true = make_blobs(n_samples=1200, centers=centers, cluster_std=0.3)
# X = np.random.random((200,K))
def rgb2hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)
class KMedians(BaseEstimator):
    
    def __init__(self, k, max_iter=100, random_state=0, tol=1e-4):
        self.k = k
        self.max_iter = max_iter
        self.random_state = random_state
        self.tol = tol

    def _e_step(self, X):
        self.labels_ = manhattan_distances(X, self.cluster_centers_).argmin(axis=1)

    def _average(self, X):
        return np.median(X, axis=0)

    def _m_step(self, X):
        X_center = None
        for center_id in range(self.k):
            center_mask = self.labels_ == center_id
            if not np.any(center_mask):
                # The centroid of empty clusters is set to the center of
                # everything
                if X_center is None:
                    X_center = self._average(X)
                self.cluster_centers_[center_id] = X_center
            else:
                self.cluster_centers_[center_id] = \
                    self._average(X[center_mask])

    def fit(self, X, y=None):
        n_samples = X.shape[0]
        vdata = np.mean(np.var(X, 0))

        random_state = check_random_state(self.random_state)
        self.labels_ = random_state.permutation(n_samples)[:self.k]
        self.cluster_centers_ = X[self.labels_]

        for i in xrange(self.max_iter):
            centers_old = self.cluster_centers_.copy()

            self._e_step(X)
            self._m_step(X)

            if np.sum((centers_old - self.cluster_centers_) ** 2) < self.tol * vdata:
                break

        return self


kmedians = KMedians(k=K)
kmedians.fit(X)
print kmedians.labels_


fig = pl.figure()
colors = []
for c in kmedians.cluster_centers_:
    colors.append(rgb2hex(c[0], c[1], c[2])) 



pca = PCA(n_components=2)
X = pca.fit_transform(X)
kmedians.cluster_centers_ = pca.transform(kmedians.cluster_centers_)
ax = fig.add_subplot(1, 1, 1)
for k, col in zip(range(kmedians.k), colors):
    my_members = kmedians.labels_ == k
    cluster_center = kmedians.cluster_centers_[k]
    ax.plot(X[my_members, 0], X[my_members, 1], 'w',
            markerfacecolor=col, marker='.')
    ax.plot(cluster_center[0], cluster_center[1], 'o', markerfacecolor=col,
                                    markeredgecolor='k', markersize=6)
ax.set_title(kmedians.__class__.__name__)

pl.show()