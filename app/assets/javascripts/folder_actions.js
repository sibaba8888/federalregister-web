$(document).ready(function() {
  // delete a folder
  $('#delete-folder').on('click', function(event){
    event.preventDefault();

    var folderData = {
      numClippings: $('#clippings li').size(),
      folderSlug: $('h2.title').data().folderSlug
    };

    var modalTemplate = $("#delete-folder-modal-template").html();
    var handlebarsModal = Handlebars.compile(modalTemplate);

    $('body').append( handlebarsModal(folderData) );
    $('#delete-folder-modal').jqm({
        modal: true,
        toTop: true,
        onShow: myfr2_jqmHandlers.show,
        onHide: myfr2_jqmHandlers.hide
    });
    $('#delete-folder-modal').jqmShow().centerScreen();
  });
});
