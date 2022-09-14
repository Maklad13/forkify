import icons from 'url:../../img/icons.svg';
import View from './view';
class addRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overLay = document.querySelector('.overlay');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    };

    toogleWindow () {
        this._overLay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    };

    _addHandlerShowWindow () {
        this._btnOpen.addEventListener('click',this.toogleWindow.bind(this));
    };

    _addHandlerHideWindow () {
        this._btnClose.addEventListener('click',this.toogleWindow.bind(this));
        this._overLay.addEventListener('click',this.toogleWindow.bind(this));
        
    };

    addHandlerUpload (handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataARR = [...new FormData(this)];
            const data = Object.fromEntries(dataARR);
            handler(data);
        })
    };

  
    _generateMarkup () {};

};


export default new addRecipeView();

    