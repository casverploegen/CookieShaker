define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_Button_d16b7777ea614d43bb5b4bf18991600e: function AS_Button_d16b7777ea614d43bb5b4bf18991600e(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("home");
        ntf.navigate();
    },
    AS_Button_ab1007bd2bfe487094b8a75ee53e1bce: function AS_Button_ab1007bd2bfe487094b8a75ee53e1bce(eventobject) {
        var self = this;
        var uniqueUsername = true;
        var usernameInput = this.view.usernameInput.text;
        var rawData = database.loadData();
        var n = rawData.length;
        for (var i = 0; i < n; i++) {
            var usernameUser = rawData[i].username;
            if (usernameUser == usernameInput) {
                uniqueUsername = false;
            }
        }
        if (uniqueUsername && usernameInput != null) {
            kony.store.setItem("username", usernameInput);
            database.insertData(usernameInput, score);
            getUserID();
            var ntf = new kony.mvc.Navigation("scoreboard");
            ntf.navigate();
        } else {
            this.view.errorUsername.setVisibility(true);
        }
    },
    AS_Form_e1ee227b63a242e59c7e540e496f970c: function AS_Form_e1ee227b63a242e59c7e540e496f970c(eventobject) {
        var self = this;
        if (kony.store.getItem("username") !== null) {
            var ntf = new kony.mvc.Navigation("scoreboard");
            ntf.navigate();
        }
    }
});