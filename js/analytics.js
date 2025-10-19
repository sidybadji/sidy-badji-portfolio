// Système d'Analytics Personnalisé pour le Portfolio
(function() {
    'use strict';

    // Configuration
    const ANALYTICS_KEY = 'portfolio_analytics';
    const API_ENDPOINT = 'https://api.countapi.xyz'; // Service gratuit pour compter les visites
    
    // Fonction pour obtenir les statistiques depuis le localStorage
    function getAnalytics() {
        const analytics = localStorage.getItem(ANALYTICS_KEY);
        return analytics ? JSON.parse(analytics) : {
            totalVisits: 0,
            uniqueVisitors: 0,
            pageViews: 0,
            lastVisit: null,
            visitsToday: 0,
            visitsThisWeek: 0,
            visitsThisMonth: 0,
            topPages: {},
            referrers: {},
            devices: {},
            countries: {},
            visitHistory: []
        };
    }

    // Fonction pour sauvegarder les statistiques
    function saveAnalytics(analytics) {
        try {
            localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
        } catch (e) {
            console.warn('Erreur sauvegarde analytics:', e);
        }
    }

    // Fonction pour générer un ID unique pour le visiteur
    function generateVisitorId() {
        try {
            let visitorId = localStorage.getItem('visitor_id');
            if (!visitorId) {
                visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
                localStorage.setItem('visitor_id', visitorId);
            }
            return visitorId;
        } catch (e) {
            console.warn('Erreur génération ID visiteur:', e);
            return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
        }
    }

    // Fonction pour détecter si c'est un nouveau visiteur
    function isNewVisitor() {
        try {
            const lastVisit = localStorage.getItem('last_visit');
            const now = new Date().toDateString();
            
            if (lastVisit !== now) {
                localStorage.setItem('last_visit', now);
                return true;
            }
            return false;
        } catch (e) {
            console.warn('Erreur localStorage:', e);
            return true; // Considérer comme nouveau visiteur en cas d'erreur
        }
    }

    // Fonction pour obtenir les informations du navigateur
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent);
        
        let device = 'Desktop';
        if (isMobile) device = 'Mobile';
        else if (isTablet) device = 'Tablet';
        
        return {
            device: device,
            browser: getBrowserName(userAgent),
            language: navigator.language,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    // Fonction pour détecter le nom du navigateur
    function getBrowserName(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        return 'Other';
    }

    // Fonction pour obtenir la source de référence
    function getReferrer() {
        const referrer = document.referrer;
        if (!referrer) return 'Direct';
        
        try {
            const url = new URL(referrer);
            const hostname = url.hostname;
            
            if (hostname.includes('google')) return 'Google';
            if (hostname.includes('linkedin')) return 'LinkedIn';
            if (hostname.includes('github')) return 'GitHub';
            if (hostname.includes('facebook')) return 'Facebook';
            if (hostname.includes('twitter')) return 'Twitter';
            if (hostname.includes('youtube')) return 'YouTube';
            
            return hostname;
        } catch (e) {
            return 'Direct';
        }
    }

    // Fonction pour enregistrer une visite
    function trackVisit() {
        const analytics = getAnalytics();
        const visitorId = generateVisitorId();
        const isNew = isNewVisitor();
        const browserInfo = getBrowserInfo();
        const referrer = getReferrer();
        const currentPage = window.location.pathname;
        const now = new Date();
        
        // Incrémenter les compteurs
        analytics.totalVisits++;
        analytics.pageViews++;
        
        if (isNew) {
            analytics.uniqueVisitors++;
            analytics.visitsToday++;
            analytics.visitsThisWeek++;
            analytics.visitsThisMonth++;
        }
        
        // Mettre à jour la dernière visite
        analytics.lastVisit = now.toISOString();
        
        // Compter les pages vues
        analytics.topPages[currentPage] = (analytics.topPages[currentPage] || 0) + 1;
        
        // Compter les référents
        analytics.referrers[referrer] = (analytics.referrers[referrer] || 0) + 1;
        
        // Compter les appareils
        analytics.devices[browserInfo.device] = (analytics.devices[browserInfo.device] || 0) + 1;
        
        // Ajouter à l'historique des visites
        analytics.visitHistory.push({
            timestamp: now.toISOString(),
            page: currentPage,
            referrer: referrer,
            device: browserInfo.device,
            browser: browserInfo.browser,
            isNewVisitor: isNew
        });
        
        // Garder seulement les 100 dernières visites
        if (analytics.visitHistory.length > 100) {
            analytics.visitHistory = analytics.visitHistory.slice(-100);
        }
        
        // Sauvegarder
        saveAnalytics(analytics);
        
        // Envoyer les données à un service externe (optionnel)
        sendToExternalService(analytics);
        
        return analytics;
    }

    // Fonction pour envoyer les données à un service externe
    function sendToExternalService(analytics) {
        // Utiliser CountAPI pour un compteur public (optionnel)
        if (typeof fetch !== 'undefined') {
            fetch(`${API_ENDPOINT}/hit/sidy-badji-portfolio/visits`)
                .catch(() => {}); // Ignorer les erreurs
        }
    }

    // Fonction pour afficher les statistiques dans la console (pour debug)
    function logAnalytics() {
        const analytics = getAnalytics();
        console.log('📊 Portfolio Analytics:', analytics);
        return analytics;
    }

    // Fonction pour créer un tableau de bord simple
    function createDashboard() {
        const analytics = getAnalytics();
        
        // Créer un élément de tableau de bord
        const dashboard = document.createElement('div');
        dashboard.id = 'analytics-dashboard';
        dashboard.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            max-width: 300px;
            display: none;
        `;
        
        dashboard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #00b87b;">📊 Analytics</h4>
                <button onclick="this.parentElement.parentElement.style.display='none'" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
            </div>
            <div style="margin-bottom: 8px;"><strong>Visites totales:</strong> ${analytics.totalVisits}</div>
            <div style="margin-bottom: 8px;"><strong>Visiteurs uniques:</strong> ${analytics.uniqueVisitors}</div>
            <div style="margin-bottom: 8px;"><strong>Pages vues:</strong> ${analytics.pageViews}</div>
            <div style="margin-bottom: 8px;"><strong>Aujourd'hui:</strong> ${analytics.visitsToday}</div>
            <div style="margin-bottom: 8px;"><strong>Cette semaine:</strong> ${analytics.visitsThisWeek}</div>
            <div style="margin-bottom: 8px;"><strong>Ce mois:</strong> ${analytics.visitsThisMonth}</div>
            <div style="margin-bottom: 8px;"><strong>Dernière visite:</strong> ${analytics.lastVisit ? new Date(analytics.lastVisit).toLocaleString() : 'N/A'}</div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333;">
                <div><strong>Appareils:</strong></div>
                ${Object.entries(analytics.devices).map(([device, count]) => 
                    `<div style="margin-left: 10px;">${device}: ${count}</div>`
                ).join('')}
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333;">
                <div><strong>Sources:</strong></div>
                ${Object.entries(analytics.referrers).map(([source, count]) => 
                    `<div style="margin-left: 10px;">${source}: ${count}</div>`
                ).join('')}
            </div>
        `;
        
        document.body.appendChild(dashboard);
        return dashboard;
    }

    // Fonction pour afficher/masquer le tableau de bord
    function toggleDashboard() {
        let dashboard = document.getElementById('analytics-dashboard');
        if (!dashboard) {
            dashboard = createDashboard();
        }
        
        if (dashboard.style.display === 'none') {
            dashboard.style.display = 'block';
        } else {
            dashboard.style.display = 'none';
        }
    }

    // Fonction pour obtenir les statistiques en JSON
    function getStatsJSON() {
        return JSON.stringify(getAnalytics(), null, 2);
    }

    // Fonction pour exporter les données
    function exportData() {
        const data = getAnalytics();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        try {
            // Enregistrer la visite
            trackVisit();
            
            // Ajouter un bouton pour afficher les analytics (en mode développement)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                const analyticsBtn = document.createElement('button');
                analyticsBtn.innerHTML = '📊 Analytics';
                analyticsBtn.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #00b87b;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 25px;
                    cursor: pointer;
                    z-index: 9998;
                    font-size: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                `;
                analyticsBtn.onclick = toggleDashboard;
                document.body.appendChild(analyticsBtn);
            }
            
            // Afficher les stats dans la console
            console.log('📊 Portfolio Analytics chargé');
            logAnalytics();
        } catch (e) {
            console.error('Erreur initialisation analytics:', e);
        }
    });

    // Exposer les fonctions globalement pour debug
    window.PortfolioAnalytics = {
        getStats: getAnalytics,
        logStats: logAnalytics,
        toggleDashboard: toggleDashboard,
        exportData: exportData,
        getJSON: getStatsJSON
    };

})();
