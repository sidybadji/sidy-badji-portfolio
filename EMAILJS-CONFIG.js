// Configuration EmailJS - Remplacez ces valeurs par vos vraies clés
// Obtenez ces clés sur https://www.emailjs.com/

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_xxxxxxx',        // Remplacez par votre Service ID
    TEMPLATE_ID: 'template_xxxxxxx',      // Remplacez par votre Template ID  
    PUBLIC_KEY: 'your_public_key_here'    // Remplacez par votre Public Key
};

// Instructions pour obtenir vos clés :
// 1. Créer un compte sur https://www.emailjs.com/
// 2. Aller dans "Email Services" et connecter Gmail
// 3. Aller dans "Email Templates" et créer un template
// 4. Aller dans "Account" > "API Keys" pour récupérer la clé publique
// 5. Copier les valeurs dans les variables ci-dessus
// 6. Renommer ce fichier en "EMAILJS-CONFIG.js" et l'inclure dans index.html

// Template d'email suggéré :
/*
De: {{from_name}} ({{from_email}})
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis votre portfolio
*/
