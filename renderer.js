// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
(function($) {
    $(document).ready(function() {

        console.log('jquery working!')


        // Initial load of correct pages

        $("body").addClass("startup");
        $('#content').load('templates/startup-fault.html');

        // Primary Navigation

        $('#home').click(function() {
            console.log('home clicked!')
            $('#content').load('templates/home.html').hide().fadeIn('fast');
        });

        $('#startup').click(function() {
            console.log('startup clicked!')
            $('#content').load('templates/startup.html').hide().fadeIn('fast');
        });

        $('#faults').click(function() {
            console.log('faults clicked!')
            $('#content').load('templates/faults.html').hide().fadeIn('fast');
        });

        $('#engineer').click(function() {
            console.log('engineer clicked!')
            $('#content').load('templates/engineer.html').hide().fadeIn('fast');
        });

        // Active class on nav a 

        $(function() {
            $( "nav a" ).click(function() {
                $( "nav a" ).not($( this )).removeClass( "active" );
                $( this ).toggleClass( "active" );
            });
        });

        // Inapp Navigation

        $(document).on('click', "#graph", function() {
            console.log('graph clicked!')
            $('#content').load('templates/graph.html');
        });

        $(document).on('click', "#success", function() {
            console.log('success clicked!')
            $('#content').load('templates/home.html');
        });

        $(document).on('click', "#startup", function() {
            console.log('startup clicked!')
            $('#content').load('templates/startup.html');
        });

        $(document).on('click', "#more-info", function() {
            console.log('startup clicked!')
            $('#content').load('templates/more-info.html');
        });



        // Nagivation switch

        $("nav .home").click(function() {
            $("body").removeClass("startup");
            $("body").addClass("home");
        });

        $("nav .startup, nav .faults, nav .engineer, nav .help").click(function() {
            $("body").removeClass("home");
            $("body").addClass("startup");
        });

    });
})(jQuery);