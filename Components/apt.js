AFRAME.registerComponent("tour", {
  schema:{
      state:{type:"string",default:"places-list"},
      selectedCard:{type:"string",default:"#card1"},
      zoomAspectRatio:{type:"number",default:1}
  },
  init: function () {
      this.placesContainer = this.el
      this.cameraEl=document.querySelector("#camera")
      this.createCards()
  },
  tick:function(){
      const {state} = this.el.getAttribute("tour")
      if (state === "view"){
          this.hideel([this.placesContainer])
          this.showView()
      }
  },
  update:function(){
      window.addEventListener("keydown",e=>{
          if(e.key === "ArrowUp"){
              if((this.data.zoomAspectRatio <=10 && this.data.state==="view") ||
              (this.data.zoomAspectRatio <=10 && this.data.state==="change-view") ){
                  this.data.zoomAspectRatio +=0.05;
                  this.cameraE1.setAttribute("zoom",this.data.zoomAspectRatio)


              }
          }
          if(e.key === "ArrowDown"){
              if((this.data.zoomAspectRatio >1 && this.data.state==="view") ||
              (this.data.zoomAspectRatio > 1 && this.data.state==="change-view") ){
                  this.data.zoomAspectRatio -=0.02;
                  this.cameraE1.setAttribute("zoom",this.data.zoomAspectRatio)

              }
          }

      })
  },
  hideel: function(elList){
      elList.map(el=>{
          el.setAttribute("visible",false)
      })
  },
  showView:function(){
      const{selectedCard}=this.data
      console.log(selectedCard)
      const skyEl = document.querySelector("#main-container")
      skyEl.setAttribute("material",{
          src :`./Assets/360_images/${selectedCard}.jpg`,
          color :"#ffffff"
      })
  },
  createBorder: function (position, id) {
      const entityE1 = document.createElement('a-entity');
      entityE1.setAttribute("id", id)
      entityE1.setAttribute("position", position)
      entityE1.setAttribute("visible", true)
      entityE1.setAttribute("geometry", {
          primitive: "ring",
          radiusInner: 9,
          radiusOuter: 10,
      })
      entityE1.setAttribute("material", {
          color: "#0077CC",
          opacity: 1,
      });

      entityE1.setAttribute("cursor-listener",{})
      return entityE1

  },

  createThumbnail: function (item) {
      const entityE2 = document.createElement('a-entity');
      entityE2.setAttribute("visible", true)
      entityE2.setAttribute("geometry", {
          primitive: "circle",
          radius: 9
      })
      entityE2.setAttribute("material", {
          src: item.url
      })
      return entityE2 

  },

  createTitle: function (position, item) {
      const entityE3 = document.createElement('a-entity');
      
      entityE3.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 70,
          color: "#e65100",
          value: item.title,
      });
      const elPosition = position;
      elPosition.y = -20;
      entityE3.setAttribute("position", elPosition);
      entityE3.setAttribute("visible", true)

      return entityE3

  },


  createCards: function () {
      const tumbnailsRef = [{
              id: "entrance",
              title: "Entrance",
              url: "./assets/thumbnails/entrance.jpg"

          },
          {
              id: "corridor",
              title: "Corridor",
              url: "./assets/thumbnails/corridor.jpg"

          },
      ]
      let previousXposition = -60
      for (var item of tumbnailsRef) {
          const posX = previousXposition + 25;
          const posY = 10;
          const posZ = -40
          const position = {
              x: posX,
              y: posY,
              z: posZ
          };

          const border1 = this.createBorder(position, item.id);
          const thumbnail1 = this.createThumbnail(item)
          const title1 = this.createTitle(position, item)

          border1.append(thumbnail1)
          border1.append(title1)

          previousXposition = posX;


          this.placesContainer.appendChild(border1);
      }
  }


})