

function Sidebar({location}){
  if(!location){
    return(
      <div className="sidebar">NO location selected</div>
    );
  }
  else{
  return(
    <div className={`sidebar active`}>
      <div class="sidebar-content">
     <img src={location.thumbnail}></img>
     <h2>{location.name}</h2>
     <p>Access:{location.address}</p>
     <p>Category:{location.category}</p>
     </div>
     
    </div>
  
  );
  }
}

export default Sidebar;




