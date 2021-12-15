AFRAME.registerComponent("cursor-listener",{
  schema:{
      selectedItemId : {default:"",type:"string"}
      
  },
  init:function(){
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
      this.handleClickEvents();
  },
  handlePlacesListState:function(){
      const id = this.el.getAttribute("id");
      const placesId = ["entrance","corridor"];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "#D76B30",
          opacity: 1,
        });
      }
  },
  handleMouseEnterEvents:function(){
      this.el.addEventListener("mouseenter", () => {
          this.handlePlacesListState();
        });
  },
  handleMouseLeaveEvents:function(){
      this.el.addEventListener("mouseleave", () => {
          const { selectedItemId } = this.data;
          if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`);
            const id = el.getAttribute("id");
            if (id == selectedItemId) {
              el.setAttribute("material", {
                color: "#0077CC",
                opacity: 1,
              });
            }
          }
        });
  },
  handleClickEvents:function(){
    this.el.addEventListener("click",evt=>{
      const placesContainer = document.querySelector("#places-container")
      const {state} = placesContainer.getAttribute("tour")
      if (state === "places-list"){
        const id = this.el.getAttribute("id");
        const placesId = ["entrance","corridor"]
        if(placesId.includes(id)){
          placesContainer.setAttribute("tour",{
            state: "view",
            selectedCard: id
          })
        }
      }
      if(state === "view"){
        this.handleViewState()
      }
    })
  },
  handleViewState:function(){
    const el = this.el
    const id = el.getAttribute("id")
    const placesContainer = document.querySelector("#places-container");
    const {selectedItemId} = placesContainer.getAttribute("cursor-listener")
    const placesId = ["entrance","corridor"]
    if (selectedItemId.includes(placesId)){
      const skyE1 = document.querySelector("#main-container")
      console.log(placesId)
      skyE1.setAttribute("material",{
        src: `./Assets/360_images/${placesId}.jpg`,
        color: "#fff"
      })
    }
  }
 

})