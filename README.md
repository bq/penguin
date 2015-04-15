# penguin 
[![Build Status](https://secure.travis-ci.org/bq/penguin.png?branch=master)](http://travis-ci.org/bq/penguin)

> penguin is a lightweight and extensible front-end framework built with Sass to kickstart any web project.

## Jump to Section

* [Quickstart](#quickstart)
* [What's included](#what's-included)
* [Usage](#usage)
* [Components](#components)

## Quickstart
[[Back To Top]](#jump-to-section)

> penguin is very easy to install and configure. You have following options to get penguin:

* [Download the last release](https://github.com/bq/penguin/releases/)
* [Install with bower](http://bower.io/): `bower install penguin --save`
* Repository: Clone this repository inside your project assets `"git@github.com:bq/penguin.git"`


## What's included
[[Back To Top]](#jump-to-section)

    penguin/
    ├──  bower_components/
    │       └── jquery/
    │
    ├── lib/
    │   ├── css/
    │   │   ├── penguin.css
    │   │   └── penguin.min.css
    │   │
    │   └──js/
    │       ├── components/
    │       │   ├── alert.js
    │       │   ├── dropdown.js
    │       │   ├── modal.js
    │       │   ├── spinner.js
    │       │   └── tab.js
    │       │
    │       ├── penguin.js
    │       └── penguin.min.js
    │
    ├── node_modules/
    │
    ├── src/
    │   ├── css/
    │   │   ├── base/
    │   │   ├── components/
    │   │   └── main.scss
    │   │
    │   └── js/
    │
    └──  test/


## Usage
[[Back To Top]](#jump-to-section)


> After downloading penguin, follow these simple steps to get started:

### Customize with Sass

If you choose this way then you should Build Using a Task Runner. penguin uses Grunt for compile our code.

First of all, you should install Node and Grunt.
If you want to build the project locally, you have to run the [Grunt](http://gruntjs.com/) task `grunt build`. This task will concat and minify the sources and create the README.md. Before all this, you do not forget to run `npm install` and `bower install`.


###Compiled and minified CSS and JavaScript.

You should add to project stylesheet and link it in the header of your HTML file, like so:

        <!-- This is how you would link your penguin stylesheet -->
        <link rel="stylesheet" href="lib/css/penguin.min.css">
    </head>

If you are using any penguin JavaScript components, this needs to be loaded on the page. You do not forget add jQuery to project, penguin components require jQuery to be included. We recommend at the end before your closing <body> tags like so:

        <script src="js/jquery.min.js"></script>
        <script src="penguin/js/penguin.min.js"></script>
        <script>
            $('body').modal();
        </script>
    </body>

Also you can load only the components you need for your project:

        <script src="js/jquery.min.js"></script>
        <!-- Alerts -->
        <script src="penguin/js/components/alert.js"></script>
        <!-- Dropdowns -->
        <script src=""penguin/js/components/dropdown.js"></script>
        <!-- Modal -->
        <script src=""penguin/js/components/modal.js"></script>
        <!-- Spinner -->
        <script src=""penguin/js/components/spinner.js"></script>
    </body>

> Working with [RequireJS](http://requirejs.org):
    
    'use strict'

    require.config({
        paths: {
            'penguin': 'path-to-penguin/penguin/lib/penguin.js'
        }      
    });

You can also add a single JavaSript component:

    'use strict'

    require.config({
        paths: {
            'penguin.modal': 'path-to-penguin/penguin/src/js/modal.js'
        }      
    });

### How to include Penguin in your project

Quick example of how to import penguin to your project, overriding it and adding your own theme styles. The example file would be your main scss file (`main.scss`).

Note: 

* path_to_penguin: directory where penguin is (for example: app/bower_components/penguin)
* path_to_theme: directory where your project theme is (for example: app/css)

> main.scss

    // Base: Variables
    @import "path_to_penguin/base/_variables";
    @import "path_to_theme/base/_variables";

    // Components: Variables
    @import "path_to_penguin/components/_variables";
    @import "path_to_theme/components/_variables";
    
    // Base: Scaffolding (optional)
    @import "path_to_penguin/base/_scaffolding";
    @import "path_to_theme/base/_scaffolding";

    // Base: Mixins
    @import "path_to_penguin/base/_mixins";

    // Base: Reset
    @import "path_to_penguin/base/_reset";

    // Base: Print
    @import "path_to_penguin/base/_print";

    // Base: Utils
    @import "path_to_penguin/base/_utils";

    // Base: Responsive utilities
    @import "path_to_penguin/base/_responsive";

    // Base: Grid system
    @import "path_to_penguin/base/_grid";

    // Components: Animations
    @import "path_to_penguin/base/_animations";

    // Components: Alert
    @import "path_to_penguin/components/alert";
    @import "path_to_theme/components/alert";

    // Components: Text
    @import "path_to_penguin/components/text";
    @import "path_to_theme/components/text";

    // Components: Dropdown
    @import "path_to_penguin/components/_dropdown";
    @import "path_to_theme/components/_dropdown";

    // Components: Button
    @import "path_to_penguin/components/_button";
    @import "path_to_theme/components/_button";

    // Components: Navigation
    @import "path_to_penguin/components/_navigation";
    @import "path_to_theme/components/_navigation";

    // Components: Tab
    @import "path_to_penguin/components/_tab";
    @import "path_to_theme/components/_tab";

    // Components: Breadcumb
    @import "path_to_penguin/components/_breadcrumb";
    @import "path_to_theme/components/_breadcrumb";

    // Components: Table
    @import "path_to_penguin/components/_table";
    @import "path_to_theme/components/_table";

    // Components: Form
    @import "path_to_penguin/components/_form";
    @import "path_to_theme/components/_form";

    // UI Components: Icon
    @import "path_to_penguin/components/_icon";
    @import "path_to_theme/components/_icon";

    // UI Components: Modal
    @import "path_to_penguin/components/_modal";
    @import "path_to_theme/components/_modal";

    // Components: Banner
    @import "path_to_penguin/components/_banner";
    @import "path_to_theme/components/_banner";

    // Components: Spinner
    @import "path_to_penguin/components/_spinner";
    @import "path_to_theme/components/_spinner";

    // Components: Paginator
    @import "path_to_penguin/components/_paginator";
    @import "path_to_theme/components/_paginator";

    // Components: Panel
    @import "path_to_penguin/components/_panel";
    @import "path_to_theme/components/_panel";



## Components
[[Back To Top]](#jump-to-section)

> Components

###alert (css, js)

> An alert is a feedback message for the user. This alert can be a success, error, warning or info message.

    <div class="alert alert--modifier" role="alert" data-alert>
        <div class="alert__content">
            Alert content
            <button type="button" title="close" data-close="alert" class="alert__close">
                <i class="close" aria-hidden="true"></i><span class="invisible">Close text</span>
            </button>
        </div>
    </div>

##### usage

Add [data-alert] attribute to element and [data-close="alert"] to your close button to automatically give an alert close functionality.

##### methods

    // Initialize
    var $alert = $('target').alert();

    // Closes an alert by removing it from the DOM
    $alert.hide();



###banner (css)

> A banner show an image or group of them.

    <section class="banner banner--modifier">
        <h1 class="invisible">Banner title</h1>
        <p class="banner__content">
            <a class="banner__content__link" href="url"><img src="url" alt="Alternative text"></a>
        </p>
    </section>



###breadcrumb (css)

> A breadcrumb display the current page's location within a navigation trail.

    <nav class="breadcrumb breadcrumb--modifier" role="navigation">
        <h1 class="invisible">Breadcrumb title</h1>
        <ol class="breadcrumb__menu" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
            <li class="breadcrumb__menu__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
                <a class="breadcrumb__menu__link" itemprop="url" href="url"><span itemprop="title">Home</span></a>
            </li>
            <li class="breadcrumb__menu__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
                <a class="breadcrumb__menu__link" itemprop="url" href="url"><span itemprop="title">Category</span></a>
            </li>
            <li class="breadcrumb__menu__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
                <a class="breadcrumb__menu__link" itemprop="url" href="url"><span itemprop="title">Page</span></a>
            </li>
        </ol>
    </nav>



###button (css)

> Usually a button indicates a user action.

    <button class="btn btn--modifier">Button</button>




###dropdown (css, js)

> A dropdown is used to show/hide additional content.

    <div class="dropdown dropdown--modifier">
        <a href="#menu21" class="dropdown__link" data-rel="dropdown">Item 1</a>
        <ul id="menu21" class="dropdown__menu" role="menu" data-dropdown>
            <li class="dropdown__menu__item">
                <a href="#" class="dropdown__menu__link">Item 1</a>
            </li>
            <li class="dropdown__menu__item">
                <a href="#" class="dropdown__menu__link">Item 2</a>
            </li>
            <li class="dropdown__menu__item">
                <a href="#" class="dropdown__menu__link">Item 3</a>
            </li>
        </ul>
    </div>

##### usage

Just add [data-rel="dropdown"] to a link or any element with the [src] attribute and link to element who want toggles hidden it.
The dropdown plugin toggling the '.dropdown--selected' class and [data-selected] attribute on dropdown element.




###form (css)

> A form displays a set of related fields: input, textarea, select, checkbox, radio button...

    <div class="form">
        <form>
            <fieldset>
                <legend>Sample form</legend>
                <div class="form-control">
                    <label for="text" class="invisible">Text</label>
                    <span class="input input--icon">
                        <input type="text" id="text" name="text" placeholder="text">
                        <i class="icon icon--type" aria-hidden="true"></i>
                    </span>
                </div>
            </fieldset>
        </form>
    </div>




###grid (css)

>Grids on demand are awesome. They are semantic, flexible and powerful. We combine [susy](http://susy.oddbird.net/) with [breakpoint-slicer](https://github.com/lolmaus/breakpoint-slicer) and [breakpoint](https://github.com/at-import/breakpoint) to manage the layout, the grid and the breakpoints.

>If grids on demand don't like you doesn't matter penguin has a solution. By default penguin includes a grid system allows you to create a responsive grid layout just using the proper css classes. Be sure set to true the $helpers-grid variable.

>By default, these are the sass variables values:

    $grid-columns             : 12;
    $grid-gutter              : 30;

> You can choose your own prefix class which is associted to each breakpoint:

    $slicer-breakpoints       : 0       400px       600px       800px       1050px;
    $slicer-breakpoint-names  : 'a'     'b'         'c'         'd'         'e';

> After that, you have your classes created with the choosen prefix (col-[slicer-breakpoint-names]-12):

    <div class="row">
        <div class="col-a-2 col-b-4 col-c-6 col-d-8 col-e-12"></div>
    </div>


###modal (css, js)

> A modal is a dialog prompt, like a pop-up window, that temporarily blocks interactions with the site.

    <button class="btn btn--primary" data-rel="modal" data-target=".demo--target" data-modal="{title: 'Modal', content: 'Content', buttons: {btn: [{text: 'Accept', className: 'btn btn--primary'}]}}">Target modal</button>


#####usage

    <!-- Show modal by click event -->
    <button data-rel="modal" data-target="selector" data-modal="{title: 'Modal', content: 'Content', closeable: true}" data-ajax="{ajaxSettings}">Modal</button>

    <!-- Show modal in loaded page -->
    <div data-rel="modal-init" data-modal="{options}" data-ajax="{ajaxSettings}"></div>

Don't forget to add [data-rel] attribute.

    data-rel="modal" Shows the content in a modal component
    data-rel="modal-init" Shows the content in a modal component when the page is loaded.

The [data-target] attribute (optional) shows the content in a modal component. Default value: 'body'.

The [data-ajax] attribute (optional) sets jQuery ajaxSettings. Default value: jquery.ajax.


####options

<em>classModifier: </em> Adds a class modifier in the modal component. Default value: '' (string)

<em>title: </em> Modal title in top. ''

<em>backdrop: </em> Adds a overlay behind to the modal. Default value: true (boolean)

<em>backdropClassName: </em> Set this class to backdrop. Default value: 'modal--backdrop' (string)

<em>show: </em> Shows the component after creating the model object.   Default value:  false (boolean)

<em>closeable: </em> The modal can be closed by clicking out of it.  Default value: true (boolean)

<em>closeIcon: </em> Shows/hides the close icon. true (boolean)

<em>closeText: </em> Close icon text and tooltip(title) text.    Default value: 'close' (string)

<em>buttons.align: </em> Adds classes to align the buttons. 'left', 'center', 'right'    Default value: 'right' (string)

<em>buttons.btn: </em> Settings of each button. (Array of objects)

<em>buttons.btn.text: </em>Button text. Default value: '' (string)

<em>buttons.btn.className: </em> Class name ('btn btn--primary' ).   Default value: '' (string)

<em>buttons.btn.url: </em> Adds a link element with the url value in its href attribute.   Default value: undefined (string (optional))

<em>template: </em> Replace modal content with custom html. (string)


    $('body').modal({
        backdrop: true,
        closeable: true,
        classModifier: '',
        title: 'Modal title',
        content: 'Modal content',
        ajaxSettings: undefined,
        close: {
            text: 'close',
            className: 'fa fa-times'
        },
        buttons: {
            align: 'right',
            btn: [{
                text: 'Topper',
                className: 'btn btn--primary'
            },
            {
                text: 'Harley',
                className: 'btn btn--secondary'
            },
            {
                url: '#',
                text: 'Link',
                className: 'btn'cd
            }]
        }
    });


    $('body').modal({
        template: '<div>Custom Modal</div>'
    });

#####methods

    // Create a modal
    var myModal = $.penguin.modal({title: 'My modal'}, '.panel');

    // Show the created modal
    myModal.show();

    // Hide the created modal
    myModal.hide();

#####events

    // This event is fired when the modal is shown.
    $('target').on('modal:show', function() {});

    // This event is fired when the modal is hidden.
    $('target').on('modal:hide', function() {});

    // This event is fired when the ajax content is loaded.
    $('target').on('modal:ajaxLoaded', function() {});



###navigation (css)

> Contains links to other sections of the website.

    <nav class="nav nav--modifier" role="navigation">
        <h1 class="hidden">Nav title/h1>
        <ul class="nav__menu">
            <li class="nav__menu__item">
                <a href="url" class="nav__menu__link">Item</a>
                <ul class="nav__submenu" role="menu">
                    <li class="nav__submenu__item"><a href="url" class="nav__submenu__link">Subitem</a></li>
                </ul>
            </li>
        </ul>
    </nav>




###paginator (css)

> Paginator is a type of navigation that lets users navigate through related pages.

    <ul class="paginator paginator--modifier">
        <li class="paginator__item"><a href="#" class="paginator__link">First</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">Previous</a></li>
        <li class="paginator__item paginator__item--selected"><a href="#" class="paginator__link">1</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">2</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">3</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">4</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">Next</a></li>
        <li class="paginator__item"><a href="#" class="paginator__link">Last</a></li>
    </ul>




###panel (css)

> Panel is used to wrap any content inside a box and  if you need you can add dropdown funcionality transform it to dropdown only add "panel--dropdown" class modifier.

    <!-- Simple panel-->
    <section class="panel">
        <h1 class="panel__title">Panel title</h1>
        <div class="panel__content">Panel content</div>
    </section>

    <!-- Dropdown panel -->
    <section class="panel panel--dropdown">
        <div class="dropdown dropdown--stacked dropdown--selected" data-selected>
            <h1 class="panel__title">Panel title</h1>
            <a data-rel="dropdown" href="#content"><i class="fa fa-chevron-down"></i></a>
            <div id="content" class="panel__content" data-dropdown>Panel content</div>
        </div>
    </section>




###spinner (css, js)

> Loading spinner.

#####usage

    // Default spinner
    $('target').spinner('show');

    // Custom spinner
    $('target').spinner({text: 'Cargando...', spinnerClass : 'spinner__element--square', show: 'true'});

Target is the selector where spinner will be shown.

####options

<em>spinnerClass: </em> Adds this class to spinner. Default value: 'spinner__element--circle'. (string)

<em>text: </em>Fallback text inside spinner. Default value: 'Loading...'. (string)

<em>show: </em>Displays just after creating it. Default value: false (boolean)

<em>backdrop: </em>Show layer under spinner. Default value: true (boolean)

<em>backdropClassName: </em> Set this class to backdrop. Default value: 'spinner--backdrop' (string)

<em>template: </em> Replace modal content with custom html. (string)

    $('body').spinner{
        spinnerClass: 'spinner__element--circle',
        text: 'Loading...',
        show: false,
        backdrop: true,
        backdropClassName: 'spinner--backdrop'
    };

    $('body').spinner{
        template: '<div>Custom Spinner</div>'
    };


#####methods

    // Create a spinner
    $('target').spinner(options);


    // Show the created spinner
    $('target').spinner('show');


    // Hide the spinner
    $('target').spinner('hide');


#####events

The spinner's target ('body' or custom target) receives the event.

    // This event is fired when the spinner is shown.
    $('target').on('spinner:show', function() {});

    // This event is fired when the spinner is hidden.
    $('target').on('spinner:hide', function() {});




###tab (css, js)

> Tabs help you organize and navigate multiple sections of content in a single container.

    <div class="tab tab--modifier" data-tab>
        <ul class="tab__block" role="tab">
            <li class="tab__block__item [active]"><a href="#tab1" class="tab__block__link">Tab text</a></li>
            <li class="tab__block__item"><a href="#tab2" class="tab__block__link">Tab text</a></li>
            <li class="tab__block__item"><a href="#tab3" class="tab__block__link">Tab text</a></li>
            <li class="tab__block__item"><a href="#tab4" class="tab__block__link">Tab text</a></li>
        </ul>
        <div class="tab__content">
            <div class="tab__content__item tab__content__item--selected" id="tab1">Tab content</div>
            <div class="tab__content__item" id="tab2">Tab content</div>
            <div class="tab__content__item" id="tab3">Tab content</div>
            <div class="tab__content__item" id="tab4">Tab content</div>
        </div>
    </div>

##### usage

Just add [data-tab] attribute to a tab.


##### events

    // This event is fired when the content tab changes.
    $(target).on('tab:toggle', function() {});


###table (css)

> A classic. A table displays a collections of tabular data grouped into rows and cols.

    <table class="table">
        <caption></caption>
        <tfoot>
            <tr>
                <td colspan="4"></td>
            </tr>
        </tfoot>
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>


###text (css)

> Styles for all of the most basic typographical elements. Remember to use all the elements inside the .text wrapper:

    <div class="text">
        <!-- Place here the html element -->
    </div>

> Also, you can use specific classes for heading styles (.h1, .h2, .h3, .h4, .h5, .h6):

    <article>
        <h1 class="h3"><!-- Place here your title --></h1>
    </article>




--------
<small>_This readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on Wed Apr 15 2015 14:43:46 GMT+0200 (CEST)._</small>