// Configuration EmailJS
(function() {
    // Remplacez ces valeurs par vos propres clés EmailJS
    const EMAILJS_SERVICE_ID = 'service_w3onej4'; // À remplacer
    const EMAILJS_TEMPLATE_ID = 'template_qirk3ij'; // À remplacer
    const EMAILJS_PUBLIC_KEY = 'EQUC3P9aWvw_-K-nR'; // À remplacer

    // Fonction d'initialisation EmailJS
    function initEmailJS() {
        console.log('Initialisation EmailJS...', {
            serviceId: EMAILJS_SERVICE_ID,
            templateId: EMAILJS_TEMPLATE_ID,
            publicKey: EMAILJS_PUBLIC_KEY
        });
        
        // Charger EmailJS depuis CDN si pas déjà chargé
        if (typeof emailjs === 'undefined') {
            console.log('Chargement d\'EmailJS depuis CDN...');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = function() {
                console.log('EmailJS chargé, initialisation...');
                emailjs.init(EMAILJS_PUBLIC_KEY);
                console.log('EmailJS initialisé avec succès');
            };
            script.onerror = function() {
                console.error('Erreur lors du chargement d\'EmailJS');
            };
            document.head.appendChild(script);
        } else {
            console.log('EmailJS déjà chargé, initialisation...');
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('EmailJS initialisé avec succès');
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
        console.log('Soumission du formulaire...');
        event.preventDefault();
        
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        console.log('Éléments du formulaire trouvés:', {
            form: !!form,
            submitBtn: !!submitBtn,
            btnText: !!btnText,
            btnLoading: !!btnLoading
        });
        
        // Vérifier que tous les éléments sont trouvés
        if (!form || !submitBtn || !btnText || !btnLoading) {
            console.error('Éléments du formulaire manquants');
            showMessage('Erreur: Éléments du formulaire manquants', 'danger');
            return;
        }
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Sidy Badji'
        };
        
        console.log('Données du formulaire:', templateParams);

        // Vérifier si EmailJS est configuré
        console.log('Vérification de la configuration EmailJS...');
        if (EMAILJS_SERVICE_ID === 'service_xxxxxxx' || EMAILJS_TEMPLATE_ID === 'template_xxxxxxx' || 
            EMAILJS_SERVICE_ID === '' || EMAILJS_TEMPLATE_ID === '' || 
            EMAILJS_PUBLIC_KEY === 'your_public_key_here' || EMAILJS_PUBLIC_KEY === '') {
            console.log('EmailJS non configuré, utilisation de mailto');
            handleMailtoForm(event, templateParams);
            return;
        }

        // Vérifier si EmailJS est chargé
        console.log('Vérification du chargement d\'EmailJS...', typeof emailjs);
        if (typeof emailjs === 'undefined') {
            console.log('EmailJS non chargé, utilisation de mailto');
            handleMailtoForm(event, templateParams);
            return;
        }
        
        console.log('EmailJS configuré et chargé, envoi via EmailJS...');

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
        console.log('Initialisation du formulaire de contact...');
        
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        
        console.log('Éléments trouvés:', {
            form: !!form,
            submitBtn: !!submitBtn
        });
        
        if (form && submitBtn) {
            console.log('Ajout de l\'événement submit...');
            
            // Toujours ajouter l'événement submit
            form.addEventListener('submit', handleFormSubmit);
            
            // Initialiser EmailJS si configuré
            if (EMAILJS_SERVICE_ID !== 'service_xxxxxxx' && EMAILJS_TEMPLATE_ID !== 'template_xxxxxxx' && 
                EMAILJS_SERVICE_ID !== '' && EMAILJS_TEMPLATE_ID !== '' && 
                EMAILJS_PUBLIC_KEY !== 'your_public_key_here' && EMAILJS_PUBLIC_KEY !== '') {
                console.log('EmailJS configuré, initialisation...');
                initEmailJS();
            } else {
                console.log('EmailJS non configuré, utilisation de mailto');
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
            
            console.log('Formulaire de contact initialisé avec succès');
            
            // Test simple du bouton
            submitBtn.addEventListener('click', function(e) {
                console.log('Bouton cliqué !');
            });
        } else {
            console.error('Formulaire ou bouton non trouvé');
        }
    });

})();
