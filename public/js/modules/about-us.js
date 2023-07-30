
console.warn('🆗: Módulo PageAboutUs cargado.');

class PageAboutUs {

    static async init () {

        const accordionTitles = document.querySelectorAll('.accordion-title');
        // console.log(accordionTitles);

            for (let i = 0; i < accordionTitles.length; i++) {
                accordionTitles[i].addEventListener('click', function(){
                    console.log(this);
                    this.classList.toggle('accordion-title--open')
            });
        }
    }
}

export default PageAboutUs;
