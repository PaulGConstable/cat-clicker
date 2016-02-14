var model = {
    currentCat: null,
    //hides the admin display area.
    adminShow: false, 
    cats: [
        {
            clickCount : 0,
            name : 'Bonnie',
            imgSrc : 'img/cat.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tammy',
            imgSrc : 'img/cat2.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Whiskers',
            imgSrc : 'img/cat3.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Paws',
            imgSrc : 'img/cat4.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Clyde',
            imgSrc : 'img/cat5.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        }
    ]
};

var octopus = {
    init: function() {
        // Set intial view as first Cat
        model.currentCat = model.cats[0];
        // Intialize the Views for both list and Cat
        viewCatList.init();
        viewCat.init();
        adminView.init();
        adminView.hide();
    },

    // Get the Current Cat from the model
    getCurrentCat: function() {
        return model.currentCat;
    },

    // Get all the cats from the model
    getCats: function() {
        return model.cats;
    },

    // Shows the initial cat and gives it to View
    setCurrentCat: function(cat) {
        model.currentCat = cat;
        adminView.render();
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        viewCat.render();
        adminView.render();
    },

    openAdmin: function() {
        // displays the admin input boxes and buttons
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show(); 
        }
        // hides the admin input boxes and buttons
        else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();
        }
        adminView.render();
    },

    hideAdmin: function() {
        adminView.hide();
    },

    saveAdmin: function() {
        model.currentCat.name= adminCatName.value;
        model.currentCat.imgSrc= adminCatURL.value;
        model.currentCat.clickCount= adminCatClicks.value;
        adminView.hide();
        viewCatList.render();
        viewCat.render();
    }
};


var viewCat = {
    init: function () {
        this.cat = document.getElementById('cat');
        this.catName = document.getElementById('cat-name');
        this.catImg = document.getElementById('cat-img');
        this.catCount = document.getElementById('cat-count');

    // Add increment counter on image click
    this.catImg.addEventListener('click', (function() {
        octopus.incrementCounter();
    }));

    // render this to update correct elements in HTML
        this.render();

    },

    render: function () {
        var currentCat = octopus.getCurrentCat();
        this.catName.textContent = currentCat.name;
        this.catCount.textContent = currentCat.clickCount;
        this.catImg.src = currentCat.imgSrc;

    }
};

var viewCatList = {
    // Get the HTML ID for access later
    init: function () {
        this.catList = document.getElementById('cat-list');
    // render this to update correct elements in HTML
        this.render();
    },

    render: function () {  
        // Get all the cats
        var cats = octopus.getCats();
            // Clear the HTML string in index.html with id cat-list
            this.catList.innerHTML = '';

            for (var i = 0; i < cats.length; i++){
            var cat = cats[i];

            // Add bullet points into navigation
            var elem = document.createElement('li');
            // Add all the cat names to navigation
            elem.textContent = cat.name;

            // On click of cat name in navigation render
            // clicked cat in the viewCat
            elem.addEventListener('click', (function(cat) {
                return function () {
                    octopus.setCurrentCat(cat);
                    viewCat.render();
                };
            })(cat));
        this.catList.appendChild(elem);
        };
    }
};

var adminView = {

    init: function() {
        // Store elements for DOM later
        adminCatName = document.getElementById("cat-note-name");
        adminCatClicks = document.getElementById("cat-note-clicks");
        adminCatURL = document.getElementById("cat-note-url");

        this.adminButton = document.getElementById('admin');
        this.cancelButton = document.getElementById('cancel');
        this.saveButton = document.getElementById('save');

        // Show the admin area when clicked
        this.adminButton.addEventListener('click', function() {
            octopus.openAdmin();
        });

        // Hide the admin area when clicked
        this.cancelButton.addEventListener('click', function() {
            octopus.hideAdmin();
        });

        // Save the admin area when clicked
        this.saveButton.addEventListener('click', function() {
            octopus.saveAdmin();
        });

        this.render();
    },

    render: function(){
        // calls the current cat and displays info in input
        var currentCat = octopus.getCurrentCat(); 
        adminCatName.value = currentCat.name;
        adminCatURL.value = currentCat.imgSrc;
        adminCatClicks.value = currentCat.clickCount;
    },

    show: function(){
        // Opens and shows the form in view
        var catNote = document.getElementById('cat-note-form');
        catNote.style.display = 'block';
    },
        
    hide: function(){
        // Hides the form in view
        var catNote = document.getElementById('cat-note-form');
        catNote.style.display = 'none';
    }

};

// make it go!
octopus.init();