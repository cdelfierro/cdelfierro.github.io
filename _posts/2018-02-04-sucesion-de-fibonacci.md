---
title: Calculando números de la sucesión de Fibonacci
description: "Los números de Fibonacci se definen mediante una ecuación de recurrencia.
Para calcular un número \\(n\\) en la sucesión se muestran dos algoritmos: uno recursivo
y uno lineal y se comparan de acuerdo a su tiempo de ejecución mediante análisis
de crecimiento asintótico."
date: 04-02-2018 23:28:03 -0300
mathjax: true
categories:
- algoritmos
tags:
- fibonacci
- algoritmos
- sucesiones
- recursión
- análisis asintótico
---

# Números de Fibonacci

Los **_números de Fibonacci_** se definen mediante la siguiente secuencia

$$
\begin{align}
    F_0 &= 0 \\
    F_1 &= 1 \\
    F_n &= F_{n - 1} + F_{n - 2} \quad \text{para } n \geq 2
\end{align}
$$

Así, cada número de Fibonacci es la suma de los dos anteriores, produciendo la
secuencia

$$ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55\ldots $$

# Algoritmo recursivo

Dado un número positivo \\( n \\), queremos calcular \\(F_n \\). Una primera
aproximación es utilizar el siguiente algoritmo:

{: #algoritmo-recursivo}
{% highlight python linenos%}
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
{% endhighlight %}


Un problema que podemos ver en este algoritmo al ejecutarlo es su _lentitud_, la cual se debe
a que repite mucho trabajo. Por ejemplo, si queremos calcular \\(F_5\\) el árbol
de llamadas a la función es el siguiente:

{% highlight text %}
fib(5)
├── fib(4)
|   ├── fib(3)
|   |   ├── fib(2)
|   |   |   ├── fib(1)
|   |   |   |   └── 1
|   |   |   └── fib(0)
|   |   |       └── 0
|   |   └── fib(1)
|   |       └── 1
|   └── fib(2)
|       ├── fib(1)
|       |   └── 1
|       └── fib(0)
|           └── 0
└── fib(3)
    ├── fib(2)
    |   ├── fib(1)
    |   |   └── 1
    |   └── fib(0)
    |       └── 0
    └── fib(1)
        └── 1
{% endhighlight %}

La llamada a `fib(5)` llama a `fib(4)` y `fib(3)`, pero la llamada a `fib(4)`
también llama a `fib(3)`. El valor retornado es el mismo para ambas llamadas
\\((F_3 = 2)\\), por lo que está repitiendo trabajo cada vez que vuelve a
llamar a la función con el mismo argumento y el algoritmo no tiene idea de que
esto está ocurriendo. Para el caso `fib(5)` podemos ver la cantidad de llamadas
de cada función en la siguiente tabla

| función | n° llamadas |
|:---------:|:-------------------:|
| `fib(5)` | 1 |
| `fib(4)` | 1 |
| `fib(3)` | 2 |
| `fib(2)` | 3 |
| `fib(1)` | 5 |
| `fib(0)` | 3 |

## Eficiencia asintótica del algoritmo recursivo

A medida que \\(n\\) va creciendo, el algoritmo recursivo es cada vez menos
eficiente, ya que las llamadas a una misma función van aumentando. Veremos el orden de
crecimiento del tiempo de ejecución analizando la _eficiencia asintótica_ del
algoritmo. El tiempo de ejecución está dado por la ecuación de recurrencia

$$ T(n) = T(n-1) + T(n-2) + \Theta(1) \tag{i} \label{i}$$

Esta ecuación nos muestra que tiempo de ejecución del algoritmo es
la suma de los tiempos de ejecución del algoritmo, evaluados en \\(n - 1\\) y \\(n - 2\\)
más un tiempo constante que representa la suma de los valores retornados por las
llamadas recursivas (línea 4 del [algoritmo](#algoritmo-recursivo)).

### Resolución de la ecuación de recurrencia

Utilizaremos el método de sustitución para resolver la ecuación \\(\eqref{i}\\).
Suponemos como hipótesis inductiva que el tiempo de ejecución es

$$ T(n) \leq aF_n - b, \quad \text{donde } a > 1 \land b < 0 \label{ii} \tag{ii}$$

y sustituimos en la ecuación \\(\eqref{i}\\) quedando

$$
\begin{align}
    T(n) &\leq (aF_{n-1} - b) + (aF_{n-2} - b) + \Theta(1) \label{ii.1} \tag{ii.1}\\
    &= a(F_{n-1} + F_{n-2}) -2b + \Theta(1)\\
    &= aF_n - b - (b - \Theta(1)) \label{ii.2} \tag{ii.2}\\
    &\leq aF_n - b \label{ii.3} \tag{ii.3}
\end{align}
$$

Elegimos un \\(b\\) lo suficientemente grande para dominar a \\(\Theta(1)\\) en
\\(\eqref{ii.2}\\) y satisfacer la desigualdad \\(\eqref{ii.3}\\), y un \\(a\\) también suficientemente
grande para satisfacer \\(\eqref{ii.1}\\).

### Relación con el número aúreo

La sucesión de Fibonacci puede ser representada como una _expresión de forma cerrada_
conocida como la **fórmula de Binet**

$$ F_n = \dfrac{\phi^n - \psi^n} {\sqrt{5}} $$

Donde \\(\phi\\) es el [número aúreo](https://es.wikipedia.org/wiki/Número_áureo)
y \\(\psi\\) su conjugado, definidos por \\(\phi = \frac{1 + \sqrt{5}}{2}\\) y
\\(\psi = \frac{1 - \sqrt{5}}{2}\\). Se puede ver fácilmente que \\(\lvert\psi\rvert < 1\\),
entonces tenemos que

$$ \dfrac{\lvert\psi^n\rvert}{\sqrt{5}} < \dfrac{1}{\sqrt{5}} < \dfrac{1}{2} $$

Esto significa que el aporte de \\(\psi\\) es menor a \\(\frac{1}{2}\\) en valor absoluto
y por lo tanto \\(F_i\\) es el entero más cercano a \\(\frac{\phi^n}{\sqrt{5}}\\),
lo que podemos escribir como

$$ F_n = \left\lfloor \dfrac{\phi^n}{\sqrt{5}} + \dfrac{1}{2} \right\rfloor \label{iii} \tag{iii}$$

Finalmente si reemplazamos \\(\eqref{iii}\\) en \\(\eqref{ii}\\) podemos concluir
que

$$ T(n) = \Theta(\phi^n) \label{iv} \tag{iv} $$

Lo que nos da un crecimiento exponencial parta el algoritmo recursivo, mostrando
por qué a medida que aumentamos el \\(n\\), el algoritmo es cada vez más lento.
Es necesario entonces que encontremos otra aproximación al problema.

# Algoritmo lineal

Una aproximación más eficiente a este problema es la siguiente:

{% highlight python linenos%}
def fib(n):
    a, b = 0, 1
    for __ in range(n - 1):
        a, b = b, a + b
    return b
{% endhighlight %}

Este algoritmo parte de los dos valores iniciales y va generando la secuencia a
medida que la va recorriendo, llevando el conteo sólo de los dos ultimos números.
Como recorre la secuencia solo una vez, también calcula cada número una vez por
lo que tiene un tiempo de ejecución del orden de \\( \Theta(n) \\), el cual es
muchísimo menor que el del algoritmo recursivo, descrito en la sección previa.

# Comparación empírica del tiempo de ejecución de ambos algoritmos

Finalmente se muestra una tabla no exhaustiva que muestra el tiempo en segundos
que se demora en calcular algunos números de Fibonacci para ambos algoritmos:

| n | Recursivo | Lineal |
|:-:|:---------:|:-------------------:|
|5| \\( 1.22 \times 10^{-5}\\) | \\( 9.78 \times 10^{-6}\\) |
|10| \\( 4.50 \times 10^{-5}\\) | \\( 1.03 \times 10^{-5}\\) |
|15| \\( 4.03 \times 10^{-4}\\) | \\( 1.12 \times 10^{-5}\\) |
|20| \\( 4.56 \times 10^{-3}\\) | \\( 1.32 \times 10^{-5}\\) |
|25| \\( 5.64 \times 10^{-2}\\) | \\( 1.17 \times 10^{-5}\\) |
|30| \\( 5.98 \times 10^{-1}\\) | \\( 1.37 \times 10^{-5}\\) |
|35| \\( 6.48 \times 10^0\\) | \\( 1.32 \times 10^{-5}\\) |
|40| \\( 7.66 \times 10^1\\) | \\( 1.37 \times 10^{-5}\\) |
|45| \\( 9.23 \times 10^2\\) | \\( 1.42 \times 10^{-5}\\) |
|50| \\( 1.07 \times 10^4\\) | \\( 1.47 \times 10^{-5}\\) |
