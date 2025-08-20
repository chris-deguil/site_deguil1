#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jul 26 11:58:11 2025

@author: christophe
"""
from recommandation import *
"""
On dipose de trois fonctions :
    bfs(Graphe,Sommet) : permet de déterminer les chemins relaint deux personnes.
    recommandation(graphe_relations) 
    afficher_graphe(graphe): qui permet de construrie le graphe
"""


          
                
graphe_relations_reseau1 = {
"Abdel" : ["Elia", "Sacha"],
"Béa": ["Elia", "Coline", "Noé"],
"Coline" : ["Béa", "Noé", "Dylan"],
"Dylan": [ "Sacha", "Coline"],
"Elia": ["Abdel", "Béa"],
"Noé": ["Béa", "Coline"],
"Sacha": ["Abdel", "Dylan"] }


