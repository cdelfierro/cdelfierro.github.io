---
title: ( ͡° ͜ʖ ͡°)
date: 2017-09-02 00:02:40 -0300
categories:
- testing
- test
---
Esta es la página de prueba

Lo que está después de este texto no dale en la portada
<!-- more -->

* Entorno: {{ jekyll.environment }}
* Hora: {{ site.time }}
* Id: {{ page.id }}

{% highlight python linenos %}
def fib1(n):
    """ Recursive Fibonacci """
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib1(n - 1) + fib1(n - 2)
{% endhighlight %}
