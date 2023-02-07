AFRAME.registerComponent("markerhandler", {
    init: async function(){
        this.el.addEventListener("markerFound", () => {
            this.handleMarkerFound();
        });

        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost();
        });
    },
    handleMarkerFound: function(){
        button_div = document.getElementById("button-div");
        button_div.style.display = "flex";
        
        var summary_button = document.getElementById("summary-button");
        var order_button = document.getElementById("order-button");

        summary_button.addEventListener("click", () => {
            swal({
                icon: "warning",
                title: "Order Summary",
                text: "Toy Hydraulic Crane - $15.00" 
            });
        });

        order_button.addEventListener("click", () => {
            swal({
                icon: "success",
                title: "Order Successful",
                text: "You will receive your order soon!"
            });
        });
    },
    handleMarkerLost: function(){
        button_div = document.getElementById("button-div");
        button_div.style.display = "none";
    }
});