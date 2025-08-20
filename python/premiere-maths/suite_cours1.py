#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 17 11:14:55 2025

@author: christophe
"""

def terme_u(n) : # On souhaite la liste des n premiers termes, de u_0 à u_{n-1}
    L=[0] # On définit une liste vide.
    for i in range(n) : # la variable i prend les valeurs de 0 à n-1
        u=3*i**2-5*i+1  # On calcul le terme de la suite
        L.append(u) # On ajoute le terme de la suite à la liste.