TranslationService.$inject = [];
function TranslationService() {
    traslationService.getTranslation = (PAGE_NAME)=>{
        
    };

    const Translation = {
        EN: {
            'home':{
                menu: ['Home', 'Portfolio', 'Contact'],
                h2: ['Try new expressive look and feminine touch',
                    'with extension of', 
                    'lashes, modelled eyebrows',
                    'and perfect',
                    'makeup'
                    ],
                buttonPortfolio: 'See Our Portfolio',
                buttonBook: 'Book an Appoitment'      
            },
            'contact': {},
            'portfolio': {},
        },
        RO: {

        }
    }

    return traslationService;
};

export default TranslationService;