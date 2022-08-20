// obtain cookieconsent plugin
var cc = initCookieConsent();

var cookie = '🍪';

// run plugin with config object
cc.run({
    current_lang : 'en',
    autoclear_cookies : true,                   // default: false
    cookie_name: 'l64_cc_202208',               // default: 'cc_cookie'
    cookie_expiration : 90,                     // default: 182
    page_scripts: true,                         // default: false
    force_consent: true,                        // default: false

    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    autorun: true,                              // default: true
    delay: 2000,                                // default: 0
    hide_from_bots: false,                      // default: false
    remove_cookie_tables: true,                 // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: "/",                        // default: root
    // cookie_same_site: "Lax",
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'cloud',                    // box,cloud,bar
            position: 'bottom center',          // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            // position: 'left',                // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){
        console.log('onFirstAction...');
    },

    onAccept: function (cookie) {
        console.log('onAccept...');
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange...');
        // If analytics category is disabled => disable google analytics
        if (!cc.allowedCategory('analytics')) {
            typeof gtag === 'function' && gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    },

    languages: {
        'en': {
            consent_modal: {
                title: cookie + ' We use cookies!',
                description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                primary_btn: {
                    text: 'Accept all',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Reject all',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                }
            },
            settings_modal: {
                title: cookie + ' Cookie settings',
                save_settings_btn: 'Save settings',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                blocks: [
                    {
                        title: 'Cookie usage 📢',
                        description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the <a href="https://www.labs64.com/legal/privacy-policy/" class="cc-link">privacy policy</a>.'
                    }, {
                        title: 'Technically required cookies',
                        description: 'These cookies are essential in order to enable you to move around the website and use its features, such as setting your privacy preferences, logging in or filling in forms. Without these cookies, services requested through usage of our website cannot be properly provided.',
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'Performance and Analytics cookies',
                        description: 'These cookies collect information about how visitors use a website, for instance which pages visitors go to most often, and how visitors move around the site. They help us to improve the user friendliness of a website and therefore enhance the user’s experience.',
                        toggle: {
                            value: 'analytics',    
                            enabled: false,
                            readonly: false
                        }
                    }, {
                        title: 'Functionality and Usability cookies',
                        description: 'These cookies allow the website to remember choices you make or information you enter (such as your username, language or the region you are in) and provide enhanced, more personal features. They are also used to enable enhanced website functions.',
                        toggle: {
                            value: 'usability',    
                            enabled: false,
                            readonly: false
                        }
                    }, {
                        title: 'More information',
                        description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="https://labs64.com/contact">contact us</a>.',
                    }
                ]
            }
        }
    }

});
