#!/usr/bin/env bash
set -e

# Usage:
#   ./gp.sh "Message de commit"
# Si tu n'indiques pas de message, on utilise une valeur par défaut horodatée.

MSG="$1"
if [ -z "$MSG" ]; then
  MSG="Mise à jour automatique $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Vérifie qu'on est bien dans un dépôt git
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Erreur: ce dossier n'est pas un dépôt git."
  exit 1
}

# Ajoute, commit puis push
git add .
# S'il n'y a rien à commiter, on sort proprement
if git diff --cached --quiet; then
  echo "Rien à committer (aucune modification indexée)."
  exit 0
fi

git commit -m "$MSG"
git push
echo "✅ Modifications envoyées. La publication automatique va se lancer sur GitHub."

