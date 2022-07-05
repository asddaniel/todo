
// import React from 'react';
// import { useRef } from 'react';

let numbzr =0;
function Rendue({name, children}){
   return <div>
   <h1>Mon titre {name}</h1> 

   <p>{children}</p></div>

	
}
var storage = window.localStorage;

class Formulaire extends React.Component{
   constructor(props, ref){
      super(props)
      this.state = {
         nom: "", 
         note: "",
         reference: ref,
         statut : Date.now()
      }
      this.changement = this.changement.bind(this);
      this.treatForm = this.treatForm.bind(this);
      this.reset_form = this.reset_form.bind(this);
   }
   changement(e){
   
      switch(e.target.name){
         case 'nom': this.setState({
         nom: e.target.value

      });
         break;
      case 'note': this.setState({
         note: e.target.value

      });
      break;
      }
    
   }
   reset_form(){
      this.setState({
         note: "",
         nom: "", 
         statut: Date.now()

      });


   }
   treatForm(e){
      e.preventDefault()
      
      var donnees = {
         nom: this.state.nom,
         note: this.state.note};
      if(storage.getItem("articles")!=undefined){
         let post = JSON.parse(storage.getItem("articles"));
         post.push(donnees);
         storage.setItem("articles", JSON.stringify(post));
      }else{
         let data = JSON.stringify([donnees]);
         storage.setItem("articles", data);
      }
      this.reset_form();
   }

   render(){
      return  <div>
      <form onSubmit ={this.treatForm} className="sidebar-gauche">
         <input type="text" placeholder="titre de la note" name="nom" value={this.state.nom} onChange={this.changement}/>
         <textarea name="note" placeholder="entrez la note ici" value={this.state.note} onChange={this.changement}></textarea>
         <button onClick={this.treatForm}>Enregistrer</button>
         </form>
         <Sidebar name="droite"><Articles statut={this.state.status}> bande</Articles></Sidebar>
      </div>
   }
}


const Articles = React.forwardRef(function (props, ref){
   let ret = [];
   
   if(storage.getItem("articles")!=undefined){
      let post = JSON.parse(storage.getItem("articles"));
      
      for(let i=0; i<post.length; i++){
         console.log(post[i].note)
       ret.push(<div className="article">{post[i].note}</div>)
      }
   }
   return <div ref={ref}>{ret}</div>
});
function Sidebar({name, children}){
   return <div className={'sidebar-'+name}>{children}</div>
}

function Conteneur({children}){

   const article = React.useRef(null);
   const reForm  = React.useRef(null);


   return <div><Formulaire ref={reForm} /> </div> 
}



ReactDOM.render(<Conteneur/>, document.getElementById('app'));
