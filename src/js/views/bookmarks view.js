
import icons from 'url:../../img/icons.svg';
import View from './view';
class bookMarkView extends View {
    _parentEl = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmarked recipes, please find one'
    _succesMessage = ''

    addHandlerRender (handler) {
        window.addEventListener('load', handler);
    };

    _generateMarkup () {
        return this._data.map(this._generateMarkupPerview).join('')
    }

    _generateMarkupPerview (result) {
      const id = window.location.hash.slice(1);
          return `
          <li class="preview">
          <a class="preview__link ${result.id === id ?'preview__link--active' : ''}" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
           
            </div>
          </a>
        </li>
          
          `
    }
};

export default new bookMarkView();