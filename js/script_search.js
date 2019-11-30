$(document).ready(function(){
var arr = [];

/*make part*/
var cars = {
    'Audi': {
        'model1': ['v1','v2','v3','v4','v5','v6'],
        'model2': ['v7','v77','v77','v7','v7','v23'],
        'model3': ['v8','v18','v18','v89','v89','v8'],
    },
    'Honda': {
        'model4': ['v9','v32','v32','v91','v191','v19'],
        'model5': ['v201','v10','v201','v10','v10','v201'],
        'model6': ['v63','v63','v11','v11','v63','v11'],
    },
    'Mitsubishi': {
        'model7': ['v52','v12','v52','v12','v52','v12'],
        'model8': ['v13','v13','v13','v13','v13','v13'],
        'model9': ['v14','v85','v14','v85','v14','v14'],
    },
    'Peugeot': {
        'model10': ['v63','v15','v63','v15','v15','v163'],
        'model11': ['v19','v96','v19','v16','v96','v16'],
        'model12': ['v20','v20','v17','v20','v175','v17'],
    },
}
var years = ["2017","2016","2015","2014","2013","2012"];
var territory = ["USA","Asia","Canada","Malasia"];
//console.log(territory);

function createMakes() {
    $(".make ul").empty();
    $("#makeAuto").empty();
    $(".car .spanMake").empty();
    $(".car .spanModel").empty();
    $(".car .spanVariant").empty();
    $(".year span").empty();
    $(".territory span").empty();
    for (var key in cars) {
        $(".make ul").append('<li data-name="' + key + '" class="carsList">' + key + '</li>');
        $("#makeAuto").append("<option value='" + key + "' selected'>"+key+"</option>");
        $(".make ul").attr('data-page', 'make');
    }

}

function createModels(make, selected) {
    $("#modelAuto").empty();
    $(".car .spanModel").empty();
    for (var key in cars[make]) {
        var selectedOpt = (key == selected) ? " selected='selected'" : "";
        $(".make ul").append('<li data-name="' + key + '" data-make="' + make + '" class="carsList">' + key + '</li>');
        $("#modelAuto").append("<option value='" + key +"' " + selectedOpt + ">"+key+"</option>");
        $(".make ul").attr('data-page', 'model');
    }
}

function createVariants(make, model, selected) {
    $("#variantAuto").empty();
    $(".car .spanVariant").empty();
    $("#modelAuto option").prop("selected", false);
    for (var i = 0; i < cars[make][model].length; ++i) {
        $(".make ul").append('<li data-name="' + cars[make][model][i] + '" class="carsList">' + cars[make][model][i] + '</li>');
        $("#variantAuto").append("<option value='" + cars[make][model][i] + "'>"+cars[make][model][i]+"</option>");
        $("#modelAuto option[value='"+selected+"']").prop("selected", true);
        // $("#modelAuto").trigger("change");
        $(".make ul").attr('data-page', 'variant');
    }
}

function createYears(selected){
    $("#yearAuto").empty();
    $(".year span").empty();
    $("#variantAuto option").prop("selected", false);
    for (var i = 0; i < years.length; ++i) {
        $(".make ul").append('<li  class="carsList">' + years[i] + '</li>');
        $("#yearAuto").append("<option value='" + years[i] + "'>"+years[i]+"</option>");
        $("#variantAuto option[value='"+selected+"']").prop("selected", true);
        // $("#variantAuto").trigger("change");
        $(".make ul").attr('data-page', 'year');

    }
}
function createTerritory(selected){
    $("#territoryAuto").empty();
    $(".territory span").empty();
    $("#yearAuto option").prop("selected", false);
    for (var i = 0; i < territory.length; ++i) {
        $(".make ul").append('<li  class="carsList">' + territory[i] + '</li>');
        $("#territoryAuto").append("<option value='" + territory[i] + "'>"+territory[i]+"</option>");
        $("#yearAuto option[value='"+selected+"']").prop("selected", true);
        // $("#yearAuto").trigger("change");
        $(".make ul").attr('data-page', 'territory');
    }
    
}

function bindClick() {
    $(".make ul li").click(function() {
        var tabName = $(".make ul").attr('data-page');
        var name = $(this).data('name');
        $(".make ul").empty();
        switch (tabName) {
            case 'make':
                createModels(name);
                $(".modelLi").removeClass("disabled");
                $(".makeLi").removeClass("activCarChoose");
                $(".modelLi").addClass("activCarChoose");
                $("#makeAuto option:selected").text($(this).html());
                $(".car .spanMake").text($(this).html());
                break;
            case 'model':
                var make = $(this).data('make');
                $(".variantLi").removeClass("disabled");
                $(".modelLi").removeClass("activCarChoose");
                $(".variantLi").addClass("activCarChoose");
                createVariants(make, name, $(this).text());

                $(".car .spanModel").text($(this).text())
                break;
            case 'variant':
                $(".yearLi").removeClass("disabled");
                $(".variantLi").removeClass("activCarChoose");
                $(".yearLi").addClass("activCarChoose");
                createYears($(this).text());
                 $(".car .spanVariant").text($(this).text())
                break; 
            case 'year':
                $(".territoryLi").removeClass("disabled");
                $(".yearLi").removeClass("activCarChoose");
                $(".territoryLi").addClass("activCarChoose");
                createTerritory($(this).text());
                $(".year span").text($(this).text())
                break; 
            case 'territory':
                $(".territoryLi").removeClass("activCarChoose");
                $("#territoryAuto option[value='"+$(this).text()+"']").prop("selected", true);
                $("#territoryAuto").trigger("change");
                $('.makeDiv').css("display","none")
                 $(".territory span").text($(this).text())
                break; 
        }
        bindClick();
    })       
}
var clickB = true;

$(".applied button").on('click', function(){
    $(".selectOptions").toggle();
    if(clickB){
        $(this).addClass("activeChangeButton");
        clickB = false;
    }
    else{
        $(this).removeClass("activeChangeButton");
        clickB = true;
    }

   
})

$(".makeLi").click(function(){
    createMakes();
bindClick();
        $(".makeDiv").toggle();
    })

$("#makeAuto").change(function(){
    $("#variantAuto").empty();
    $("#modelAuto").empty();
    var make = $("#makeAuto").val();
        $(".car .spanMake").html($("#makeAuto").val());
        for (var key in cars[make]) {
            $("#modelAuto").append("<option value='" + key +"'>"+key+"</option>");
        } 

        var model =  $("#modelAuto").val();
        $(".car .spanModel").html($("#modelAuto").val())

        for (var i = 0; i < cars[make][model].length; ++i) {
                $("#variantAuto").append("<option value='" +  cars[make][model][i]  +"'>"+ cars[make][model][i] +"</option>");
            } 
        $(".car .spanVariant").html($("#variantAuto").val())   
    
})
    $("#modelAuto").change(function(){
        $("#variantAuto").empty();
        $(".car .spanModel").html($("#modelAuto").val())
            var make = $("#makeAuto").val();
            var model =  $("#modelAuto").val();

            for (var i = 0; i < cars[make][model].length; ++i) {
                $("#variantAuto").append("<option value='" +  cars[make][model][i]  +"'>"+ cars[make][model][i] +"</option>");
            }
        $(".car .spanVariant").html($('#variantAuto').val())
    }) 

    $("#variantAuto").change(function(){
        $(".car .spanVariant").html($('#variantAuto').val())
    })

    $("#territoryAuto").change(function(){
        $(".territory span").html($('#territoryAuto').val())
    })
    $("#yearAuto").change(function(){
        $(".year span").html($('#yearAuto').val())
    })



    $(".deprecation").on('click', function(){
        $(".subMenu").toggle();
    })
    $(".SupplyDemand").click(function(){
        $(".subMenu1").toggle();
    })

    $(".sideBar a").on('click', function(){
        $(".sideBar a").removeClass("chartsMenuActive");
        $(this).addClass("chartsMenuActive");
    })


    /*apply button*/
    $(".selectOptions button").on('click',function(){
        $(".charts").css('display','block');
    })

    /*search function for side bar*/

    $("#search-criteria").on("keyup", function() {
        var searchWord = $(this).val().toLowerCase();
        $(".sideBar h4 a").each(function() {
            var result = $(this).text().toLowerCase();
            $(this).closest('.sideBar h4')[ result.indexOf(searchWord ) !== -1 ? 'show' : 'hide' ]();
        });
    });  

    /*search function for menu*/

    $("#search-criteria-menu").on("keyup", function() {
        var searchWordMenu = $(this).val().toLowerCase();
        $(".makeDiv ul li").each(function() {
            var resultMenu = $(this).text().toLowerCase();
            $(this).closest('.makeDiv ul li')[resultMenu.indexOf(searchWordMenu) !== -1 ? 'show' : 'hide' ]();
        });
    }); 

    $(".depreciationTable tr ").on('click',function(){
        console.log($(this).text()[2]);
    })


    $(".closeButton").on('click', function(){
       
            $('.modal').modal('toggle');
       
    })

    $(".manageV").on('click', function(){
        alert('hi')
    })
    
});

 


    



  