AFRAME.registerComponent("create-markers", {
    init: async function(){
        var mainScene = document.querySelector("#main-scene");

        var toys = await this.getToys();

        toys.map(toy => {
            //creating the marker element and adding it to the scene
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", toy.id);
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", toy.marker_pattern_url);
            marker.setAttribute("cursor", {
                rayOrigin: "mouse"
            }); 
            marker.setAttribute("markerhandler", {});
            mainScene.appendChild(marker);

            //adding the 3D toy model to the scene
            var model = document.createElement("a-entity");
            model.setAttribute("id", `model-${toy.id}`);
            model.setAttribute("position", toy.model_geometry.position);
            model.setAttribute("rotation", toy.model_geometry.rotation);
            model.setAttribute("scale", toy.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${toy.model_url})`);
            model.setAttribute("gesture-handler", {});
            marker.appendChild(model); //appending this into the marker because we only want to display when the marker is found!!

            //toy descripttion container
            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id", `main-plane-${toy.id}`);
            mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
            mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
            mainPlane.setAttribute("width", 1.7);
            mainPlane.setAttribute("height", 1.5);
            marker.appendChild(mainPlane);

            //toy name background plane
            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id", `title-plane-${toy.id}`);
            titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
            titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            titlePlane.setAttribute("width", 1.69);
            titlePlane.setAttribute("height", 0.3);
            titlePlane.setAttribute("material", { color: "yellow" });
            mainPlane.appendChild(titlePlane);

            //toy name
            var toyName = document.createElement("a-entity");
            toyName.setAttribute("id", `toy-name-${toy.id}`);
            toyName.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            toyName.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            toyName.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 1.8,
                height: 1,
                align: "center",
                value: toy.toy_name.toUpperCase()
            });
            titlePlane.appendChild(toyName);

            //toy description
            var toyDescription = document.createElement("a-entity");
            toyDescription.setAttribute("id", `toy-description-${toy.id}`);
            toyDescription.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            toyDescription.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            toyDescription.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 2,
                align: "center",
                value: `${toy.description.join("\n")}`
            });
            mainPlane.appendChild(toyDescription);
        });
    },
    getToys: async function(){
        return await firebase
            .firestore()
            .collection("toys")
            .get()
            .then(snap => {
                return snap.docs.map(doc => doc.data());
            })
    }
});