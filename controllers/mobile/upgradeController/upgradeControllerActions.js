define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_Button_a9054d6a48e547cb9bec7fba8732abea: function AS_Button_a9054d6a48e547cb9bec7fba8732abea(eventobject) {
        var self = this;
        if ((cookies >= priceFinger)) {
            ownedFinger++;
            cpc++;
            cookies -= priceFinger;
            priceFinger *= 2;
            this.view.owned1.text = ownedFinger.toFixed(0);
            this.view.price1.text = priceFinger.toFixed(0);
            this.view.error.setVisibility(false);
        } else {
            this.view.error.setVisibility(true);
        }
    },
    AS_Button_j8a148dd35fb412ab22304ddfb6416af: function AS_Button_j8a148dd35fb412ab22304ddfb6416af(eventobject) {
        var self = this;
        this.view.error.setVisibility(false);
        var ntf = new kony.mvc.Navigation("home");
        ntf.navigate();
    },
    AS_Button_bacadb1e433a44bf82afafbecaa737b4: function AS_Button_bacadb1e433a44bf82afafbecaa737b4(eventobject) {
        var self = this;
        if ((cookies >= priceBakery)) {
            ownedBakery++;
            cps++;
            cookies -= priceBakery;
            priceBakery *= 2;
            this.view.owned2.text = ownedBakery.toFixed(0);
            this.view.price2.text = priceBakery.toFixed(0);
            this.view.error.setVisibility(false);
        } else {
            this.view.error.setVisibility(true);
        }
    },
    AS_Button_f641edf865b0482b952fab3efba249f0: function AS_Button_f641edf865b0482b952fab3efba249f0(eventobject) {
        var self = this;
        if (cookies >= priceDevice) {
            ownedDevice++;
            cpc += 5;
            cookies -= priceDevice;
            priceDevice *= 2;
            this.view.owned3.text = ownedDevice.toFixed(0);
            this.view.price3.text = priceDevice.toFixed(0);
            this.view.error.setVisibility(false);
        } else {
            this.view.error.setVisibility(true);
        }
    },
    AS_Form_d0af3c0b32124c459286635a64cea601: function AS_Form_d0af3c0b32124c459286635a64cea601(eventobject) {
        var self = this;
        this.view.price1.text = priceFinger.toFixed(0);
        this.view.owned1.text = ownedFinger.toFixed(0);
        this.view.price2.text = priceBakery.toFixed(0);
        this.view.owned2.text = ownedBakery.toFixed(0);
        this.view.price3.text = priceDevice.toFixed(0);
        this.view.owned3.text = ownedDevice.toFixed(0);
        this.view.cookieCount.text = cookies.toFixed(0);
    }
});