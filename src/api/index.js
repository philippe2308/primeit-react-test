/**
* This is an example request. Create your own using best practises for
* handling asynchronous data fetching
**/

export const getData = (cb) => {
    const vehicles = new XMLHttpRequest();
    vehicles.open('GET', 'http://localhost:9988/api/vehicle');
    vehicles.onreadystatechange = async  function() {
        if(vehicles.readyState === 4) {
 		    if(vehicles.status === 200) {
          let data=JSON.parse(vehicles.responseText);

          data.vehicles=await data.vehicles.map(async(item)=>{
            let resul =await getFullData(item.id);

            return(Object.assign(item,resul));
          });
          Promise.all(data.vehicles).then(function(values) {
              data.vehicles=values;
              cb(data);
            });
		    }
		}
	};
	vehicles.send();
};


export const getFullData = (id) => {
  return new Promise(function (resolve, reject) {
    const vehicles = new XMLHttpRequest();
    vehicles.open('GET', 'http://localhost:9988/api/vehicle/'+id);
    vehicles.onload = function() {
      if(vehicles.readyState === 4) {
        if(vehicles.status === 200) {
          resolve(JSON.parse(vehicles.responseText));
        }else{
          reject({
              status: vehicles.status,
              statusText: vehicles.statusText
          })
        }
      }
    };
    vehicles.send();
  });
};
