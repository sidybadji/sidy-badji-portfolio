# 📧 Configuration du Formulaire de Contact

## 🚀 Solutions Disponibles

### **Solution 1 : EmailJS (Recommandée)**

EmailJS permet d'envoyer des emails directement depuis le frontend sans backend.

#### **Étapes de Configuration :**

1. **Créer un compte EmailJS**
   - Aller sur https://www.emailjs.com/
   - Créer un compte gratuit (100 emails/mois)

2. **Configurer un service email**
   - Ajouter Gmail, Outlook ou autre service email
   - Suivre les instructions de configuration

3. **Créer un template d'email**
   - Template ID : `template_xxxxxxx`
   - Variables disponibles : `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

4. **Mettre à jour les clés dans `js/contact.js`**
   ```javascript
   const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Votre Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Votre Template ID
   const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Votre Public Key
   ```

### **Solution 2 : Mailto (Alternative Simple)**

Si vous ne voulez pas configurer EmailJS, le formulaire utilise automatiquement `mailto:` qui ouvre le client email par défaut.

### **Solution 3 : Services Alternatifs**

#### **Formspree**
1. Aller sur https://formspree.io/
2. Créer un compte gratuit
3. Remplacer l'action du formulaire :
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### **Netlify Forms**
1. Si déployé sur Netlify
2. Ajouter `netlify` à la balise form :
   ```html
   <form name="contact" method="POST" netlify>
   ```

#### **Getform**
1. Aller sur https://getform.io/
2. Créer un endpoint
3. Mettre à jour l'action du formulaire

## 🔧 Configuration EmailJS Détaillée

### **1. Créer un Service**
- Service ID : `service_xxxxxxx`
- Connecter votre Gmail/Outlook

### **2. Créer un Template**
```html
De: {{from_name}} ({{from_email}})
Sujet: {{subject}}

Message:
{{message}}
```

### **3. Récupérer les Clés**
- Service ID : Dans la section Services
- Template ID : Dans la section Templates  
- Public Key : Dans Account > API Keys

### **4. Tester le Formulaire**
- Vérifier que les emails arrivent bien
- Tester avec différents navigateurs

## 📱 Fonctionnalités Actuelles

✅ **Formulaire fonctionnel** avec validation HTML5  
✅ **Messages de feedback** (succès/erreur)  
✅ **État de chargement** avec spinner  
✅ **Validation des champs** obligatoires  
✅ **Fallback mailto** si EmailJS non configuré  

## 🎯 Prochaines Étapes

1. **Configurer EmailJS** (5 minutes)
2. **Tester l'envoi d'emails**
3. **Déployer en production**
4. **Vérifier la réception des messages**

## 📞 Contact Direct

En attendant la configuration :
- **Email** : sidybadji935@gmail.com
- **LinkedIn** : https://linkedin.com/in/sidybadji
- **GitHub** : https://github.com/sidybadji
