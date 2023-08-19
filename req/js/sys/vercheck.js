var curver = 130;

$(function() {
  verCheck();
});

function verCheck(){
  if(cfg.General.disableUpdateCheck == false){
    $('#vercheck').css('display','block');
    $('#vercheck').html('<a class="checking"></a>');
    var versionCheck = $.get( "https://windmillart.net/jspver.html", function( data ){
      latver = Number(data);
    })
    .done(function(){
      if(curver < latver){
        setTimeout(function(){ $('#vercheck').html('<a onclick="goToPage(\'https://windmillart.net/?p=jsplacement\')" class="newavailable"></a>');}, 3500);
      }
      else{
        setTimeout(function(){ $('#vercheck').html('<a class="uptodate"></a>');}, 3500);
      }
    })
    .fail(function() {
      setTimeout(function(){ $('#vercheck').html('<a class="failure"></a>');}, 3500);
    });
  }
}
