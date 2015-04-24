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
    @import "path_to_penguin/src/base/_variables";
    @import "path_to_theme/base/_variables";

    // Components: Variables
    @import "path_to_penguin/src/components/_variables";
    @import "path_to_theme/components/_variables";
    
    // Base: Scaffolding (optional)
    @import "path_to_penguin/src/base/_scaffolding";
    @import "path_to_theme/base/_scaffolding";

    // Base: Mixins
    @import "path_to_penguin/src/base/_mixins";

    // Base: Reset
    @import "path_to_penguin/src/base/_reset";

    // Base: Print
    @import "path_to_penguin/src/base/_print";

    // Base: Utils
    @import "path_to_penguin/src/base/_utils";

    // Base: Responsive utilities
    @import "path_to_penguin/src/base/_responsive";

    // Base: Grid system
    @import "path_to_penguin/src/base/_grid";

    // Components: Animations
    @import "path_to_penguin/src/base/_animations";

    // Components: Alert
    @import "path_to_penguin/src/components/alert";
    @import "path_to_theme/components/alert";

    // Components: Text
    @import "path_to_penguin/src/components/text";
    @import "path_to_theme/components/text";

    // Components: Dropdown
    @import "path_to_penguin/src/components/_dropdown";
    @import "path_to_theme/components/_dropdown";

    // Components: Button
    @import "path_to_penguin/src/components/_button";
    @import "path_to_theme/components/_button";

    // Components: Navigation
    @import "path_to_penguin/src/components/_navigation";
    @import "path_to_theme/components/_navigation";

    // Components: Tab
    @import "path_to_penguin/src/components/_tab";
    @import "path_to_theme/components/_tab";

    // Components: Breadcumb
    @import "path_to_penguin/src/components/_breadcrumb";
    @import "path_to_theme/components/_breadcrumb";

    // Components: Table
    @import "path_to_penguin/src/components/_table";
    @import "path_to_theme/components/_table";

    // Components: Form
    @import "path_to_penguin/src/components/_form";
    @import "path_to_theme/components/_form";

    // UI Components: Icon
    @import "path_to_penguin/src/components/_icon";
    @import "path_to_theme/components/_icon";

    // UI Components: Modal
    @import "path_to_penguin/src/components/_modal";
    @import "path_to_theme/components/_modal";

    // Components: Banner
    @import "path_to_penguin/src/components/_banner";
    @import "path_to_theme/components/_banner";

    // Components: Spinner
    @import "path_to_penguin/src/components/_spinner";
    @import "path_to_theme/components/_spinner";

    // Components: Paginator
    @import "path_to_penguin/src/components/_paginator";
    @import "path_to_theme/components/_paginator";

    // Components: Panel
    @import "path_to_penguin/src/components/_panel";
    @import "path_to_theme/components/_panel";



## Components
[[Back To Top]](#jump-to-section)

See all components on [Penguin Themes](http://penguin.docs.bqws.io/)




--------
<small>_This readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on Mon Apr 20 2015 18:44:08 GMT+0200 (CEST)._</small>
