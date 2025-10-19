// Configuration du formulaire de contact
(function() {

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
        
        // Vérifier que les éléments principaux sont trouvés
        if (!form || !submitBtn) {
            console.error('Formulaire ou bouton non trouvé');
            showMessage('Erreur: Formulaire non trouvé', 'danger');
            return;
        }
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Vérifier que tous les champs sont remplis
        if (!name || !email || !subject || !message) {
            showMessage('Veuillez remplir tous les champs du formulaire.', 'danger');
            return;
        }
        
        console.log('Données du formulaire:', { name, email, subject, message });

        // Afficher l'état de chargement
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Préparation de l\'email...';

        // Utiliser la méthode mailto avec format email professionnel
        handleMailtoForm(event, { name, email, subject, message });
    }

    // Fonction mailto avec format email professionnel
    function handleMailtoForm(event, { name, email, subject, message }) {
        // Formatage professionnel du sujet
        const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
        
        // Formatage professionnel du corps de l'email
        const emailBody = encodeURIComponent(
            `Bonjour Sidy,\n\n` +
            `Vous avez reçu un nouveau message depuis votre portfolio professionnel :\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `📧 INFORMATIONS DU CONTACT\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👤 Nom complet : ${name}\n` +
            `📮 Adresse email : ${email}\n` +
            `📋 Sujet : ${subject}\n` +
            `📅 Date : ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `💬 MESSAGE\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `${message}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🌐 Envoyé depuis : https://sidybadji.github.io/sidy-badji-portfolio\n` +
            `📱 Portfolio professionnel de Sidy BADJI - Data Engineer\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
        );
        
        const mailtoLink = `mailto:sidybadji935@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        // Ouvrir le client email
        window.open(mailtoLink);
        
        // Restaurer le bouton
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-loading d-none"><i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...</span>';
        
        // Afficher le message de succès et vider le formulaire
        showMessage('✅ Client email ouvert avec votre message pré-rempli ! Veuillez cliquer sur "Envoyer" dans votre client email. Le formulaire a été vidé.', 'success');
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
            
            // Ajouter l'événement submit
            form.addEventListener('submit', handleFormSubmit);
            
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
            
            console.log('Formulaire de contact initialisé avec succès (méthode mailto)');
            
            // Test simple du bouton
            submitBtn.addEventListener('click', function(e) {
                console.log('Bouton cliqué !');
            });
        } else {
            console.error('Formulaire ou bouton non trouvé');
        }
    });

})();
