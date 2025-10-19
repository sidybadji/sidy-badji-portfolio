// Configuration EmailJS
(function() {
    // Remplacez ces valeurs par vos propres clés EmailJS
    const EMAILJS_SERVICE_ID = 'service_w3onej4'; // À remplacer
    const EMAILJS_TEMPLATE_ID = 'template_qirk3ij'; // À remplacer
    const EMAILJS_PUBLIC_KEY = 'EQUC3P9aWvw_-K-nR'; // À remplacer

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
        messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>${message}`;
        
        // Masquer le message après 8 secondes
        setTimeout(() => {
            messageDiv.classList.add('d-none');
            messageDiv.classList.remove('d-block');
        }, 8000);
    }

    // Fonction pour vider le formulaire
    function resetForm() {
        const form = document.getElementById('contact-form');
        form.reset();
        
        // Réinitialiser les labels flottants
        const floatingLabels = form.querySelectorAll('.form-floating input, .form-floating textarea');
        floatingLabels.forEach(input => {
            if (input.value === '') {
                input.classList.remove('has-value');
            }
        });
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
            // Utiliser mailto comme alternative
            handleMailtoForm(event, templateParams);
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
                resetForm();
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

    // Fonction alternative avec mailto (améliorée)
    function handleMailtoForm(event, templateParams) {
        const subject = encodeURIComponent(templateParams.subject || 'Contact depuis le portfolio');
        const body = encodeURIComponent(
            `Bonjour Sidy,\n\n` +
            `Vous avez reçu un nouveau message depuis votre portfolio :\n\n` +
            `Nom: ${templateParams.from_name}\n` +
            `Email: ${templateParams.from_email}\n\n` +
            `Sujet: ${templateParams.subject}\n\n` +
            `Message:\n${templateParams.message}\n\n` +
            `---\n` +
            `Envoyé depuis: https://sidybadji.github.io/sidy-badji-portfolio`
        );
        
        const mailtoLink = `mailto:sidybadji935@gmail.com?subject=${subject}&body=${body}`;
        
        // Ouvrir le client email
        window.open(mailtoLink);
        
        // Afficher le message de succès et vider le formulaire
        showMessage('Client email ouvert ! Veuillez envoyer votre message. Le formulaire a été vidé.', 'success');
        resetForm();
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
                form.addEventListener('submit', handleFormSubmit);
            }
            
            // Améliorer l'expérience utilisateur avec les labels flottants
            const floatingInputs = form.querySelectorAll('.form-floating input, .form-floating textarea');
            floatingInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value !== '') {
                        this.classList.add('has-value');
                    } else {
                        this.classList.remove('has-value');
                    }
                });
            });
        }
    });

})();
