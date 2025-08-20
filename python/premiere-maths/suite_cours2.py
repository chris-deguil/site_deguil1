#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 17 11:15:30 2025

@author: christophe
"""

def terme_u1(n) : # On souhaite la liste des n premiers termes, de u_0 à u_{n-1}
	u=3
	L=[u] # On ajoute le premier terme à la liste
	for i in range(2,n+2) : # la variable i prend les valeurs de 2 à n+1, le premier terme de la liste a pour indice 2
 		u=u**2/(i-1)  # On calcul le terme de la suite
 		L.append(u) # On ajoute le terme de la suite à la liste.
# ou

def terme_u2(n) :
	L=[3] 
	for i in range(2,n+2) :
 		L.append(L[-1]/(i-1)) 