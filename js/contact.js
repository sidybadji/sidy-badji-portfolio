// Configuration EmailJS
(function() {
    // Remplacez ces valeurs par vos propres clés EmailJS
    const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // À remplacer
    const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // À remplacer
    const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // À remplacer

    // Fonction d'initialisation EmailJS
    function initEmailJS() {
        // Charger EmailJS depuis CDN si pas déjà chargé
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = function() {
                emailjs.init(EMAILJS_PUBLIC_KEY);
            };
            document.head.appendChild(script);
        } else {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    }

    // Fonction pour afficher les messages
    function showMessage(message, type = 'success') {
        const messageDiv = document.getElementById('form-messages');
        messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} d-block`;
        messageDiv.textContent = message;
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
            messageDiv.classList.add('d-none');
            messageDiv.classList.remove('d-block');
        }, 5000);
    }

    // Fonction pour gérer l'envoi du formulaire
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = document.getElementById('contact-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Sidy Badji'
        };

        // Vérifier si EmailJS est configuré
        if (EMAILJS_SERVICE_ID === 'service_xxxxxxx' || EMAILJS_TEMPLATE_ID === 'template_xxxxxxx') {
            showMessage('Formulaire de contact en cours de configuration. Veuillez utiliser les liens de contact directs.', 'danger');
            return;
        }

        // Afficher l'état de chargement
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;

        // Envoyer l'email via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showMessage('Erreur lors de l\'envoi du message. Veuillez réessayer ou utiliser les liens de contact directs.', 'danger');
            })
            .finally(function() {
                // Restaurer l'état du bouton
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                submitBtn.disabled = false;
            });
    }

    // Fonction alternative avec mailto (si EmailJS n'est pas configuré)
    function handleMailtoForm(event) {
        event.preventDefault();
        
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        
        const subject = encodeURIComponent(formData.get('subject'));
        const body = encodeURIComponent(
            `Nom: ${formData.get('name')}\n` +
            `Email: ${formData.get('email')}\n\n` +
            `Message:\n${formData.get('message')}`
        );
        
        const mailtoLink = `mailto:sidybadji935@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
        
        showMessage('Client email ouvert. Veuillez envoyer votre message.', 'success');
    }

    // Initialisation quand le DOM est chargé
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            // Vérifier si EmailJS est configuré
            if (EMAILJS_SERVICE_ID !== 'service_xxxxxxx' && EMAILJS_TEMPLATE_ID !== 'template_xxxxxxx') {
                initEmailJS();
                form.addEventListener('submit', handleFormSubmit);
            } else {
                // Utiliser mailto comme alternative
                form.addEventListener('submit', handleMailtoForm);
            }
        }
    });

})();
