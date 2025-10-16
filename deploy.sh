#!/bin/bash

# Script de déploiement pour le portfolio de Sidy BADJI
# Usage: ./deploy.sh [platform]
# Platforms: github, netlify, vercel

set -e

PLATFORM=${1:-github}
PROJECT_NAME="sidy-badji-portfolio"

echo "🚀 Déploiement du portfolio de Sidy BADJI sur $PLATFORM"

# Vérification des prérequis
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé"
    exit 1
fi

# Nettoyage et préparation
echo "🧹 Nettoyage des fichiers temporaires..."
find . -name "*.tmp" -delete
find . -name ".DS_Store" -delete

# Optimisation des images (optionnel)
echo "📸 Optimisation des images..."
# Vous pouvez ajouter des commandes d'optimisation d'images ici

case $PLATFORM in
    "github")
        echo "📦 Déploiement sur GitHub Pages..."
        
        # Initialisation Git si nécessaire
        if [ ! -d ".git" ]; then
            git init
            git remote add origin https://github.com/sidybadji/$PROJECT_NAME.git
        fi
        
        # Ajout et commit
        git add .
        git commit -m "Deploy portfolio v$(date +%Y%m%d-%H%M%S)" || echo "Pas de changements à committer"
        
        # Push vers GitHub
        git push -u origin main
        
        echo "✅ Déployé sur GitHub Pages"
        echo "🌐 URL: https://sidybadji.github.io/$PROJECT_NAME"
        ;;
        
    "netlify")
        echo "📦 Déploiement sur Netlify..."
        
        # Installation de Netlify CLI si nécessaire
        if ! command -v netlify &> /dev/null; then
            echo "📥 Installation de Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        # Déploiement
        netlify deploy --prod --dir .
        
        echo "✅ Déployé sur Netlify"
        ;;
        
    "vercel")
        echo "📦 Déploiement sur Vercel..."
        
        # Installation de Vercel CLI si nécessaire
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installation de Vercel CLI..."
            npm install -g vercel
        fi
        
        # Déploiement
        vercel --prod
        
        echo "✅ Déployé sur Vercel"
        ;;
        
    *)
        echo "❌ Plateforme non supportée: $PLATFORM"
        echo "Plateformes supportées: github, netlify, vercel"
        exit 1
        ;;
esac

echo "🎉 Déploiement terminé avec succès!"
echo "📊 Vérifiez votre site dans quelques minutes"
