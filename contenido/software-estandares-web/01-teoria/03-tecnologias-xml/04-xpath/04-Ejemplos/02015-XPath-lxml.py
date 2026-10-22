# 02015-XPath-lxml.py
# -*- coding: utf-8 -*-
"""
Ejemplos de uso de XPath con lxml
Sin utilizar espacios de nombres

Posiblemente tenga que instalar lxml

Ventajas de lxml: maneja expresiones XPath complejas

@version 1.3 19/Octubre/2025
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

from lxml import etree

def verXPath(archivoXML, expresionXPath):
    """
    Función verXPath(archivoXML, expresionXPath)
    Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML usando lxml
    
    Version: 1.3 19/Octubre/2025
    Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    print("\nArchivo XML     = " + archivoXML)
    print("Expresion XPath = " + expresionXPath)
    try:
        with open(archivoXML, 'rb') as f:
            arbol = etree.parse(f)
    except IOError:
        print('No se encuentra el archivo', archivoXML)
        exit()
    except etree.XMLSyntaxError:
        print("Error procesando el archivo XML =", archivoXML)
        exit()

    # Evaluación de la expresión XPath
    elementos = arbol.xpath(expresionXPath)

    for hijo in elementos:
        if isinstance(hijo, etree._Element):
            print("\nElemento =", hijo.tag)
            texto = hijo.text.strip() if hijo.text else None
            print("Contenido =", texto)
            print("Atributos =", hijo.attrib)
        else:
            print("\nResultado XPath =", hijo)

def main():
    """Prueba de la función verXPath()"""
    
    print(verXPath.__doc__)
    
    """ miArchivoXML = input('Introduzca un archivo XML = ')"""
    
    miArchivoXML = "biblioteca.xml"
    
    """miExpresionXPath = input('Introduzca la expresión XPath = ')"""
    
    miExpresionXPath = "//libro[contains(titulo, 'Gatsby')]/autor"
    
    verXPath(miArchivoXML, miExpresionXPath)
    
    """Otros ejemplos"""
    
    verXPath("biblioteca.xml", "//libro[number(anio) < 1958]/titulo")
    
    verXPath("biblioteca.xml", "//libro[isbn='978-84-339-7882-0']/titulo")

    """
    /biblioteca/libro[contains(@id, 'ISBN')][last()]
    
    /biblioteca/libro: selecciona todos los elementos <libro> que están directamente dentro de <biblioteca>.
    [contains(@id, 'ISBN')]: filtra esos libros para que solo se incluyan aquellos cuyo atributo id contiene la cadena "ISBN".
    [last()]: selecciona el último de esos elementos filtrados.
    /titulo: muestra el elemento titulo
    """
    verXPath("biblioteca.xml", "/biblioteca/libro[contains(@id, 'ISBN')][last()]/titulo")
    
    """
    Encuentra el título del libro más reciente (último año) y luego selecciona el último si hay varios con ese año.
    /biblioteca/libro[not(anio < //libro/anio)][last()]/titulo
    """
    verXPath("biblioteca.xml", "/biblioteca/libro[not(anio < //libro/anio)][last()]/titulo")


if __name__ == "__main__":
    main()
    


