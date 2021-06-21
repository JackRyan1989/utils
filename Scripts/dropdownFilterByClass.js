$(document).ready(function () {
  $("tr.FacultyTableRow").each(function () {
    //Correct class so that department is a string rather than tag:
    var correctedClass = $(this)
      .attr("class")
      .replace(/{ABC29931-60AA-486A-8576-F562EAFE6DB5}/g, "anthro")
      .replace(/{184589C5-ED8C-4793-A480-F11F36F916D5}/g, "bees")
      .replace(/{7A864DE8-2A72-484F-A8A9-66C39C5A6B9F}/g, "bio")
      .replace(/{D08753F2-3F2D-4C84-83A1-0DA3FAD02019}/g, "chem")
      .replace(/{AEEC14CC-7CDE-45A3-891E-7A3DDB2F611B}/g, "comm")
      .replace(/{A5AA877A-E3CE-4F01-B91B-CF273E9AFF97}/g, "crim")
      .replace(/{A5FFC9AD-2E23-406C-9272-ABDC6133FDE6}/g, "eng")
      .replace(/{1AC02B64-BAD4-4F82-86A2-C7E5F2A67EB6}/g, "hist")
      .replace(/{B035B4B8-9B9B-40F2-A6F7-14E37AD99BA4}/g, "math")
      .replace(/{DE504C9F-D25E-4B0E-B862-EF9248CAA5D1}/g, "phys")
      .replace(/{03056CFC-9FB7-48C4-B1B8-0B85BFE00B14}/g, "poli")
      .replace(/{0BF9D3B8-1EC4-49F8-9E66-B6568CAE4818}/g, "psych")
      .replace(/{120FF132-CC7A-4159-971E-0ECEDD1BFCCF}/g, "soci")
      .replace(/{33EC9B8A-DDE9-4161-B8C1-BA3884C99A2A}/g, "global")
      .replace(/{3F7E3094-F1A5-4938-B0FE-5468B8D8E4F6}/g, "mobi")
      .replace(/{B91D4854-35DA-4ECE-9E66-5ED853C9F71C}/g, "public")
      .replace(/{648E2753-A92E-42B2-9EC2-3E30E5F40DEF}/g, "stas")
      .replace(/{11CA755A-8426-4AF4-84B9-87854C68EC04}/g, "well")
      .replace(/\{.*?\}/, "")
      .replace(/\|/g, " ");
    $(this).attr("class", correctedClass);
  });

  $(".type-item").each(function () {
    var correctedText = $(this)
      .text()
      .replace(/faculty/g, "Faculty")
      .replace(/teaching/g, "Teaching")
      .replace(/emeriti/g, "Emeriti")
      .replace(/visiting/g, "Visiting")
      .replace(/affiliated/g, "Affiliated");
    $(this).text(correctedText);
  });

  // $(".accept-item").each(function () {
  //   var correctedText = $(this)
  //     .text()
  //     .replace(/true/g, "Accepting Students")
  //     .replace(/false/g, "");
  //   $(this).text(correctedText);
  // });

  // Add float left styling to search bar:
  $(".form-control.input-sm").css("float", "left");
});

//One function to filter them all:
$("select.filterBy").change(function () {
  //Reset the items to be displayed each time a selector is changed:
  var items = [];
  //Grad the option value from the selectors and throw it into an array:
  var filters = $.map($("select.filterBy").toArray(), function (e) {
    return $(e).val();
  });

  //Hide all the table rows:
  $("#example tbody").find("tr.FacultyTableRow").hide();
  //Look through the table body for rows that contain the classes we want,
  // and then display them.
  $("#example tbody")
    //Grab all the rows:
    .find("tr.FacultyTableRow")
    //Find only the rows with the classes that we want, and then show them:
    .filter(function () {
      //If checks for each possible combination of classes:
      //filters[0] = Department
      //filters[1] = Type
      //filters[2] = Acceptance
      //Department Only:
      if (
        filters[0] !== " " &&
        filters[1] === " " &&
        // filters[2] === " " &&
        $(this).hasClass(filters[0]) &&
        !$(this).hasClass(filters[1]) 
        //&& !$(this).hasClass(filters[2])
      ) {
        items.push($(this));
      }
      //Department and Type:
      else if (
        filters[0] !== " " &&
        filters[1] !== " " &&
        //filters[2] == " " &&
        $(this).hasClass(filters[0]) &&
        $(this).hasClass(filters[1]) 
        //&& !$(this).hasClass(filters[2])
      ) {
        items.push($(this));
      }
      //Department Type and Acceptance:
      // else if (
      //   filters[0] !== " " &&
      //   filters[1] !== " " &&
      //   filters[2] !== " " &&
      //   $(this).hasClass(filters[0]) &&
      //   $(this).hasClass(filters[1]) &&
      //   $(this).hasClass(filters[2])
      // ) {
      //   items.push($(this));
      // }
      // //Department and Acceptance:
      // else if (
      //   filters[0] !== " " &&
      //   filters[1] == " " &&
      //   filters[2] !== " " &&
      //   $(this).hasClass(filters[0]) &&
      //   !$(this).hasClass(filters[1]) &&
      //   $(this).hasClass(filters[2])
      // ) {
      //   items.push($(this));
      // }
      //Type Only:
      else if (
        filters[0] == " " &&
        filters[1] !== " " &&
        //filters[2] == " " &&
        $(this).hasClass(filters[1]) &&
        !$(this).hasClass(filters[0]) 
        //&& !$(this).hasClass(filters[2])
      ) {
        items.push($(this));
      }
      //Type and Acceptance:
      // else if (
      //   filters[0] == " " &&
      //   filters[1] !== " " &&
      //   filters[2] !== " " &&
      //   $(this).hasClass(filters[1]) &&
      //   $(this).hasClass(filters[2]) &&
      //   !$(this).hasClass(filters[0])
      // ) {
      //   items.push($(this));
      // }
      // //Acceptance Only:
      // else if (
      //   filters[0] == " " &&
      //   filters[1] == " " &&
      //   filters[2] !== " " &&
      //   $(this).hasClass(filters[2]) &&
      //   !$(this).hasClass(filters[0]) &&
      //   !$(this).hasClass(filters[1])
      // ) {
      //   items.push($(this));
      // }
      //Display all:
      else if (
        filters[0] == " " &&
        filters[1] == " "
      ) {
        $("#example tbody").find("tr.FacultyTableRow").show();
      }
      return items;
    });
  //Loop through the list of rows and display them
  for (var i = 0; i < items.length; i++) {
    items[i].show();
  }
});

//Reset button - on click set the select options to None:
$("#reset").click(function (event) {
  $(event).preventDefault;
  $("#example tbody").find("tr.FacultyTableRow").show();
  $("select").val("None");
});
