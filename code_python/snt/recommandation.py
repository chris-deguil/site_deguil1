#bibliotheue pour construire le graphe
import matplotlib.pyplot as plt
import math

# permet de déterminer les distances 
def bfs(G, S):
	couleur = dict()
	for x in G :
		couleur[x] = 'blanc'
	P = dict()
	P[S] = None
	couleur[S] = 'gris'
	Q = [S]
	while Q :
		u = Q[0]
		for v in G[u]:
			if couleur[v] == 'blanc':
				P[v] = u
				couleur[v] = 'gris'
				Q.append(v)
		Q.pop(0)
		couleur[u] = 'noir'
	return P


def recommandation_creation(graphe_relations):
    dico_suggestion = {}
    for cle, valeur in graphe_relations.items():
        for cle2, valeur2 in graphe_relations.items():
            if cle != cle2 :
                for personne in valeur :
                    if personne in valeur2 :
                        try:
                            if not cle2 in dico_suggestion[cle]:
                                dico_suggestion[cle].append(cle2)
                        except:
                            dico_suggestion[cle] = [cle2]
                        try:
                            if not cle in dico_suggestion[cle2]:
                                dico_suggestion[cle2].append(cle)
                        except:
                            dico_suggestion[cle2] = [cle]
    return dico_suggestion


def recommandation(graphe_relations) :
    dict = recommandation_creation(graphe_relations)
    for cle, valeur in dict.items():
        for nom in valeur:
            if not nom in graphe_relations[cle]:
                print("Le réseau social propose à ", cle, " de devenir ami avec", nom)
                
                

def afficher_graphe(graphe):
    n = len(graphe)
    positions = {}
    angle = 2 * math.pi / n
    for i, noeud in enumerate(graphe):
        x = math.cos(i * angle)
        y = math.sin(i * angle)
        positions[noeud] = (x, y)
    
    # Tracer les arêtes
    plt.figure(figsize=(8, 8))
    for noeud, voisins in graphe.items():
        x1, y1 = positions[noeud]
        for voisin in voisins:
            x2, y2 = positions[voisin]
            plt.plot([x1, x2], [y1, y2], 'k-', zorder=1)
    
    # Tracer les sommets
    for noeud, (x, y) in positions.items():
        plt.scatter(x, y, s=1500, color='lightblue', edgecolors='black', zorder=2)
        plt.text(x, y, noeud, fontsize=10, ha='center', va='center', zorder=3)
    
    plt.axis('off')
    plt.title("Visualisation du graphe (sans networkx)")
    plt.show()


      
