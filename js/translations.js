// Système de traduction pour le portfolio de Sidy Badji
class PortfolioTranslator {
    constructor() {
        this.currentLanguage = 'fr';
        this.translations = {
            fr: {
                // Informations personnelles
                'name': 'Nom',
                'degree': 'Diplôme',
                'experience': 'Expérience',
                'specialty': 'Spécialité',
                'phone': 'Téléphone',
                'email': 'Email',
                'location': 'Localisation',
                'availability': 'Disponibilité',
                'years-experience': 'Années d\'',
                'completed-projects': 'Projets',
                'technologies': 'Technologies',
                'realized': 'Réalisés',
                'mastered': 'Maîtrisées',
                
                // Sections principales
                'about-title': 'À Propos',
                'skills-title': 'Compétences',
                'experience-title': 'Expérience Professionnelle',
                'education-title': 'Formation',
                'services-title': 'Services',
                'portfolio-title': 'Portfolio',
                'language-skills-title': 'Compétences Linguistiques',
                'contact-title': 'Contactez-moi',
                
                // Portfolio filters
                'all': 'Tous',
                'data-engineering': 'Data Engineering',
                'ml-ai': 'ML & IA',
                'backend': 'Backend',
                
                // Formation
                'certifications': 'Certifications',
                'additional-info': 'Informations Complémentaires',
                
                // Contact
                'contact-description': 'Disponible immédiatement pour des missions freelance ou un poste en CDI. Basé en région parisienne avec une mobilité dans toute la région. N\'hésitez pas à me contacter pour discuter de vos projets data !',
                
                // Footer
                'contact': 'Contact',
                'phone-link': 'Téléphone',
                'rights': 'Tous droits réservés.',
                
                // Boutons
                'download-cv': 'Télécharger CV',
                'contact-me': 'Contactez-moi'
            },
            en: {
                // Personal information
                'name': 'Name',
                'degree': 'Degree',
                'experience': 'Experience',
                'specialty': 'Specialty',
                'phone': 'Phone',
                'email': 'Email',
                'location': 'Location',
                'availability': 'Availability',
                'years-experience': 'Years of',
                'completed-projects': 'Projects',
                'technologies': 'Technologies',
                'realized': 'Completed',
                'mastered': 'Mastered',
                
                // Main sections
                'about-title': 'About Me',
                'skills-title': 'Skills',
                'experience-title': 'Professional Experience',
                'education-title': 'Education',
                'services-title': 'Services',
                'portfolio-title': 'Portfolio',
                'language-skills-title': 'Language Skills',
                'contact-title': 'Contact Me',
                
                // Portfolio filters
                'all': 'All',
                'data-engineering': 'Data Engineering',
                'ml-ai': 'ML & AI',
                'backend': 'Backend',
                
                // Education
                'certifications': 'Certifications',
                'additional-info': 'Additional Information',
                
                // Contact
                'contact-description': 'Available immediately for freelance missions or CDI positions. Based in the Paris region with mobility throughout the region. Don\'t hesitate to contact me to discuss your data projects!',
                
                // Footer
                'contact': 'Contact',
                'phone-link': 'Phone',
                'rights': 'All rights reserved.',
                
                // Buttons
                'download-cv': 'Download CV',
                'contact-me': 'Contact Me'
            }
        };
        
        this.init();
    }
    
    init() {
        // Attach event listeners to language buttons
        document.getElementById('lang-fr').addEventListener('click', () => this.setLanguage('fr'));
        document.getElementById('lang-en').addEventListener('click', () => this.setLanguage('en'));
        
        // Set initial language
        this.setLanguage('fr');
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update button states
        document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        
        // Translate elements with data attributes
        this.translateElements();
        
        // Update typed text animation
        this.updateTypedText();
        
        // Store language preference
        localStorage.setItem('portfolio-language', lang);
    }
    
    translateElements() {
        // Translate elements with data-fr and data-en attributes
        const elements = document.querySelectorAll('[data-fr][data-en]');
        elements.forEach(element => {
            const text = this.translations[this.currentLanguage][element.getAttribute(`data-${this.currentLanguage}`)] || 
                        element.getAttribute(`data-${this.currentLanguage}`);
            element.textContent = text;
        });
        
        // Translate placeholder attributes
        const inputElements = document.querySelectorAll('[data-fr-placeholder][data-en-placeholder]');
        inputElements.forEach(element => {
            const placeholder = element.getAttribute(`data-${this.currentLanguage}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
        
        // Translate specific elements by ID or class
        this.translateSpecificElements();
    }
    
    translateSpecificElements() {
        // Update statistics labels
        const statsElements = {
            'years-exp': this.translations[this.currentLanguage]['years-experience'],
            'projects-realized': this.translations[this.currentLanguage]['completed-projects'],
            'technologies-mastered': this.translations[this.currentLanguage]['technologies']
        };
        
        Object.keys(statsElements).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(el => {
                el.textContent = statsElements[key];
            });
        });
    }
    
    updateTypedText() {
        const typedTexts = {
            fr: 'Data Engineer, Développeur Python, Développeur Java, Ingénieur ML, Développeur Backend',
            en: 'Data Engineer, Python Developer, Java Developer, ML Engineer, Backend Developer'
        };
        
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            typedElement.textContent = typedTexts[this.currentLanguage];
            
            // Restart the typed animation if it exists
            if (window.typedInstance) {
                window.typedInstance.destroy();
            }
            
            // Reinitialize typed.js with new text
            if (document.querySelector('.typed-text-output')) {
                setTimeout(() => {
                    const typed_strings = typedElement.textContent;
                    window.typedInstance = new Typed('.typed-text-output', {
                        strings: typed_strings.split(', '),
                        typeSpeed: 50,
                        backSpeed: 30,
                        smartBackspace: false,
                        loop: true,
                        showCursor: true,
                        cursorChar: '|',
                        startDelay: 500,
                        backDelay: 1500
                    });
                }, 100);
            }
        }
    }
}

// Initialize translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioTranslator = new PortfolioTranslator();
    
    // Load saved language preference
    const savedLang = localStorage.getItem('portfolio-language');
    if (savedLang && ['fr', 'en'].includes(savedLang)) {
        window.portfolioTranslator.setLanguage(savedLang);
    }
});
