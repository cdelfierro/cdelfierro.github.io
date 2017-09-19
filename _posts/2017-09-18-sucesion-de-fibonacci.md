---
title: Calculando números de la sucesión de Fibonacci
date: 2017-09-19 00:50:06 -0300
mathjax: true
categories:
- algoritmos
tags:
- fibonacci
- algoritmos
- sucesiones
---

Los números de Fibonacci son la secuencia de números enteros:

$$ 0, 1, 1, 2, 3, 5, 8, 13, 21,\ldots $$

<!-- more -->
El siguiente número se calcula mediante la suma de los dos anteriores, en el
ejemplo, el próximo número es \\( 13 + 21 = 34 \\). Luego, la sucesión de Fibonacci
se puede definir por la siguiente ecuación de recurrencia:

$$  F_n = F_{n-1} + F_{n-2} $$

Esta relación necesita que definamos dos números semilla, pues cada término
depende de los dos anteriores, por lo que los dos primeros números se definen
como:

$$  F_0 = 0 \\
    F_1 = 1 $$

Dado un número positivo \\( n \\), queremos calcular \\(F_n \\). Una primera
aproximación es utilizar un algoritmo recursivo:

{% highlight python %}
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)
{% endhighlight %}

El problema de este algoritmo es su lentitud, debido a que repite llamadas a la
misma función varias veces. Por ejemplo si queremos calcular \\(F_5 \\) la secuencia
de llamadas a la función es la siguiente:

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

Cada llamada a la función se puede ver en la siguiente tabla:

| función | n° llamadas |
|:---------:|:-------------------:|
| `fib(5)` | 1 |
| `fib(4)` | 1 |
| `fib(3)` | 2 |
| `fib(2)` | 3 |
| `fib(1)` | 5 |
| `fib(0)` | 3 |

Esto ocurre porque por cada llamada a `fib(n)` para `n != 1` o `n != 0`, se deben
realizar dos más a la función evaluada en los números anteriores (`n - 1` y `n - 2`),
generando un árbol en donde las distintas ramas llaman a funciones que ya habíamos
evaluado antes. Podemos ver el caso de `fib(4)` que genera una rama para `fib(3)`
y para `fib(2)`. La rama que se evalúa primero es `fib(3)`, que a su vez hace
una llamada a `fib(2)` y `fib(1)`. Aquí debemos evaluar `fib(2)` primero, pero
tenemos otra rama que también necesista evaluar `fib(2)`, pero el algoritmo es
completamente ciego frente a eso. Una vez que termina de evaluar `fib(3)`, el
algoritmo ya ha evaluado también `fib(2)` y `fib(1)`, pero lo ha olvidado, y
entra en la rama que necesita evaluar `fib(2)`. Esto hace que el algoritmo sea
lento, y para `n` muy grande la cantidad de evaluaciones crece demasiado. Su
complejidad es de \\( \mathcal{O}(\phi^n)\\), donde \\( \phi = \frac{(1 + \sqrt{5})}
{2} \\) es la proporción áurea.[^1]

[^1]: En una actualización a este artículo voy a probar la complejidad del algoritmo.

Una aproximación más eficiente a este problema es la siguiente:

{% highlight python %}
def fib(n):
    a, b = 0, 1
    for __ in range(n - 1):
        a, b = b, a + b
    return b
{% endhighlight %}

Este algoritmo va generando la secuencia a medida que la va recorriendo, lo que
resulta en que calcula cada número sólo una vez y tiene una complejidad de
\\( \mathcal{O}(n) \\), la cual es muchísimo menor que la del algoritmo recursivo.

Finalmente muestro una tabla del tiempo en segundos que se demora en calcular
algunos números de Fibonacci para ambos algoritmos:

| n | Recursivo | Rápido |
|:-:|:---------:|:-------------------:|
|5| \\( 1.22 \times 10^-5\\) | \\( 9.78 \times 10^-6\\) |
|10| \\( 4.50 \times 10^-5\\) | \\( 1.03 \times 10^-5\\) |
|15| \\( 4.03 \times 10^-4\\) | \\( 1.12 \times 10^-5\\) |
|20| \\( 4.56 \times 10^-3\\) | \\( 1.32 \times 10^-5\\) |
|25| \\( 5.64 \times 10^-2\\) | \\( 1.17 \times 10^-5\\) |
|30| \\( 5.98 \times 10^-1\\) | \\( 1.37 \times 10^-5\\) |
|35| \\( 6.48 \\) | \\( 1.32 \times 10^-5\\) |
|40| \\( 7.66 \times 10^1\\) | \\( 1.37 \times 10^-5\\) |
|45| \\( 9.23 \times 10^2\\) | \\( 1.42 \times 10^-5\\) |
|50| \\( 1.11 \times 10^4\\) | \\( 1.47 \times 10^-5\\) |
