import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";
Template.staticPages.onRendered(() => {
  /* global tinymce */
  tinymce.init({
    selector: "textarea.spform",
    height: 300,
    theme: "modern",
    skin_url: "/packages/teamon_tinymce/skins/lightgray", // eslint-disable-line
    plugins: `print preview fullpage directionality visualblocks visualchars fullscreen
      image link media codesample table charmap hr pagebreak nonbreaking
      anchor toc advlist lists textcolor imagetools colorpicker textpattern
      advlist autolink link image lists charmap print preview anchor
      searchreplace wordcount code insertdatetime media
      save contextmenu template paste`,
    toolbar: `insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright
     alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | 
     forecolor backcolor emoticons`
  });
});

Template.managePageForm.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPages");
  });
});

Template.managePageForm.helpers({
  staticPages() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPages.find({
        shopId: Reaction.getShopId()
      });
    }
  }
});

Template.managePageForm.events({
  "click .deletePage"(event) {
    event.preventDefault();
    event.stopPropagation();
    Alerts.alert(
      {
        title: "Are you sure you want to remove this page?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes"
      },
      confirmed => {
        if (confirmed) {
          const _id = $(event.currentTarget)
            .parents("tr")
            .attr("id");
          Meteor.call("deletePage", _id);
        }
        return false;
      }
    );
  },

  "click .editPage"(event) {
    event.preventDefault();
    event.stopPropagation();
    // Get ID of the page and then retrieve from the database
    const _id = $(event.currentTarget)
      .parents("tr")
      .attr("id");
    const pageDetails = StaticPages.find({ _id }).fetch();
    // Set the page form to values gotten from the form for editing
    $(".static-page")
      .find(".hide")
      .removeClass("hide")
      .addClass("cancel-button");
    $(".static-page")
      .find("#sp-name")
      .val(pageDetails[0].pageName);
    $(".static-page")
      .find("#sp-url")
      .val(pageDetails[0].pageAddress);
    $(".static-page")
      .find("#sp-show")
      .prop("checked", pageDetails[0].isEnabled === true ? true : false);
    $(".static-page")
      .find(".edit-page-data")
      .attr("id", pageDetails[0]._id);
    tinymce.activeEditor.setContent(pageDetails[0].pageContent);
    $(".static-page")
      .find(".save-static-page")
      .html("Update Page");
    $(".createpage")
      .find(".add-page")
      .html(`Updating ${pageDetails[0].pageName}`);
  }
});

Template.addPageForm.events({
  "submit form": event => {
    event.preventDefault();
    const field = event.target;
    const pageName = field.name.value;
    const pageAddress = field.url.value;
    const pageContent = field.content.value;
    const isEnabled = true;
    const userId = Meteor.userId();
    const shopId = Reaction.getShopId();
    let createdAt = new Date();
    const updatedAt = new Date();
    if (
      $(".static-page")
        .find(".edit-page-data")
        .attr("id") === undefined
    ) {
      const checkPageDetails = StaticPages.findOne({ $or: [ { pageName: pageName }, { pageAddress: pageAddress } ] });
      if (checkPageDetails) {
        return Alerts.toast("The page name/address exists already", "error");
      }
      Meteor.call("insertPage", pageName, pageAddress, pageContent, userId, shopId, isEnabled, createdAt, function (err) {
        if (err) {
          Alerts.toast(err.message, "error");
        } else {
          Alerts.alert(
            {
              title: "Page Successfully Created",
              type: "success"
            });
        }
      });
    } else {
      const _id = $(".static-page")
        .find(".edit-page-data")
        .attr("id");
      const pageDetails = StaticPages.find({ _id }).fetch();
      if (pageDetails.length > 0) {
        createdAt = pageDetails[0].createdAt;
        // Update page information in the database
        Meteor.call(
          "updatePage",
          _id,
          pageName,
          pageAddress,
          pageContent,
          userId,
          shopId,
          isEnabled,
          createdAt,
          updatedAt,
          (err) => {
            if (err) {
              Alerts.toast(err.message, "error");
            } else {
              Alerts.alert(
                {
                  title: "Page Successfully Modified",
                  type: "success"
                }
              );
            }
          });
      } else {
        Alerts.toast("Oops! Page Not Found, Please create a new Static Page", "error");
      }
      $(".static-page")
        .find(".edit-page-data")
        .attr("id", "");
      $(".static-page")
        .find(".save-static-page")
        .html("Create Page");
      $(".createpage")
        .find(".add-page")
        .html("Create A Page");
    }
    field.name.value = "";
    field.url.value = "";
    tinymce.activeEditor.setContent("");
    $(".static-page")
      .find("#sp-show")
      .prop("checked", false);
  },

  "click #cancelEdit"(event) {
    event.preventDefault();
    event.stopPropagation();
    // confirm delete
    $(".static-page")
      .find("#sp-name")
      .val("");
    $(".static-page")
      .find("#sp-url")
      .val("");
    $(".static-page")
      .find("#sp-show")
      .prop("checked", false);
    $(".static-page")
      .find(".save-static-page")
      .html("Create Page");
    $(".createpage")
      .find(".add-page")
      .html("Create A Page");
    tinymce.activeEditor.setContent("");
    $(".static-page")
      .find(".cancel-button")
      .removeClass("cancel-button")
      .addClass("hide");
    $(".static-page")
      .find(".edit-page-data")
      .attr("id", null);
  }
});
