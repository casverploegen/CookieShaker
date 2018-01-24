define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_Button_ecd3147152264e058db13d4a5ee0b8d4: function AS_Button_ecd3147152264e058db13d4a5ee0b8d4(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("upgrade");
        ntf.navigate();
    },
    AS_Button_e7d898eed7ae4de0b6a0ccd9eb293707: function AS_Button_e7d898eed7ae4de0b6a0ccd9eb293707(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("username");
        ntf.navigate();
    },
    AS_Button_i4715be0cfd4435e87923d7f6702eaaf: function AS_Button_i4715be0cfd4435e87923d7f6702eaaf(eventobject) {
        var self = this;
        return loadCookie.call(this);
    },
    AS_Form_c1778ebda59f4bbabc8a66c419376ba0: function AS_Form_c1778ebda59f4bbabc8a66c419376ba0(eventobject) {
        var self = this;
        // Set up all variables.
        initVars();
        loadVars();
        saveVars();
        getUserID();
        // The bakery function is used to add up the cookies that are generated every second by the bakeries. 
        function bakery() {
            score += cps;
            cookies += cps;
            try {
                kony.application.getCurrentForm().cookieCount.text = cookies.toFixed(0);
            } catch (e) {}
            saveVars(); // All global variables are also saved every second.
        }
        // The updateScore function is used to update the scores of the signed in user in the RESTdb.io database.
        function updateScore() {
            var username = kony.store.getItem("username");
            if (username !== null) {
                database.updateData(userID, score);
            }
        }
        // Start the timers for the bakery and updateScore.
        kony.timer.schedule("cps", bakery, 1, true); // Every 1 second
        kony.timer.schedule("score", updateScore, 10, true); // Every 10 seconds
    },
    AS_Form_i101133b462b4200afe913ab26ec3d9f: function AS_Form_i101133b462b4200afe913ab26ec3d9f(eventobject) {
        var self = this;
        this.view.cookieCount.text = cookies.toFixed(0);
        this.view.cpc.text = cpc.toFixed(0);
        this.view.cps.text = cps.toFixed(0);
        startmonitoringAcc();
        loadCookie();
    },
    AS_Form_db6c7c0a560c4ef1873535341fbefcd5: function AS_Form_db6c7c0a560c4ef1873535341fbefcd5(eventobject) {
        var self = this;
        kony.accelerometer.stopMonitoringAcceleration();
    },
    AS_Form_c83d25f901a54d33938a78dbc29fe866: function AS_Form_c83d25f901a54d33938a78dbc29fe866(eventobject) {
        var self = this;
        kony.timer.cancel("cps");
        kony.timer.cancel("score");
        kony.accelerometer.stopMonitoringAcceleration();
    }
});