// Load fact
$.get("http://numbersapi.com/1/30/date?json", function (data) {
  $("#fact-box").text(data.text);
});

const dropArea = $("#drop-area");
const fileInput = $("#fileElem");

$("#fileSelectBtn").click(() => fileInput.click());

dropArea.on("dragover", function (e) {
  e.preventDefault();
  dropArea.addClass("hover");
});

dropArea.on("dragleave", function () {
  dropArea.removeClass("hover");
});

dropArea.on("drop", function (e) {
  e.preventDefault();
  dropArea.removeClass("hover");
  const files = e.originalEvent.dataTransfer.files;
  handleFiles(files);
});

fileInput.on("change", function () {
  handleFiles(this.files);
});

function handleFiles(files) {
  const formData = new FormData();
  formData.append("image", files[0]);

  $.ajax({
    url: "/upload_images",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      $("#upload-status").html(`<div class="alert alert-success">Upload successful: ${JSON.stringify(response.filename)}</div>`);
    },
    error: function () {
      $("#upload-status").html(`<div class="alert alert-danger">Upload failed.</div>`);
    }
  });
}