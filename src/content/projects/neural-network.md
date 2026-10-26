---
title: neural-network
blurb: A neural network written from scratch in C++17 with no ML libraries. A multilayer perceptron with its own matrix class, hand-derived backpropagation and plain SGD, trained on MNIST handwritten digits to 98.33% test accuracy.
year: '2026'
order: 3
tech: [C++17, Backpropagation, SGD, MNIST, Gradient check, CMake]
repo: https://github.com/SohelDaniel/neural-network
cover: ../../assets/projects/nn-mnist.png
coverAlt: A grid of handwritten digits from the MNIST test set
stats:
  - { value: '98.33%', label: 'test accuracy' }
  - { value: '109k', label: 'parameters' }
  - { value: '~4.7 s', label: 'per epoch' }
  - { value: '0', label: 'ML libraries' }
---

- **Everything by hand.** The IDX file reader, the matrix class, ReLU, softmax and the backward pass are all written from the math, using only the C++ standard library. Network: 784 → 128 → 64 → 10.
- **Numerically careful.** Softmax and cross-entropy are differentiated together so the gradient collapses to `ŷ − y` with no division, softmax subtracts the max so `exp` can't overflow, and weights use He initialization.
- **Backprop is tested.** A gradient check compares backprop's weight gradients in every layer against central finite differences, alongside unit tests for the matrix operations.
- **Fast and reproducible.** Cache-friendly loop order, in-place SGD updates and no transposed copies in the hot path. One seed drives initialization, shuffling and augmentation, so the same seed gives the same run.
